// libs/types/build.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

process.chdir(path.resolve(__dirname));
try {
  execSync('nx build types --verbose', { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}