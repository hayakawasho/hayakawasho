import { css } from "@emotion/react";
import { Head } from "./head";
import type { FC, ReactNode } from "react";

const idDev = process.env.NODE_ENV !== "production";
const LOCAL_IP_ADDR = process.env.LOCAL_IP_ADDR || "localhost";

export const PageWithHeader: FC<{
  seo: ReactNode;
  header: ReactNode;
  children: ReactNode;
}> = ({ header, children, seo }) => {
  return (
    <html lang="ja">
      <Head seo={seo} />
      <body>
        <svg
          aria-hidden="true"
          style={{
            height: 0,
            overflow: "hidden",
            position: "absolute",
            width: 0,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <symbol id="icon-arrow_right" viewBox="0 0 63 32">
            <path d="M45.926 31.443q-0.557-0.557-0.557-1.393t0.557-1.393l10.646-10.646h-54.592q-0.805 0-1.393-0.588t-0.588-1.393 0.588-1.393 1.393-0.588h54.654l-10.646-10.646q-0.619-0.557-0.619-1.393t0.619-1.393q0.557-0.619 1.393-0.619t1.393 0.619l14.050 13.988q0.557 0.557 0.557 1.393t-0.557 1.393l-14.112 14.050q-0.557 0.557-1.393 0.557t-1.393-0.557z"></path>
          </symbol>
        </svg>
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen pointer-events-none -z-1 invisible"
          css={svh}
          data-ref="windowSizeWatcher"
        ></div>
        <div css={bg} role="presentation"></div>
        <div css={maskUpper} role="presentation"></div>
        <div css={maskLower} role="presentation"></div>
        <div css={gridLeft} role="presentation"></div>
        <div css={gridMiddle} role="presentation"></div>
        <div css={gridRight} role="presentation"></div>
        {header}
        {children}
        <div data-component=""></div>
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
          <script
            src={`http://${LOCAL_IP_ADDR}:3000/src/entry.ts`}
            type="module"
          />
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

const mask = css`
  pointer-events: none;
  display: block;
  height: 7rem;
  width: 100%;
  position: fixed;
  z-index: 11;
  left: 0;
  opacity: 0.5;

  @media (min-width: 640px) {
    height: 14rem;
  }
`;

const maskUpper = css`
  ${mask}
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(22, 22, 22, 0.32) 0%,
    rgba(22, 22, 22, 0.16) 40%,
    rgba(22, 22, 22, 0.04) 80%,
    rgba(22, 22, 22, 0) 100%
  );
`;

const maskLower = css`
  ${mask}
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(22, 22, 22, 0.32) 0%,
    rgba(22, 22, 22, 0.16) 40%,
    rgba(22, 22, 22, 0.04) 80%,
    rgba(22, 22, 22, 0) 100%
  );
`;

const gridLine = css`
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 1px;
  height: 100%;
  width: 1px;
  height: 100%;
  transform: translateX(-50%);
  // z-index: 2;
  background: rgba(255, 255, 255, 0.05);
  background: rgba(0, 0, 0, 0.04);

  @media (prefers-color-scheme: dark) {
    // background: rgba(0, 0, 0, 0.05);
  }
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

const bg = css`
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg);
  background: linear-gradient(0deg, var(--color-bg), #ffffff);
`;
