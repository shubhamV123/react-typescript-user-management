const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //Tell webpack this is entry file
  entry: "./src/index.tsx",
  //this is webpack going to bundle all assets
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.min.js",
    publicPath: "/"
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    //Attempt to resolve these extensions in order.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    //All files with the extension .tsx or .ts should be processed by awesome-typescript-loader
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
