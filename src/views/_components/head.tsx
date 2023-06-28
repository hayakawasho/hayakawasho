// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Global, css } from "@emotion/react";

const SITE_TITLE = " | FRONTEND ENGINEER";
const DESCRIPTION = "FRONTEND ENGINEER SHO HAYAKAWA 早川翔 portfolio site";
const SITE_URL = "";

const idDev = process.env.NODE_ENV !== "production";

export const Head = (props) => {
  const title = props.title + " | " + SITE_TITLE;
  const description = props.description || DESCRIPTION;
  const pagePath = props.pagePath;
  const isHome = pagePath === "";

  return (
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="telephone=no" name="format-detection" />
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta content={isHome ? "website" : "article"} property="og:type" />
      <meta content={description} property="og:description" />
      <meta content={SITE_URL + pagePath} property="og:url" />
      <meta content={SITE_TITLE} property="og:site_name" />
      <meta content={SITE_URL + "/ogp.jpg"} property="og:image" />
      <link href="/favicon.ico" rel="icon" />
      {!idDev && <link as="style" href="/assets/entry.css" rel="preload" />}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link
        crossOrigin="true"
        href="https://fonts.gstatic.com"
        rel="preconnect"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:100,300,400&family=Fjalla+One&display=swap"
        rel="stylesheet"
      />
      <Global
        styles={css`
          @font-face {
            font-family: "Melete";
            src: url("/assets/Melete-UltraLight.otf") format("opentype"),
              url("/assets/Melete-Regular.otf") format("opentype"),
              url("/assets/Melete-Medium.otf") format("opentype"),
              url("/assets/Melete-Light.otf") format("opentype"),
              url("/assets/Melete-Bold.otf") format("opentype");
          }

          :root {
            --font: Montserrat, "YuGothic Medium", "Yu Gothic", YuGothic,
              "游ゴシック", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo,
              sans-serif;
            --font-melete: "Melete", sans-serif;
            --font-fjalla: "Fjalla One", sans-serif;
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
            font-size: calc(10 / 1280 * 100vw);

            @media (min-width: 1280px) {
              font-size: calc(
                10px + (12 - 10) * ((100vw - 1280px) / (1680 - 1280))
              );
            }

            @media (min-width: 1680px) {
              font-size: 12px;
            }

            @media (max-width: 639px) {
              font-size: calc(10 / 375 * 100vw);
            }
          }

          body {
            font-family: var(--font) !important;
            overflow-x: hidden;
            overflow-wrap: break-word;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: subpixel-antialiased;
            -moz-osx-font-smoothing: unset;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
            // color: var(--color-text);
            // background-color: #f4f4f4ff;

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
      {!idDev && <link href="/assets/entry.css" rel="stylesheet" />}
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
        `}
      />
    </head>
  );
};
