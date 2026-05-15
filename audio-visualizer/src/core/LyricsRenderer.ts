import * as THREE from 'three';
import { Text } from 'troika-three-text';

export interface LyricsWord {
  text: string;
  start: number;
  end: number;
  isVocalStretch?: boolean;
}

export interface LyricsLine {
  type?: string;
  text: string;
  start: number;
  end: number;
  words?: LyricsWord[];
}

interface LineSlot {
  textMesh: any; // troika Text instance
  fillMesh: any; // troika Text instance (bright overlay, clipped for fill)
  lineIdx: number;
  assigned: boolean;
}

const VISIBLE_LINES = 5;
const LINE_HEIGHT = 0.09;
const FONT_SIZE = 0.055;
const ACTIVE_FONT_SIZE = 0.065;
const Z_DEPTH = -1;
const SCROLL_LERP = 0.25;
const DIM_COLOR = 0x666688;
const ACTIVE_COLOR = 0xffffff;
const FILL_COLOR = 0xffffff;
const SUNG_COLOR = 0x889aff;

export class LyricsRenderer {
  group: THREE.Group;
  private slots: LineSlot[] = [];
  private timeline: LyricsLine[] = [];
  private activeLineIdx = -1;
  private targetScrollY = 0;
  private currentScrollY = 0;
  private opacity = 0;
  private targetOpacity = 0;
  private lastTime = 0;
  private lastTimeStamp = 0;
  private interpolatedTime = 0;

  constructor() {
    this.group = new THREE.Group();
    this.group.layers.set(1); // Render on layer 1 (after blur, stays sharp)

    // Pre-allocate text slots
    for (let i = 0; i < VISIBLE_LINES; i++) {
      const textMesh: any = new Text();
      textMesh.fontSize = FONT_SIZE;
      textMesh.color = DIM_COLOR;
      textMesh.anchorX = 'center';
      textMesh.anchorY = 'middle';
      textMesh.position.set(0, 0, Z_DEPTH);
      textMesh.fillOpacity = 0;
      textMesh.maxWidth = 1.4;
      textMesh.textAlign = 'center';
      textMesh.text = '';
      textMesh.layers.set(1);
      textMesh.sync();
      this.group.add(textMesh);

      // Fill overlay (bright text clipped to show progress)
      const fillMesh: any = new Text();
      fillMesh.fontSize = FONT_SIZE;
      fillMesh.color = FILL_COLOR;
      fillMesh.anchorX = 'center';
      fillMesh.anchorY = 'middle';
      fillMesh.position.set(0, 0, Z_DEPTH + 0.001);
      fillMesh.fillOpacity = 0;
      fillMesh.maxWidth = 1.4;
      fillMesh.textAlign = 'center';
      fillMesh.text = '';
      fillMesh.layers.set(1);
      fillMesh.clipRect = [0, -Infinity, 0, Infinity]; // Initially hidden
      fillMesh.sync();
      this.group.add(fillMesh);

      this.slots.push({ textMesh, fillMesh, lineIdx: -1, assigned: false });
    }
  }

  setTimeline(timeline: LyricsLine[]) {
    this.timeline = timeline.filter(l => l.type !== 'vocal_cue' && l.text);
    this.activeLineIdx = -1;
    this.currentScrollY = 0;
    this.targetScrollY = 0;
    // Clear all slots
    this.slots.forEach(slot => {
      slot.textMesh.text = '';
      slot.fillMesh.text = '';
      slot.assigned = false;
      slot.lineIdx = -1;
      slot.textMesh.fillOpacity = 0;
      slot.fillMesh.fillOpacity = 0;
    });
    this.targetOpacity = this.timeline.length > 0 ? 1 : 0;
  }

  setVisible(visible: boolean) {
    this.targetOpacity = visible && this.timeline.length > 0 ? 1 : 0;
  }

  /** Called from main thread with audio currentTime */
  setCurrentTime(time: number) {
    this.lastTime = time;
    this.lastTimeStamp = performance.now();
  }

