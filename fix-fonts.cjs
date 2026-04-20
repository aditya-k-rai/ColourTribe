const fs = require('fs');
const path = require('path');

function fixMojibake(filePath) {
  let utf8Content = fs.readFileSync(filePath, 'utf8');

  // The weird mojibake to actual characters mapping
  const replacements = [
    { bad: 'ðŸ“±', good: '📱' },
    { bad: 'ðŸ“ ', good: '📋' },
    { bad: 'ðŸšš', good: '🚚' },
    { bad: 'â†’', good: '→' },
    { bad: 'ðŸ‡®ðŸ‡³', good: '🇮🇳' },
    { bad: 'ðŸ‘”', good: '👕' },
    { bad: 'âœ“', good: '✓' },
    { bad: 'â‚¹', good: '₹' },
    { bad: 'â€¢', good: '•' },
    { bad: 'âœ¨', good: '✨' },
    { bad: 'â†‘', good: '↑' },
    { bad: 'â™¥ï¸ ', good: '❤️' },
    { bad: 'â™¥', good: '♥' },
    { bad: 'ðŸŒŸ', good: '🌟' },
    { bad: 'ðŸ”¥', good: '🔥' },
    { bad: 'ðŸ‘•', good: '👔' },
    { bad: 'ðŸ‘–', good: '👖' },
    { bad: 'ðŸ‘‰', good: '👉' },
    { bad: 'ðŸŽ¯', good: '🎯' },
    { bad: 'ðŸ›¡ï¸ ', good: '🛡️' },
    { bad: 'ðŸ’¼', good: '💼' },
    { bad: 'ðŸ” ', good: '🔍' },
    { bad: 'ðŸ“ˆ', good: '📈' },
    { bad: 'â˜Žï¸ ', good: '☎️' },
    { bad: 'ðŸ“§', good: '📧' },
    { bad: 'ðŸ“ ', good: '📍' },
    { bad: 'âŒš', good: '⌚' },
    { bad: 'ðŸŽ“', good: '🎓' },
    { bad: 'ðŸ¥', good: '🏥' },
    { bad: 'âœˆï¸ ', good: '✈️' },
    { bad: 'ðŸš§', good: '🚧' }
  ];

  let modified = false;
  
  for (const { bad, good } of replacements) {
    if (utf8Content.includes(bad)) {
      utf8Content = utf8Content.split(bad).join(good); // replaceAll alternative
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, utf8Content, { encoding: 'utf8' });
    console.log('Fixed:', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules') {
        walkDir(fullPath);
      }
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.html') || fullPath.endsWith('.json')) {
      fixMojibake(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
console.log('Done fixing encoding issues!');
