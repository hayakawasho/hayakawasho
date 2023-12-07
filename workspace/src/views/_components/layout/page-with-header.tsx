import { css } from '@emotion/react';
import { mq } from '@/_foundation/mq';
import { Head } from './head';
import { Svgsprite } from './svgsprite';
import type { FC, ReactNode } from 'react';

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
          <div className="sp:hidden" data-component="Cursor" />
        </div>
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
  height: 33vh;
  width: 100%;
  position: fixed;
  z-index: 11;
  left: 0;
  opacity: 0.4;

  @media (min-width: 640px) {
    height: 12rem;
    height: 25vh;
  }
`;

const gradUpper = css`
  ${grad}
  top: 0;
  // background: linear-gradient(
  //   to bottom,
  //   rgba(22, 22, 22, 0.32) 0%,
  //   rgba(22, 22, 22, 0.16) 40%,
  //   rgba(22, 22, 22, 0.04) 80%,
  //   rgba(22, 22, 22, 0) 100%
  // );

  background-image: linear-gradient(
    hsla(0, 0%, 0%, 0.5),
    hsla(0, 0%, 0%, 0.49016) 1.17%,
    hsla(0, 0%, 0%, 0.46296) 4.49%,
    hsla(0, 0%, 0%, 0.42188) 9.72%,
    hsla(0, 0%, 0%, 0.37037) 16.59%,
    hsla(0, 0%, 0%, 0.31192) 24.86%,
    hsla(0, 0%, 0%, 0.25) 34.25%,
    hsla(0, 0%, 0%, 0.18808) 44.52%,
    hsla(0, 0%, 0%, 0.12963) 55.41%,
    hsla(0, 0%, 0%, 0.07813) 66.66%,
    hsla(0, 0%, 0%, 0.03704) 78.01%,
    hsla(0, 0%, 0%, 0.00984) 89.21%,
    hsla(0, 0%, 0%, 0)
  );
`;

const gradLower = css`
  ${grad}
  bottom: 0;
  // background: linear-gradient(
  //   to top,
  //   rgba(22, 22, 22, 0.32) 0%,
  //   rgba(22, 22, 22, 0.16) 40%,
  //   rgba(22, 22, 22, 0.04) 80%,
  //   rgba(22, 22, 22, 0) 100%
  // );

  background-image: linear-gradient(
    hsla(0, 0%, 0%, 0),
    hsla(0, 0%, 0%, 0.00984) 10.79%,
    hsla(0, 0%, 0%, 0.03704) 21.99%,
    hsla(0, 0%, 0%, 0.07813) 33.34%,
    hsla(0, 0%, 0%, 0.12963) 44.59%,
    hsla(0, 0%, 0%, 0.18808) 55.48%,
    hsla(0, 0%, 0%, 0.25) 65.75%,
    hsla(0, 0%, 0%, 0.31192) 75.14%,
    hsla(0, 0%, 0%, 0.37037) 83.41%,
    hsla(0, 0%, 0%, 0.42188) 90.28%,
    hsla(0, 0%, 0%, 0.46296) 95.51%,
    hsla(0, 0%, 0%, 0.49016) 98.83%,
    hsla(0, 0%, 0%, 0.5)
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
