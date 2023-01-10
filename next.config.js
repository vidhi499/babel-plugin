/** @type {import('next').NextConfig} */
const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
// const withFonts = require("next-fonts");
const path = require("path");
const withTM = require("next-transpile-modules")([
  "react-native-web",
  "@gluestack/ui",
  "@gluestack/ui-styled",
  "@expo/html-elements",
  "@gluestack/ui-creator",
]);

const node_modules = path.join("./node_modules");
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": path.resolve(node_modules, "react-native-web"),
      react: path.resolve(node_modules, "react"),
      "react-dom": path.resolve(node_modules, "react-dom"),
      "react-native-web": path.resolve(node_modules, "react-native-web"),
      "@expo/html-elements": path.resolve(node_modules, "@expo/html-elements"),
      "@gluestack/ui": path.resolve(node_modules, "@gluestack/ui"),
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];

    config.module.rules.push({
      test: /\.ttf$/,
      loader: "url-loader",
    });

    return config;
  },
};

module.exports = withPlugins(
  [withTM, [withExpo, { projectRoot: __dirname }]],
  nextConfig
);
