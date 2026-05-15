const fs = require('fs');
const path = require('path');
const q = 'бульбик';
const mediaRoot = path.join(__dirname, 'media');
let found = 0;
function searchDir(dir) {
  try {
    const entries = fs.readdirSync(dir, {withFileTypes: true});
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) searchDir(full);
      else if (e.name.endsWith('.lyrics.json')) {
        const raw = fs.readFileSync(full, 'utf-8');
        if (raw.toLowerCase().includes(q.toLowerCase())) {
          console.log('FOUND in:', full);
          found++;
          const lines = JSON.parse(raw);
          for (const l of (Array.isArray(lines) ? lines : [])) {
            if ((l.text||'').toLowerCase().includes(q.toLowerCase())) {
              console.log('  Line:', (l.text||'').substring(0,80), 'time:', l.time);
            }
          }
        }
      }
    }
  } catch(e) { console.error(e.message); }
}
searchDir(mediaRoot);
console.log('Total found:', found);

