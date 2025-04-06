const { withNx } = require('@nx/rollup/with-nx');
const path = require('path');

module.exports = withNx(
  {
    main: './src/index.ts',
    outputPath: '../../dist/libs/types',
    tsConfig: './tsconfig.lib.json',
    compiler: 'swc',
    format: ['esm'],
    assets: []
  },
  {
    // Дополнительные настройки rollup
    output: { 
      sourcemap: true,
      dir: path.resolve(__dirname, '../../dist/libs/types')
    }
  }
);