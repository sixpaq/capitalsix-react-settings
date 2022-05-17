const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
      library: "settings",
      libraryTarget: "umd",
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development"
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: { outputPath: 'css/', name: '[name].css' }
            },
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: "css-loader"
            },
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].scss",
        chunkFilename: "[id].scss",
      }),
    ],
    resolve: {
      alias: {
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        'react-intl': path.resolve(__dirname, './node_modules/react-intl'),
        'react-router': path.resolve(__dirname, './node_modules/react-router'),
        'react-router-dom': path.resolve(__dirname, './node_modules/react-router-dom'),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"]
    },
    externals: {
      // Don't bundle react or react-dom      
      react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
      },
      "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM"
      },
      "react-intl": {
        commonjs: "react-intl",
        commonjs2: "react-intl",
        amd: "ReactIntl",
        root: "ReactIntl"
      },
      "react-router": {
        commonjs: "react-router",
        commonjs2: "react-router",
        amd: "ReactRouter",
        root: "ReactRouter"
      },
      "react-router-dom": {
        commonjs: "react-router-dom",
        commonjs2: "react-router-dom",
        amd: "ReactRouterDOM",
        root: "ReactRouterDOM"
      }
    }
  }
}