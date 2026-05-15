const fs = require('fs');
const path = require('path');

const jsonPath = '/tmp/whisper-test/09 Бульбик или Бонг.json';

try {
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(raw);
  
  console.log('=== Whisper Raw Output Test ===');
  console.log('Total segments:', data.segments.length);
  console.log('Language:', data.language || 'not specified');
  console.log('');
  
  let totalWords = 0;
  for (const seg of data.segments) {
    const words = seg.words || [];
    totalWords += words.length;
    const timeStart = seg.start.toFixed(2);
    const timeEnd = seg.end.toFixed(2);
    console.log(`[${timeStart} → ${timeEnd}] ${seg.text.trim()}`);
    
    // Show word-level timestamps for first 3 segments
    if (seg.id <= 3 && words.length) {
      for (const w of words) {
        console.log(`    ${w.start.toFixed(2)}-${w.end.toFixed(2)}  "${w.word.trim()}"  (p=${(w.probability * 100).toFixed(0)}%)`);
      }
    }
  }
  
  console.log('');
  console.log('=== Summary ===');
  console.log('Segments:', data.segments.length);
  console.log('Total words:', totalWords);
  console.log('Has word timestamps:', totalWords > 0 ? '✅ YES' : '❌ NO');
  console.log('Duration:', data.segments.length ? (data.segments[data.segments.length - 1].end).toFixed(1) + 's' : 'N/A');
  console.log('✅ Whisper output is valid!');
} catch (e) {
  console.error('❌ Error:', e.message);
  process.exit(1);
}
