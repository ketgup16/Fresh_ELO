const fs = require('fs');
const path = require('path');

const iconDir = './client/components/icons';
const files = fs.readdirSync(iconDir);

const filesToRename = files.filter(f => f.startsWith('[LD 3.5] ') && f.endsWith('.svg'));

console.log(`Found ${filesToRename.length} files to rename`);

filesToRename.forEach(file => {
  const oldPath = path.join(iconDir, file);
  const newName = file.replace('[LD 3.5] ', '');
  const newPath = path.join(iconDir, newName);
  
  fs.renameSync(oldPath, newPath);
  console.log(`Renamed: ${file} -> ${newName}`);
});

console.log('✅ Done! All icon files renamed successfully.');
