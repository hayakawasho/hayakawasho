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
      <link rel="dns-prefetch preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch preconnect" href="https://fonts.gstatic.com" />
      <link
        rel="stylesheet"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Jost:wght@400&family=Fjalla+One&display=swap"
        onLoad={`this.onload = null; this.rel='stylesheet';` as any}
      />
      <Global styles={base} />
      {!idDev && (
        <link
          rel="stylesheet"
          as="style"
          href="/assets/entry.css"
          onLoad={`this.onload = null; this.rel='stylesheet';` as any}
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
    --font-en: "Fjalla One", sans-serif;

    --vh: 1vh;

    --grid: calc(1 / 12 * 100vw);
    --gap: calc(30 / 750 * 100vw);

    --color-text: #fff6e5;
    --color-bg: #161616;
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
