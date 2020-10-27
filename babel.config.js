module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '12'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        "@modules" : "./src/modules",
        "@shared" : "./src/shared",
        "@config" : "./src/config"
      }
    }],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
