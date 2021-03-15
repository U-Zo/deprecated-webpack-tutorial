const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

const appIndex = path.resolve(__dirname, 'src', 'index.tsx');
const appBuild = path.resolve(__dirname, 'build');
const appSrc = path.resolve(__dirname, 'src');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const appHtml = path.resolve(__dirname, 'public', 'index.html');

require('dotenv').config();
const webpack = require('webpack');

const getClientEnv = () => ({
  'process.env': JSON.stringify(
    Object.keys(process.env)
      .filter((key) => /^REACT_APP/i.test(key))
      .reduce((env, key) => {
        env[key] = process.env[key];
        return env;
      })
  ),
});

module.exports = () => {
  const isEnvDevelopment = process.env.NODE_ENV === 'development';
  const isEnvProduction = process.env.NODE_ENV === 'production';
  const clientEnv = getClientEnv();

  return {
    mode: process.env.NODE_ENV,
    entry: appIndex,
    output: {
      path: appBuild,
      filename: isEnvProduction
        ? 'static/js/[name].[contenthash:8].js'
        : isEnvDevelopment && 'static/js/bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            'cache-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: isEnvDevelopment ? true : false, // 개발 환경의 경우 위 로더를 사용하여 컴파일하지 않음
              },
            },
          ],
        },
        {
          loader: 'file-loader',
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            outputPath: 'static/media',
            name: '[name].[hash:8].[ext]',
            esModule: false,
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            outputPath: 'static/media',
            name: '[name].[hash:8].ext',
          },
        },
      ],
    },
    plugins: [
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        formatter: 'react-dev-utils/eslintFormatter',
        context: appSrc,
        cache: true,
        baseConfig: {
          extends: ['eslint-config-react-app/base'],
        },
      }),
      new HtmlWebpackPlugin({
        template: appHtml,
      }),
      new webpack.DefinePlugin(clientEnv),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', 'jsx', 'js'],
    },
  };
};
