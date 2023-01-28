// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Global, css } from '@emotion/react'

const SITE_TITLE = ' | FRONTEND ENGINEER'
const DESCRIPTION = 'FRONTEND ENGINEER SHO HAYAKAWA 早川翔 portfolio site'
const SITE_URL = ''

const idDev = process.env.NODE_ENV !== 'production'

export const Head = props => {
  const title = props.title + ' | ' + SITE_TITLE
  const description = props.description || DESCRIPTION
  const pagePath = props.pagePath
  const isHome = pagePath === ''

  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="Content-Type" content="text/html" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={isHome ? 'website' : 'article'} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={SITE_URL + pagePath} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="og:image" content={SITE_URL + '/ogp.jpg'} />
      <link rel="icon" href="/favicon.ico" />
      {!idDev && <link rel="preload" href="/assets/entry.css" as="style" />}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <Global
        styles={css`
          :root {
            --font: 'Noto Sans JP', sans-serif;
            --font-roboto: 'Roboto Condensed', sans-serif;

            --vh: 1vh;

            --color-text: #e3e3e3;
            --color-text-primary: #858585;
            --color-theme: #1793a9;
          }

          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }

          html {
            min-height: 100vh;
            font-size: calc(10 / 1280 * 100vw);

            @media (min-width: 1280px) {
              font-size: calc(10px + (12 - 10) * ((100vw - 1280px) / (1680 - 1280)));
            }

            @media (min-width: 1680px) {
              font-size: 12px;
            }

            @media (max-width: 639px) {
              font-size: calc(10 / 375 * 100vw);
            }
          }

          body {
            color: var(--color-text);
            background: #191918;
            overflow-x: hidden;
            font-family: var(--font);
            overflow-wrap: break-word;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: subpixel-antialiased;
            -moz-osx-font-smoothing: unset;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
            font-feature-settings: 'palt' 1;

            & ::-moz-selection {
              color: #fff;
              background: #101010;
            }

            & ::selection {
              color: #fff;
              background: #101010;
            }

            @media (min-resolution: 1.5dppx) {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          }

          dialog {
            padding: 0;
            margin: 0;
            max-width: 100%;
            height: 100%;
            max-height: 100%;
            padding: 0;
            margin: 0;
            overflow-y: auto;
            background-color: transparent;
            border: none;
            -ms-overflow-style: none;
            scrollbar-width: none;

            &::-webkit-scrollbar {
              display: none;
            }

            &::backdrop {
              background-color: transparent;
            }
          }

          :any-link {
            color: inherit;
            text-decoration: none;
          }

          ol,
          ul {
            list-style: none;
          }

          img {
            max-width: 100%;
            height: auto;
            vertical-align: middle;
          }
        `}
      />
      {!idDev && <link rel="stylesheet" href="/assets/entry.css" />}
      <script
        src="https://polyfill.io/v3/polyfill.min.js?features=MediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
        defer
      />
      {idDev && <script type="module" src="http://localhost:3000/src/entry.ts" defer />}
      {!idDev && <script type="module" src="/assets/entry.js" defer />}
      <Global
        styles={css`
          .u-sp {
            @media (min-width: 640px) {
              display: none !important;
            }
          }

          .u-pc {
            @media (max-width: 639px) {
              display: none !important;
            }
          }

          .u-in {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .u-cf {
            &::after {
              display: block;
              clear: both;
              content: '';
            }
          }

          .u-fit {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}
      />
    </head>
  )
}
