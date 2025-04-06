const fs = require('fs-extra');
const path = require('path');

const libsSrc = {
  ui: path.resolve(__dirname, '../../libs/ui/src'),
  types: path.resolve(__dirname, '../../libs/types/src'),
  graphql: path.resolve(__dirname, '../../libs/graphql/src')
};

const webNodeModules = path.resolve(__dirname, '../../apps/web/node_modules/@materials-accounting');
fs.ensureDirSync(webNodeModules);
Object.entries(libsSrc).forEach(([lib, srcPath]) => {
  const destPath = path.join(webNodeModules, lib);
  fs.removeSync(destPath);
  fs.copySync(srcPath, destPath);
  fs.writeFileSync(
    path.join(destPath, 'package.json'),
    JSON.stringify({
      name: `@materials-accounting/${lib}`,
      version: "0.0.1",
      main: "index.ts",
      module: "index.ts",
      types: "index.ts"
    }, null, 2)
  );
  
});