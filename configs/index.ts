/* tslint:disable */
import * as path from 'path'



 export default {
  // base configuration
  appId: 2001,
  env: process.env.NODE_ENV || 'development',
  pathBase: path.join(__dirname, '..'),
  pathrc: path.join(__dirname, '../src'),
  outDir: path.join(__dirname, '../dist'),
  assetsDir: path.join(__dirname, '../src/assets/img'),
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