  /** Call every frame */
  update(rms: number) {
    if (!this.timeline.length) {
      this.opacity += (0 - this.opacity) * 0.05;
      return;
    }

    // Clock smoothing: interpolate between audio clock updates
    // Add small lookahead to compensate for audio pipeline latency
    const elapsed = (performance.now() - this.lastTimeStamp) / 1000;
    this.interpolatedTime = this.lastTime + elapsed + 0.05; // 50ms lookahead

    // Find active line
    const t = this.interpolatedTime;
    let newActiveIdx = -1;
    for (let i = 0; i < this.timeline.length; i++) {
      const line = this.timeline[i];
      if (t >= line.start && t < line.end) {
        newActiveIdx = i;
        break;
      }
    }
    // If between lines, show the upcoming one dimly
    if (newActiveIdx === -1) {
      for (let i = 0; i < this.timeline.length; i++) {
        if (t < this.timeline[i].start) {
          // Gap before this line — keep previous as active if close
          if (i > 0 && t - this.timeline[i - 1].end < 2) {
            newActiveIdx = i - 1;
          }
          break;
        }
      }
    }

    if (newActiveIdx !== this.activeLineIdx) {
      this.activeLineIdx = newActiveIdx;
      this.assignSlots();
    }

    // Smooth scroll to center active line
    if (this.activeLineIdx >= 0) {
      this.targetScrollY = this.activeLineIdx * LINE_HEIGHT;
    }
    this.currentScrollY += (this.targetScrollY - this.currentScrollY) * SCROLL_LERP;

    // Opacity lerp
    this.opacity += (this.targetOpacity - this.opacity) * 0.05;

    // Update each slot position and fill progress
    const centerSlot = Math.floor(VISIBLE_LINES / 2);
    for (let i = 0; i < this.slots.length; i++) {
      const slot = this.slots[i];
      if (!slot.assigned || slot.lineIdx < 0) {
        slot.textMesh.fillOpacity = 0;
        slot.fillMesh.fillOpacity = 0;
        continue;
      }

      const line = this.timeline[slot.lineIdx];
      const relativeIdx = slot.lineIdx - this.activeLineIdx;
      const yPos = (relativeIdx) * -LINE_HEIGHT + (this.targetScrollY - this.currentScrollY) * 0;
      // Position relative to center
      const targetY = (centerSlot - i) * LINE_HEIGHT;

      slot.textMesh.position.y = targetY;
      slot.fillMesh.position.y = targetY;

      const isActive = slot.lineIdx === this.activeLineIdx;
      const isPast = slot.lineIdx < this.activeLineIdx;
      const distFromActive = Math.abs(slot.lineIdx - this.activeLineIdx);

      // Detect if we're mid-scroll (auto-scroll animation in progress)
      const scrollDelta = Math.abs(this.targetScrollY - this.currentScrollY);
      const isScrolling = scrollDelta > 0.002;

      // Line opacity: uniform during scroll, tiered when settled
      let lineOpacity: number;
      if (isScrolling) {
        // During scroll transition, all lines share the same opacity
        lineOpacity = isActive ? 1.0 : 0.6;
      } else {
        // Settled: tiered opacity based on distance from active
        if (isActive) {
          lineOpacity = 1.0;
        } else if (distFromActive === 1) {
          lineOpacity = 0.4;
        } else if (distFromActive === 2) {
          lineOpacity = 0.3;
        } else if (distFromActive <= 4) {
          lineOpacity = 0.2;
        } else {
          lineOpacity = 0.15;
        }
      }

      // Font size: active line slightly larger
      const targetSize = isActive ? ACTIVE_FONT_SIZE : FONT_SIZE;
      slot.textMesh.fontSize = targetSize;
      slot.fillMesh.fontSize = targetSize;

      // Dim color for inactive, active color for current
      slot.textMesh.color = isActive ? ACTIVE_COLOR : (isPast ? SUNG_COLOR : DIM_COLOR);
      slot.textMesh.fillOpacity = this.opacity * lineOpacity;

      // Word fill progress (clipRect on fill mesh)
      if (isActive && line.words && line.words.length > 0) {
        const lineProgress = this.computeWordFillProgress(line, t);
        // clipRect: [minX, minY, maxX, maxY] in local coords
        // We use a wide rect that clips from left to progress position
        const clipX = -0.7 + lineProgress * 1.4; // -0.7 to 0.7 range for maxWidth 1.4
        slot.fillMesh.clipRect = [-0.8, -Infinity, clipX, Infinity];
        slot.fillMesh.fillOpacity = this.opacity;
        slot.fillMesh.color = FILL_COLOR;
      } else if (isActive) {
        // No word data — full fill based on line progress
        const lineProgress = line.end > line.start
          ? Math.max(0, Math.min(1, (t - line.start) / (line.end - line.start)))
          : 0;
        const clipX = -0.7 + lineProgress * 1.4;
        slot.fillMesh.clipRect = [-0.8, -Infinity, clipX, Infinity];
        slot.fillMesh.fillOpacity = this.opacity;
      } else {
        slot.fillMesh.fillOpacity = 0;
      }

      // Audio-reactive glow for active line
      if (isActive) {
        slot.textMesh.outlineWidth = 0.002 + rms * 0.003;
        slot.textMesh.outlineColor = 0x4488ff;
        slot.textMesh.outlineOpacity = 0.4 + rms * 0.4;
      } else {
        slot.textMesh.outlineWidth = 0;
        slot.textMesh.outlineOpacity = 0;
      }
    }
  }

