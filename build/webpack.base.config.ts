import webpack from 'webpack'
import path from 'path'
import rootconfig from '../configs'

const inRoot = path.resolve.bind(path, rootconfig.pathBase)
const inRootSrc = (file) => inRoot(rootconfig.pathBase, file)


let config: webpack.Configuration = {
  name: 'client',
  target: 'web',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: inRootSrc('dist'),
    publicPath: '/',
  }

}

export default config


