const presets = [
  [
    "@babel/preset-env",
    {
      "targets": {
        "browsers": [
          "ie >= 7"
        ]
      },
      "modules": "commonjs",
      "loose": true
    }
  ],
  "@babel/preset-react",
  [
    "@babel/preset-typescript",
    {
      "isTSX": true,
      "allExtensions": true
    }
  ]
];

const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    {
      "legacy": true
    }
  ],
  "@babel/plugin-syntax-dynamic-import",
  "@babel/plugin-proposal-class-properties",
  [
    "@babel/plugin-transform-runtime",
    {
      "corejs": false,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }
  ],
  // "react-hot-loader/babel"
]
module.exports = { presets, plugins };
