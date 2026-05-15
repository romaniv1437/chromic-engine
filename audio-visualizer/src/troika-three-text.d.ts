declare module 'troika-three-text' {
  import { Mesh } from 'three';
  export class Text extends Mesh {
    text: string;
    fontSize: number;
    color: number | string;
    anchorX: string | number;
    anchorY: string | number;
    fillOpacity: number;
    outlineWidth: number;
    outlineColor: number | string;
    outlineOpacity: number;
    strokeWidth: number;
    strokeColor: number | string;
    sync(callback?: () => void): void;
    dispose(): void;
  }
}

