import { Global, css } from '@emotion/react';
import type { FC, ReactNode } from 'react';

const idDev = process.env.NODE_ENV !== 'production';
const LOCAL_IP_ADDR = process.env.LOCAL_IP_ADDR || 'localhost';

export const Head: FC<{
  seo: ReactNode;
}> = ({ seo }) => {
  return (
    <head>
      <link
        as="font"
        crossOrigin=""
        href="/assets/gallerymodern-webfont.woff2"
        rel="preload"
        type="font/woff2"
      />
      {!idDev && (
        <link
          as="style"
          href="/assets/entry.css"
          onLoad={`this.onload=null;this.rel='stylesheet';` as any}
          rel="preload"
        />
      )}
      <link href="https://fonts.googleapis.com" rel="dns-prefetch preconnect" />
      <link href="https://fonts.gstatic.com" rel="dns-prefetch preconnect" />
      <link
        as="style"
        href="https://fonts.googleapis.com/css2?family=Jost:wght@400&display=swap"
        onLoad={`this.onload=null;this.rel='stylesheet';` as any}
        rel="preload"
      />
      <link
        as="style"
        href="https://api.fontshare.com/css?f[]=satoshi@500&display=swap"
        onLoad={`this.onload=null;this.rel='stylesheet';` as any}
        rel="preload"
      />
      {seo}
      <link
        as="style"
        href="https://fonts.googleapis.com/css2?family=Jost:wght@400&amp;display=swap"
        rel="stylesheet"
      />
      <link
        as="style"
        href="https://api.fontshare.com/css?f[]=satoshi@500&amp;display=swap"
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
      {idDev && (
        <script defer={true} src={`http://${LOCAL_IP_ADDR}:3000/src/entry.ts`} type="module" />
      )}
      {!idDev && <script defer={true} src="/assets/entry.js" type="module" />}
    </head>
  );
};

const base = css`
  :root {
    --font: 'Jost', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Arial,
      'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
    --font-heading: 'Satoshi', sans-serif;
    --font-en: 'Gallery Modern', serif;

    --vh: 1vh;

    --grid: calc(1 / 12 * 100vw);
    --gap: calc(30 / 750 * 100vw);

    --color-text: #1e1f1f;
    --color-bg: #c4c4c4;

    @media (prefers-color-scheme: dark) {
      --color-text: #c4c4c4;
      --color-bg: #1e1f1f;
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

  // :focus-visible {
  //   @media not (hover: hover) {
  //     outline-style: none;
  //   }
  // }

  ol,
  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  picture {
    display: block;
  }

  summary {
    display: block;
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  @font-face {
    font-family: 'Gallery Modern';
    src: url('/assets/gallerymodern-webfont.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
`;
