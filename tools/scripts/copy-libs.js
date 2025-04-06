// tools/scripts/copy-libs.js
const fs = require('fs-extra');
const path = require('path');

const libs = ['ui', 'types', 'graphql'];
const targetDir = path.resolve(__dirname, '../../apps/web/node_modules/@materials-accounting');

// Убедимся, что директория существует
fs.ensureDirSync(targetDir);

libs.forEach(lib => {
  const sourcePath = path.resolve(__dirname, `../../dist/libs/${lib}`);
  const targetPath = path.resolve(targetDir, lib);
  
  if (fs.existsSync(sourcePath)) {
    fs.removeSync(targetPath);
    fs.copySync(sourcePath, targetPath);
  } 
});