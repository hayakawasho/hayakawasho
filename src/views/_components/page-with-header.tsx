import { css } from "@emotion/react";
import { Head } from "./head";
import type { FC, ReactNode } from "react";

const idDev = process.env.NODE_ENV !== "production";

export const PageWithHeader: FC<{
  header: ReactNode;
  children: ReactNode;
}> = ({ header, children, ...props }) => {
  return (
    <html lang="ja">
      <Head {...props} />
      <body>
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen pointer-events-none -z-1 invisible"
          css={svh}
          data-ref="windowSizeWatcher"
        ></div>
        <div className="pointer-events-none" role="presentation">
          <div css={gradTop}></div>
          <div css={gridBottom}></div>
          <div css={gridLeft}></div>
          <div css={gridMiddle}></div>
          <div css={gridRight}></div>
        </div>
        {header}
        {children}
        <div data-component="toScroll"></div>
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen h-screen pointer-events-none z-10 opacity-0"
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

const grad = css`
  display: block;
  height: 6rem;
  width: 100%;
  position: fixed;
  z-index: 11;
  left: 0;
  opacity: 1;
`;

const gradTop = css`
  ${grad}
  top: 0;
  opacity: 0;
  background: linear-gradient(
    to bottom,
    rgba(22, 22, 22, 0.5) 0%,
    rgba(22, 22, 22, 0.2) 40%,
    rgba(22, 22, 22, 0.1) 80%,
    rgba(22, 22, 22, 0) 100%
  );
`;

const gridBottom = css`
  ${grad}
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 40%,
    rgba(0, 0, 0, 0.05) 80%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const gridLine = css`
  position: fixed;
  top: 0;
  width: 1px;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  width: 1px;
  height: 100%;
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
