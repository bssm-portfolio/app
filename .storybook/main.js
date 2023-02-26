const path = require("path");
module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "../");
    return config;
  },
};
