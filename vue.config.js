const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(
      new MonacoWebpackPlugin({
        languages: [
          "javascript",
          "typescript",
          "css",
          "html",
          "java",
          "c",
          "cpp",
          "ruby",
          "rust",
        ],
        features: ["format", "find", "contextmenu"],
      })
    );
  },
});
