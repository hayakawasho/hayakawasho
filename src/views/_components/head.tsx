import { Global, css } from "@emotion/react";
import type { FC } from "react";

const SITE_URL = "https://hayakawasho.com";

const idDev = process.env.NODE_ENV !== "production";

export const Head: FC<{
  // title: string;
  // description: string;
  // pagePath: string;
}> = (_props) => {
  const title = "Sho Hayakawa";
  const description = "FRONTEND ENGINEER SHO HAYAKAWA 早川翔 portfolio site";

  return (
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta content="telephone=no" name="format-detection" />
      <title>{title}</title>
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta content="website" property="og:type" />
      <meta content={description} property="og:description" />
      <meta content={SITE_URL} property="og:url" />
      <meta content={title} property="og:site_name" />
      <meta content={SITE_URL + "/ogp.jpg"} property="og:image" />
      <link href="/favicon.ico" rel="icon" />
      {!idDev && <link as="style" href="/assets/entry.css" rel="preload" />}
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;500&display=swap"
        rel="stylesheet"
      />
      <Global
        styles={css`
          // @font-face {
          //   font-family: "Melete";
          //   src: url("/assets/Melete-UltraLight.otf") format("opentype"),
          //     url("/assets/Melete-Regular.otf") format("opentype"),
          //     url("/assets/Melete-Medium.otf") format("opentype"),
          //     url("/assets/Melete-Light.otf") format("opentype"),
          //     url("/assets/Melete-Bold.otf") format("opentype");
          // }

          :root {
            --font: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
              "Segoe UI", Roboto, "Inter", , Arial, "Hiragino Kaku Gothic ProN",
              "Hiragino Sans", Meiryo, sans-serif;
            --font-en: "Inter", sans-serif;

            --vh: 1vh;

            --grid: calc(1 / 12 * 100vw);
            --gap: calc(30 / 750 * 100vw);

            --color-text: #fff6e5;
            --color-bg: #111;
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
            color: var(--color-text);
            background-color: var(--color-bg);

            & ::-moz-selection {
              color: #fff;
              background: #1e1e1e;
            }

            & ::selection {
              color: #fff;
              background: #1e1e1e;
            }

            @media (min-resolution: 1.5dppx) {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          }

          html {
            position: fixed;
            overflow: hidden;
          }

          html,
          body {
            width: 100%;
            height: 100%;
            overscroll-behavior-y: none;
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
