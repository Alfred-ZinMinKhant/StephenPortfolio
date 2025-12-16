// Asset versioning script for CSS and JS
// Renames styles.css and script.js with a hash and updates index.html

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');


const assets = [
  { file: 'styles.css',
    tag: /<link[^>]+href=["'](styles(?:\.[a-f0-9]{8})?\.css)["'][^>]*>/,
    pattern: /^styles\.[a-f0-9]{8}\.css$/,
    replaceRe: /styles(\.[a-f0-9]{8})?\.css/g
  },
  { file: 'script.js',
    tag: /<script[^>]+src=["'](script(?:\.[a-f0-9]{8})?\.js)["'][^>]*><\/script>/,
    pattern: /^script\.[a-f0-9]{8}\.js$/,
    replaceRe: /script(\.[a-f0-9]{8})?\.js/g
  }
];

const htmlFile = 'index.html';

function getHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(fileBuffer).digest('hex').slice(0, 8);
}

function versionAsset(asset) {
  const oldPath = path.join(__dirname, asset.file);
  if (!fs.existsSync(oldPath)) return null;
  const hash = getHash(oldPath);
  const ext = path.extname(asset.file);
  const base = path.basename(asset.file, ext);
  const newFile = `${base}.${hash}${ext}`;
  const newPath = path.join(__dirname, newFile);
  fs.copyFileSync(oldPath, newPath);
  return { old: asset.file, hashed: newFile, tag: asset.tag };
}

function updateHtml(htmlPath, replacements) {
  let html = fs.readFileSync(htmlPath, 'utf8');
  replacements.forEach(({ hashed, replaceRe }) => {
    html = html.replace(replaceRe, hashed);
  });
  fs.writeFileSync(htmlPath, html, 'utf8');
}

function cleanupOldAssets(asset) {
  const dir = __dirname;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (asset.pattern && asset.pattern.test(file)) {
      fs.unlinkSync(path.join(dir, file));
    }
  });
}

function main() {
  const replacements = [];
  assets.forEach(asset => {
    cleanupOldAssets(asset);
    const result = versionAsset(asset);
    if (result) {
      replacements.push({ hashed: result.hashed, replaceRe: asset.replaceRe });
    }
  });
  if (replacements.length > 0) {
    updateHtml(path.join(__dirname, htmlFile), replacements);
    console.log('Asset versioning complete:', replacements.map(r => r.hashed).join(', '));
  } else {
    console.log('No assets found to version.');
  }
}

main();
