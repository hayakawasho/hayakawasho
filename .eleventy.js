// const Image = require('@11ty/eleventy-img')

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPassthroughCopy({
    static: '/',
  })

  return {
    dir: {
      input: 'transpiled',
      output: '_site',
      data: '_data',
    },
  }
}
