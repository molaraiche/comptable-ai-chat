// Script to generate PWA icons from SVG
// Run: node scripts/generate-icons.js

const fs = require('fs');
const path = require('path');

const svgIcon = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="url(#gradient)"/>
  <path d="M160 128C142.327 128 128 142.327 128 160V352C128 369.673 142.327 384 160 384H352C369.673 384 384 369.673 384 352V160C384 142.327 369.673 128 352 128H160Z" fill="white" fill-opacity="0.2"/>
  <path d="M192 176H320M192 224H320M192 272H256M192 320H224" stroke="#FCD34D" stroke-width="20" stroke-linecap="round"/>
  <circle cx="304" cy="304" r="16" fill="#FCD34D"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop stop-color="#047857"/>
      <stop offset="1" stop-color="#059669"/>
    </linearGradient>
  </defs>
</svg>`;

// Save SVG
const publicDir = path.join(__dirname, '..', 'public');
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);

console.log('✅ SVG icon generated!');
console.log('\n📝 To generate PNG icons:');
console.log('1. Visit: https://realfavicongenerator.net/');
console.log('2. Upload public/icon.svg');
console.log('3. Download and extract to public/ folder');
console.log('4. Or use: npx sharp-cli resize 192 192 -i public/icon.svg -o public/icon-192x192.png');
console.log('5. And: npx sharp-cli resize 512 512 -i public/icon.svg -o public/icon-512x512.png');
