const path = require("path")
const webpack = require("webpack")

const webpackMainConfig = {
  entry: ['./src/main/index.ts'],
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader', // https://webpack.js.org/guides/typescript/
        exclude: /node_modules/,
      },
    ],
  },
  // node: {
  //   __dirname: false,
  // },
  // Prevent bundling of certain imported packages and instead retrieve these
  // external deps at runtime. This is what we want for electron, placed in the
  // app by electron-packager. https://webpack.js.org/configuration/externals/
  externals: {
    electron: 'commonjs electron',
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist/electron')
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ],
}

module.exports = webpackMainConfig