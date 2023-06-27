const Image = require('@11ty/eleventy-img')
const prettier = require('prettier')
const outdent = require('outdent')

const isDev = process.env.NODE_ENV !== 'production'
const distDir = '_site'

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addPassthroughCopy({
    static: '/',
  })

  // jsxでコンパイルしたhtmlを整形する
  eleventyConfig.addTransform('prettier', (content, outputPath) => {
    if (isDev && outputPath.endsWith('.html')) {
      return prettier.format(content, {
        parser: 'html',
      })
    }

    return content
  })

  eleventyConfig.addJavaScriptFunction('image', imageShortcode)
  eleventyConfig.addJavaScriptFunction('responsiveImage', responsiveImageShortcode)

  return {
    dir: {
      input: '_transpiled',
      output: distDir,
      data: '_data',
    },
  }
}

//----------------------------------------------------------------

const createImageMetadata = (src, widths, formats) => {
  return Image(src, {
    widths: [...widths, null],
    formats: [...formats, null],
    outputDir: distDir + '/assets/img',
    urlPath: '/assets/img',
    sharpPngOptions: {
      quality: 80,
    },
    sharpJpegOptions: {
      mozjpeg: true,
    },
  })
}

const createSourceHtmlString = (imageMetadata, sizes, media = '') => {
  return Object.values(imageMetadata)
    .map(images => {
      const { sourceType } = images[0]
      const { width, height } = images[images.length - 1]

      return `<source
        type="${sourceType}"
        width="${width}"
        height="${height}"
        srcset="${images.map(image => image.srcset).join(', ')}"
        sizes="${sizes}"
        ${media}
      >`
    })
    .join('\n')
}

const getLargestImage = (imageMetadata, format) => {
  const images = imageMetadata[format]
  return images[images.length - 1]
}

const imageShortcode = async (
  src,
  alt = '',
  className = '',
  loading = 'eager',
  widths = [400, 800, 1280],
  formats = ['webp', 'jpeg'],
  sizes = '100vw'
) => {
  const imageMetadata = await createImageMetadata(src, widths, formats)

  const largestUnoptimizedImg = getLargestImage(imageMetadata, formats[0])
  const sourceHtmlString = createSourceHtmlString(imageMetadata, sizes)

  const createImgHtmlString = (img, alt, className) => {
    return `<img
      src="${img.url}"
      width="${img.width}"
      height="${img.height}"
      decoding="async"
      alt="${alt}"
      class="${className}"
      loading="${loading}"
    >`
  }

  const imgHtmlString = createImgHtmlString(largestUnoptimizedImg, alt, className)

  const picture = `<picture>
    ${sourceHtmlString}
    ${imgHtmlString}
  </picture>`

  return outdent`${picture}`
}

const responsiveImageShortcode = async (
  pcSrc,
  spSrc,
  alt = '',
  className = '',
  loading = 'eager',
  widths = [400, 800, 1280],
  formats = ['webp', 'jpeg'],
  sizes = '100vw'
) => {
  const pcImageMetadata = await createImageMetadata(pcSrc, widths, formats)
  const spImageMetadata = await createImageMetadata(spSrc, widths, formats)

  const pcLargestUnoptimizedImg = getLargestImage(pcImageMetadata, formats[0])
  const spLargestUnoptimizedImg = getLargestImage(spImageMetadata, formats[0])

  const pcSourceHtmlString = createSourceHtmlString(
    pcImageMetadata,
    sizes,
    `media="(min-width:640px)"`
  )
  const spSourceHtmlString = createSourceHtmlString(
    spImageMetadata,
    sizes,
    `media="not screen and (min-width:640px)"`
  )

  const createImgHtmlString = (img, alt, className) => {
    return `<img
      src="${img.url}"
      width="${img.width}"
      height="${img.height}"
      decoding="async"
      alt="${alt}"
      class="${className}"
      data-pc-src=${pcLargestUnoptimizedImg.url}
      data-sp-src=${spLargestUnoptimizedImg.url}
      loading="${loading}"
    >`
  }

  const imgHtmlString = createImgHtmlString(spLargestUnoptimizedImg, alt, className)

  const picture = `<picture>
    ${pcSourceHtmlString}
    ${spSourceHtmlString}
    ${imgHtmlString}
  </picture>`

  return outdent`${picture}`
}
