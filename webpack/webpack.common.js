const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const utils = require('./utils.js');
const environment = require('./environment');

const getTsLoaderRule = env => {
  const rules = [
    {
      loader: 'thread-loader',
      options: {
        // There should be 1 cpu for the fork-ts-checker-webpack-plugin.
        // The value may need to be adjusted (e.g. to 1) in some CI environments,
        // as cpus() may report more cores than what are available to the build.
        workers: require('os').cpus().length - 1,
      },
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true,
        happyPackMode: true,
      },
    },
  ];
  return rules;
};

module.exports = async options => {
  const development = options.env === 'development';
  return merge({
    cache: {
      // 1. Set cache type to filesystem
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '../target/webpack'),
      buildDependencies: {
        // 2. Add your config as buildDependency to get cache invalidation on config change
        config: [
          __filename,
          path.resolve(__dirname, `webpack.${development ? 'dev' : 'prod'}.js`),
          path.resolve(__dirname, 'environment.js'),
          path.resolve(__dirname, 'utils.js'),
          path.resolve(__dirname, '../postcss.config.js'),
          path.resolve(__dirname, '../tsconfig.json'),
        ],
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      modules: ['node_modules'],
      alias: utils.mapTypescriptAliasToWebpackAlias(),
      fallback: {
        path: require.resolve('path-browserify'),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: getTsLoaderRule(options.env),
          include: [utils.root('./src/main/webapp/app')],
          exclude: [utils.root('node_modules')],
        },
      ],
    },
    stats: {
      children: false,
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        LOG_LEVEL: development ? 'info' : 'error',
      }),
      new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(development),
        VERSION: JSON.stringify(environment.VERSION),
        SERVER_API_URL: JSON.stringify(environment.SERVER_API_URL),
      }),
      new ESLintPlugin({
        baseConfig: {
          parserOptions: {
            project: ['../tsconfig.json'],
          },
        },
      }),
      new ForkTsCheckerWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            // https://github.com/swagger-api/swagger-ui/blob/v4.6.1/swagger-ui-dist-package/README.md
            context: require('swagger-ui-dist').getAbsoluteFSPath(),
            from: '*.{js,css,html,png}',
            to: 'swagger-ui/',
            globOptions: { ignore: ['**/index.html'] },
          },
          {
            from: require.resolve('axios/dist/axios.min.js'),
            to: 'swagger-ui/',
          },
          { from: './src/main/webapp/content/', to: 'content/' },
          { from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp' },
          { from: './src/main/webapp/robots.txt', to: 'robots.txt' },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './src/main/webapp/index.html',
        chunksSortMode: 'auto',
        inject: 'body',
        base: '/',
      }),
    ],
  });
};
