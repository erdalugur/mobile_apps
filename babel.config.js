module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            screens: './src/screens',
            theme: './src/theme',
            myRedux: './src/myRedux',
            components: './src/components',
            api: './src/api',
            config: "./src/config",
            context: "./src/context",
            navigation: "./src/navigation",
            types: "./src/types",
            icons: "./src/icons",
            utils: "./src/utils",
            constands: "./src/constands"
          }
        }
      ]
    ]
  };
};
