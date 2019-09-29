const path = require("path");
const slsw = require("serverless-webpack");

const ignoreWarnings = [
  [/call_capturer.js/, /the request of a dependency is an expression/],
  [/colors.js/, /the request of a dependency is an expression/]
];

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  target: "node",
  externals: [/aws-sdk/],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  stats: {
    warningsFilter: warning => {
      return ignoreWarnings.some(regexs =>
        regexs.every(regex => regex.test(warning))
      );
    }
  }
};
