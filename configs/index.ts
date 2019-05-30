/* tslint:disable */
// import * as path from 'path'
const paths = require('path')

module.exports = {
  // base configuration
  appId: 2001,
  env: process.env.NODE_ENV || 'development',
  pathBase: paths.join(__dirname, '..'),
  pathSrc: paths.join(__dirname, '../src'),
  outDir: paths.join(__dirname, '../dist'),
  assetsDir: paths.join(__dirname, '../src/assets/img'),
  port: process.env.PORT || 3000,
  version: '1.0.0',
  compilerVendor: [
    'react',
    'react-dom',
    'react-router-dom',
    'react-loadable',
    'axios',
    'history',
    'mobx',
    'mobx-react',
    'mobx-react-router',
    'moment',
  ],
  sourcemaps: false,
  globals: {},
  compilerPublicPath: '/',
}