  private computeWordFillProgress(line: LyricsLine, t: number): number {
    const words = line.words!;
    if (!words.length) return 0;

    // Find which word we're on
    let totalChars = 0;
    let filledChars = 0;
    const lineText = line.text || '';
    const totalLen = lineText.length || 1;

    let charPos = 0;
    for (const word of words) {
      const wordLen = word.text.length;
      if (t >= word.end) {
        // Word fully sung
        filledChars = charPos + wordLen;
      } else if (t >= word.start) {
        // Word being sung — apply power curve
        const wordProgress = (t - word.start) / (word.end - word.start);
        // Power curve: Chromic Stream style fill
        const curved = 1 - Math.pow(1 - wordProgress, 3.5);
        filledChars = charPos + curved * wordLen;
      }
      charPos += wordLen + 1; // +1 for space
    }

    return Math.min(1, filledChars / totalLen);
  }

  private assignSlots() {
    const center = this.activeLineIdx >= 0 ? this.activeLineIdx : 0;
    const halfVisible = Math.floor(VISIBLE_LINES / 2);
    const startIdx = Math.max(0, center - halfVisible);
    const endIdx = Math.min(this.timeline.length - 1, center + halfVisible);

    for (let i = 0; i < this.slots.length; i++) {
      const lineIdx = startIdx + i;
      const slot = this.slots[i];

      if (lineIdx > endIdx || lineIdx >= this.timeline.length) {
        if (slot.assigned) {
          slot.assigned = false;
          slot.lineIdx = -1;
          slot.textMesh.fillOpacity = 0;
          slot.fillMesh.fillOpacity = 0;
        }
        continue;
      }

      const line = this.timeline[lineIdx];
      if (slot.lineIdx !== lineIdx) {
        slot.lineIdx = lineIdx;
        slot.textMesh.text = line.text;
        slot.fillMesh.text = line.text;
        slot.textMesh.sync();
        slot.fillMesh.sync();
      }
      slot.assigned = true;
    }
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.group);
  }

  removeFromScene(scene: THREE.Scene) {
    scene.remove(this.group);
  }

  dispose() {
    this.slots.forEach(slot => {
      slot.textMesh.dispose();
      slot.fillMesh.dispose();
    });
  }
}







