import webpack from 'webpack'
import merge from 'webpack-merge'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ForkTsCheckerNotifierWebpackPlugin from 'fork-ts-checker-notifier-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { CheckerPlugin } from 'awesome-typescript-loader'
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';
import rootconfig from '../configs'
import baseConfig from './webpack.base.config'



const inRoot = path.resolve.bind(path, rootconfig.pathBase)
const inRootSrc = (file) => inRoot(rootconfig.pathBase, file)
const __DEV__ = rootconfig.env === 'development'
const __PROD__ = rootconfig.env === 'production'

let config: webpack.Configuration = {
  mode: 'production',
  module: {
    rules: []
  },
  devtool: "source-map",
  entry: {
    main: [
      '@babel/polyfill',
      inRootSrc('src/Render.tsx'),
    ],
    vendor: rootconfig.compilerVendor,
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(rootconfig.env), PORT: JSON.stringify(rootconfig.port) },
      __DEV__,
      __PROD__,
    }))
  ],
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'all',
          name: 'vendor',
          enforce: true
        },
        common: {
          chunks: 'all',
          test: /[\\/]src[\\/]/,
          name: 'common',
          minChunks: 2,
          priority: 1,
          maxInitialRequests: 5,
          minSize: 0,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }

    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}

// 首先使用 awesome-typescript-loader, 再使用babel-loader
config.module.rules.push({
  test: /\.ts|tsx?$/,
  enforce: 'pre',
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        plugins: [
          [
            "import",
            {
              "libraryName": "antd",
              "libraryDirectory": "lib",
              "style": "css"
            }
          ],
        ],
        cacheDirectory: true,
        cacheCompression: true,
        compact: true
      }
    },
    {
      loader: 'awesome-typescript-loader?configFileName=tsconfig.json'
    }

  ]
})

config.module.rules.push({
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
})

config.module.rules.push({
  test: /\.less$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        importLoaders: 1
      }
    },
    {
      loader: "less-loader",
      options: {
        modifyVars: {

        },
        javascriptEnabled: true
      }
    }
  ]
})

config.module.rules.push({
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: false,
        modules: true,
        importLoaders: 1,
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: false
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [autoprefixer()],
        sourceMap: false
      }
    }
  ],
})

config.module.rules.push({
  test: /\.(mp4)$/,
  use: ['url-loader?name=files/[path][name].[ext]'],
})
config.module.rules.push({
  test: /\.(png|jpg|jpeg|gif|svg)$/,
  use: ['file-loader'],
})
config.module.rules.push({
  test: /\.(eot|ttf|otf|woff|woff2)$/,
  use: ['url-loader?limit=10000&name=files/[md5:hash:base64:10].[ext]'],
})

// 插件配置
config.plugins.push(
  new CleanWebpackPlugin(),
  new CheckerPlugin(),
  new ForkTsCheckerWebpackPlugin({
    checkSyntacticErrors: true,
  }),
  new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),
  new HtmlWebpackPlugin({
    template: inRootSrc('src/index.html'),
    favicon: inRootSrc('favicon.ico'),
    inject: true,
    manify: {
      removeComments: true,
      collapseWhitespace: false,
    },
    chunks: ['main', 'vendor'],
    filename: 'index.html',
  }),
  // 将css 单独提取出来
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: "[id].[hash].css"
  }),
  // 将public 里面的文件复制过去
  new CopyPlugin([
    {
      from: 'public',
      to: './',
      toType: 'dir'
    }
  ]),
  // 开启pwa
  new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true
  }),
)


export default merge(baseConfig, config)


