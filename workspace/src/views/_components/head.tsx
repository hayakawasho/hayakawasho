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
      <link
        as="font"
        href="/assets/gallerymodern-webfont.woff2"
        rel="preload"
        type="font/woff2"
      />
      {!idDev && <link as="style" href="/assets/entry.css" rel="preload" />}
      <link href="https://fonts.googleapis.com" rel="dns-prefetch preconnect" />
      <link href="https://fonts.gstatic.com" rel="dns-prefetch preconnect" />
      <link
        as="style"
        href="https://fonts.googleapis.com/css2?family=Jost:wght@400&display=swap"
        onLoad={`this.onload = null; this.rel='stylesheet';` as any}
        rel="stylesheet"
      />
      <link
        as="style"
        href="https://api.fontshare.com/css?f[]=satoshi@500&display=swap"
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
    </head>
  );
};

const base = css`
  :root {
    --font: "Jost", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    --font-heading: "Satoshi", sans-serif;
    --font-en: "Gallery Modern", serif;

    --vh: 1vh;

    --grid: calc(1 / 12 * 100vw);
    --gap: calc(30 / 750 * 100vw);

    --color-text: #041f1e;
    --color-bg: #f2f2f2;

    @media (prefers-color-scheme: dark) {
      --color-text: #fff6e5;
      --color-bg: #041f1e;
    }
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 10px;

    @media screen and (max-width: 1080px) {
      font-size: 9px;
    }

    @media screen and (max-width: 960px) {
      font-size: 8px;
    }

    @media screen and (max-width: 854px) {
      font-size: 7px;
    }

    @media screen and (max-width: 767px) {
      font-size: 6px;
    }

    @media screen and (max-width: 639px) {
      font-size: 10px;
    }

    @media (min-width: 1680px) {
      font-size: 12px;
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
    display: block;
  }

  @font-face {
    font-family: "Gallery Modern";
    src: url("/assets/gallerymodern-webfont.woff2") format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;
