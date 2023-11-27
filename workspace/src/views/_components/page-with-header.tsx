import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";
import { Head } from "./head";
import { Svgsprite } from "./svgsprite";
import type { FC, ReactNode } from "react";

const idDev = process.env.NODE_ENV !== "production";
const LOCAL_IP_ADDR = process.env.LOCAL_IP_ADDR || "localhost";

export const PageWithHeader: FC<{
  namespace: string;
  seo: ReactNode;
  header: ReactNode;
  children: ReactNode;
}> = ({ header, children, namespace, seo }) => {
  return (
    <html lang="ja">
      <Head seo={seo} />
      <body data-page={namespace}>
        <Svgsprite />
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen pointer-events-none -z-1 invisible"
          css={svh}
          data-ref="windowSizeWatcher"
        />
        <div css={bg} role="presentation" />
        <div css={gradUpper} role="presentation" />
        <div css={gradLower} role="presentation" />
        <div css={gridLeft} role="presentation" />
        <div css={gridMiddle} role="presentation" />
        <div css={gridRight} role="presentation" />
        {header}
        <div data-component="Scrollbar" />
        <div
          aria-live="polite"
          className="w-full absolute top-0 left-0 backface-hidden"
          data-ref="main"
          hx-history-elt=""
          id="main"
        >
          <div className="h-full" data-xhr={namespace}>
            {children}
          </div>
        </div>
        <div css={scrollbar} data-component="Scrollbar" />
        <div
          aria-hidden="true"
          className="fixed inset-0 w-screen h-screen pointer-events-none z-10"
          data-ref="glWorld"
        >
          <canvas className="w-screen h-screen" data-ref="canvas"></canvas>
        </div>
        <div css={ui}>
          <div className="hidden" data-component="Cursor" />
        </div>
        {idDev && (
          <script
            defer={true}
            src={`http://${LOCAL_IP_ADDR}:3000/src/entry.ts`}
            type="module"
          />
        )}
        {!idDev && <script defer={true} src="/assets/entry.js" type="module" />}
      </body>
    </html>
  );
};

const svh = css`
  height: var(--vh * 100);
  height: 100svh;
`;

const grad = css`
  pointer-events: none;
  display: block;
  height: 8rem;
  width: 100%;
  position: fixed;
  z-index: 11;
  left: 0;

  @media (min-width: 640px) {
    height: 12rem;
  }
`;

const gradUpper = css`
  ${grad}
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(22, 22, 22, 0.32) 0%,
    rgba(22, 22, 22, 0.16) 40%,
    rgba(22, 22, 22, 0.04) 80%,
    rgba(22, 22, 22, 0) 100%
  );
`;

const gradLower = css`
  ${grad}
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
  transform: translateX(-50%);
  background: rgba(4, 31, 30, 0.07);

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 246, 229, 0.07);
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

const screen = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const bg = css`
  ${screen}
  pointer-events: none;
  background: linear-gradient(0deg, #fff, var(--color-bg));

  @media (prefers-color-scheme: dark) {
    background: var(--color-bg);
  }
`;

const ui = css`
  ${screen}
  pointer-events: none;
  z-index: 999;
`;

const scrollbar = css`
  position: fixed;
  top: 50vh;
  right: 3.2rem;
  z-index: 99;
  pointer-events: none;

  @media ${mq.pc} {
    right: 4rem;
  }
`;
