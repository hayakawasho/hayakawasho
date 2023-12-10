import { css } from "@emotion/react";
import { Head } from "./head";
import type { FC, ReactNode } from "react";

const idDev = process.env.NODE_ENV !== "production";

export const PageWithHeader: FC<{
  seo: ReactNode;
  header: ReactNode;
  children: ReactNode;
}> = ({ header, children, seo }) => {
  return (
    <html lang="ja">
      <Head seo={seo} />
      <body>
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen pointer-events-none -z-1 invisible"
          css={svh}
          data-ref="windowSizeWatcher"
        ></div>
        <div className="pointer-events-none" role="presentation">
          <div css={maskUpper}></div>
          <div css={maskLower}></div>
          <div css={gridLeft}></div>
          <div css={gridMiddle}></div>
          <div css={gridRight}></div>
        </div>
        {header}
        {children}
        <div data-component="toScroll"></div>
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen h-screen pointer-events-none z-10"
          data-ref="glWorld"
        >
          <canvas className="w-screen h-screen" data-ref="canvas"></canvas>
        </div>
        <script
          defer
          src="https://polyfill.io/v3/polyfill.min.js?features=MediaQueryList.prototype.addEventListener%2CMediaQueryList.prototype.removeEventListener%2CString.prototype.padStart%2CIntersectionObserver%2CResizeObserver"
        />
        {idDev && (
          <script src="http://localhost:3000/src/entry.ts" type="module" />
        )}
        {!idDev && <script src="/assets/entry.js" type="module" />}
      </body>
    </html>
  );
};

const svh = css`
  height: var(--vh * 100);
  height: 100svh;
`;

const maskUpper = css`
  display: block;
  height: 7rem;
  width: 100%;
  position: fixed;
  z-index: 11;
  left: 0;
  opacity: 1;
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(22, 22, 22, 0.32) 0%,
    rgba(22, 22, 22, 0.16) 40%,
    rgba(22, 22, 22, 0.04) 80%,
    rgba(22, 22, 22, 0) 100%
  );

  @media (min-width: 640px) {
    height: 14rem;
  }
`;

const maskLower = css`
  display: block;
  height: 7rem;
  width: 100%;
  position: fixed;
  z-index: 11;
  left: 0;
  opacity: 1;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(22, 22, 22, 0.32) 0%,
    rgba(22, 22, 22, 0.16) 40%,
    rgba(22, 22, 22, 0.04) 80%,
    rgba(22, 22, 22, 0) 100%
  );

  @media (min-width: 640px) {
    height: 14rem;
  }
`;

const gridLine = css`
  position: fixed;
  top: 0;
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  width: 1px;
  height: 100%;
  transform: translateX(-50%);
`;

const gridLeft = css`
  ${gridLine}
  left: 2rem;

  @media (min-width: 640px) {
    left: 25%;
  }
`;

const gridMiddle = css`
  ${gridLine}
  left: 50%;
`;

const gridRight = css`
  ${gridLine}
  right: 2rem;

  @media (min-width: 640px) {
    right: auto;
    left: 75%;
  }
`;
