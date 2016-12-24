const webpack = require("webpack");

module.exports = function (config) {
  config.set({
    singleRun: true,
    basePath: "",
    frameworks: ["mocha"],
    browsers: [
        "PhantomJS"
    ],
    reporters: ["mocha", "karma-remap-istanbul"],
    remapIstanbulReporter: {
      reports: {
        html: "coverage",
        "text-summary": null
      }
    },
    preprocessors: {
        "test/index.test.ts" :  ["webpack", "sourcemap"]
    },
    files : [
        { pattern: "node_modules/html5-history-api/history.js", included: true },
        { pattern: "test/index.test.ts", included: true }
    ],
    port: 9876,
    colors: true,
    autoWatch: false,
    logLevel: config.LOG_INFO,
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    webpack: {
      module: {
        preLoaders: [{
          test: /\.(ts|tsx)$/,
          loader: "tslint-loader",
          exclude: /node_modules/
        }],
        loaders: [{
          test: /\.(ts|tsx)$/,
          loader: "awesome-typescript-loader",
          exclude: /node_modules/
        }],
        postLoaders: [{
          test: /src\/.+\.(ts|tsx)$/,
          exclude: /(node_modules|\.spec\.ts$)/,
          loader: "sourcemap-istanbul-instrumenter-loader?force-sourcemap=true"
        }]
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin({
          filename: null,
          test: /\.(ts|tsx|js)($|\?)/i
        })
      ],
      resolve: {
        extensions: ["", ".ts", ".tsx", ".js"]
      },
      tslint: {
        formatter: 'verbose',
        emitErrors: !!process.env.CI
      }
    }
  });
};
