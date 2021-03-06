const path = require("path")
const TSDocgenPlugin = require("react-docgen-typescript-webpack-plugin")

module.exports = (baseConfig, env, defaultConfig) => {
  // Transpile Gatsby module because Gastby includes un-transpiled ES6 code.
  defaultConfig.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  defaultConfig.module.rules[0].use[0].loader = require.resolve("babel-loader")

  // use @babel/preset-react for JSX and env (instead of staged presets)
  defaultConfig.module.rules[0].use[0].options.presets = [
    require.resolve("@babel/preset-react"),
    require.resolve("@babel/preset-env"),
  ]

  // use @babel/plugin-proposal-class-properties for class arrow functions
  defaultConfig.module.rules[0].use[0].options.plugins = [
    require.resolve("@babel/plugin-proposal-class-properties"),
  ]

  defaultConfig.resolve.alias = {
    "@": path.resolve("src"),
  }

  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("awesome-typescript-loader"),
  })
  defaultConfig.plugins.push(new TSDocgenPlugin()) // optional
  defaultConfig.resolve.extensions.push(".ts", ".tsx")

  return defaultConfig
}
