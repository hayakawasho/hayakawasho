import { Global, css } from "@emotion/react";
import type { FC, ReactNode } from "react";

const idDev = process.env.NODE_ENV !== "production";

export const Head: FC<{
  seo: ReactNode;
}> = ({ seo }) => {
  return (
    <head>
      {seo}
      <link href="/favicon.ico" rel="icon" />
      {!idDev && <link as="style" href="/assets/entry.css" rel="preload" />}
      <link
        as="font"
        href="/assets/Moneta-Light.woff2"
        rel="preload"
        type="font/woff2"
      />
      <link
        as="font"
        href="/assets/Moneta-Light.woff"
        rel="preload"
        type="font/woff"
      />
      <link href="https://fonts.googleapis.com" rel="dns-prefetch preconnect" />
      <link href="https://fonts.gstatic.com" rel="dns-prefetch preconnect" />
      <link
        as="style"
        href="https://fonts.googleapis.com/css2?family=Jost:wght@400&display=swap"
        onLoad={`this.onload = null; this.rel='stylesheet';` as any}
        rel="stylesheet"
      />
      <Global styles={base} />
      {!idDev && (
        <link
          as="style"
          href="/assets/entry.css"
          onLoad={`this.onload = null; this.rel='stylesheet';` as any}
          rel="stylesheet"
        />
      )}
      <Global styles={utilities} />
    </head>
  );
};

const base = css`
  :root {
    --font: "Jost", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    --font-en: "Moneta", sans-serif;

    --vh: 1vh;

    --grid: calc(1 / 12 * 100vw);
    --gap: calc(30 / 750 * 100vw);

    --color-text: #fff6e5;
    --color-bg: #161616;

    @media (prefers-color-scheme: dark) {
      --color-text: #161616;
      --color-bg: #fff;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
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
      color: var(--color-bg);
      background: var(--color-text);
    }

    & ::selection {
      color: var(--color-bg);
      background: var(--color-text);
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

  @font-face {
    font-family: "Moneta";
    src: local("Moneta Light"), local("Moneta-Light"),
      url("/assets/Moneta-Light.woff2") format("woff2"),
      url("/assets/Moneta-Light.woff") format("woff");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
`;

const utilities = css`
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
`;
