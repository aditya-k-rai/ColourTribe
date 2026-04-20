const fs = require('fs');

let c;

// Fix QuoteDrawer
const qd = 'src/components/quote/QuoteDrawer.jsx';
if (fs.existsSync(qd)) {
  c = fs.readFileSync(qd, 'utf8');
  c = c.replace(/<div className="text-6xl">.*?<\/div>/g, '<div className="text-6xl">📋</div>');
  fs.writeFileSync(qd, c, 'utf8');
}

// Fix CataloguePage
const cp = 'src/pages/CataloguePage.jsx';
if (fs.existsSync(cp)) {
  c = fs.readFileSync(cp, 'utf8');
  c = c.replace(/hub === 'industries' \? '.*?' : hub === 'uniforms'/g, 'hub === \\'industries\\' ? \\'🏭\\' : hub === \\'uniforms\\'');
  c = c.replace(/hub === 'uniforms' \? '.*?' : '.*?'\)/g, 'hub === \\'uniforms\\' ? \\'👕\\' : \\'📦\\')');
  c = c.replace(/<div className="text-5xl mb-4">.*?<\/div>/g, '<div className="text-5xl mb-4">🔍</div>');
  fs.writeFileSync(cp, c, 'utf8');
}

// Fix WhyChooseUs
const wcu = 'src/components/homepage/WhyChooseUs.jsx';
if (fs.existsSync(wcu)) {
  c = fs.readFileSync(wcu, 'utf8');
  c = c.replace(/<span className="text-gold text-sm">.*?<\/span>/g, '<span className="text-gold text-sm">✦</span>');
  c = c.replace(/<span className="text-5xl relative z-10 group-hover:scale-110 transition-transform">.*?<\/span>/g, '<span className="text-5xl relative z-10 group-hover:scale-110 transition-transform">🧵</span>');
  
  // Specific regex for the needle replacing the generic bad characters sequence
  c = c.replace(/<span className="text-4xl">ðŸª.*?<\/span>/g, '<span className="text-4xl">🪡</span>'); 
  fs.writeFileSync(wcu, c, 'utf8');
}

console.log('Regex mojobike fixes applied successfully');
