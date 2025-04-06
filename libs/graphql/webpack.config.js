// libs/graphql/webpack.config.js
module.exports = (config) => {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.graphql$/,
          exclude: /node_modules/,
          use: [{ loader: 'webpack-graphql-loader' }],
        },
      ],
    },
    resolve: {
      ...config.resolve,
      extensions: [...config.resolve.extensions, '.graphql'],
    },
  };
};