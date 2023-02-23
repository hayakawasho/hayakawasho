// const Image = require('@11ty/eleventy-img')
const prettier = require('prettier')
const { pluginPrismic } = require('eleventy-plugin-prismic')

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPassthroughCopy({
    static: '/',
  })

  eleventyConfig.addPlugin(pluginPrismic, {
    endpoint: process.env.API_ENDPOINT,
    clientConfig: {
      accessToken: process.env.API_TOKEN,
    },
  })

  // jsxでコンパイルしたhtmlを整形する
  eleventyConfig.addTransform('prettier', (content, outputPath) => {
    if (outputPath.endsWith('.html') && process.env.NODE_ENV !== 'production') {
      return prettier.format(content, { parser: 'html' })
    }

    return content
  })

  return {
    dir: {
      input: 'transpiled',
      output: '_site',
      data: '_data',
    },
  }
}
