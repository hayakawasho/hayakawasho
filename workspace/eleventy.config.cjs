const prettier = require("prettier");

const isDev = process.env.NODE_ENV !== "production";
const distDir = "_site";

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPassthroughCopy({
    static: "/",
  });

  // jsxでコンパイルしたhtmlを整形する
  eleventyConfig.addTransform("prettier", (content, outputPath) => {
    if (isDev && outputPath.endsWith(".html")) {
      return prettier.format(content, {
        parser: "html",
      });
    }

    return content;
  });

  return {
    dir: {
      input: "_transpiled",
      output: distDir,
      data: "_data",
    },
  };
};
