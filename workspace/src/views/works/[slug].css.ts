import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const sub = css`
  font-size: 4.3rem;
  font-family: var(--font-en);
  text-transform: uppercase;
  line-height: 1;
  text-align: center;
  letter-spacing: 0.02em;
  perspective: 50vw;

  @media ${mq.pc} {
    font-size: 9.8rem;
  }
`;

export const heading = css`
  width: 100%;
  font-size: 4.1rem;
  font-weight: 500;
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
  line-height: 1;
  overflow: hidden;
  text-align: center;
  perspective: 50vw;

  @media ${mq.pc} {
    font-size: 9.4rem;
  }
`;

export const intro = css`
  position: relative;
`;

export const intro__g = css`
  height: 90vh;
  height: 90svh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${mq.pc} {
    height: 100vh;
    height: 100svh;
  }
`;

export const intro__hgroup = css`
  margin-top: -12rem;

  @media ${mq.pc} {
    position: absolute;
    top: 50%;
    margin-top: -14rem;
    padding: 0;
  }
`;

export const intro__info = css`
  position: absolute;
  bottom: 6rem;
  left: 0;
  padding: 0 var(--grid);
  display: flex;
  align-items: flex-start;

  @media ${mq.pc} {
    position: absolute;
    bottom: 6rem;
    left: calc(var(--grid) * 3);
    padding: 0;
  }
`;

export const info = css`
  width: calc(var(--grid) * 5);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media ${mq.pc} {
    width: calc(var(--grid) * 2);
  }
`;

export const stacks = css`
  padding-left: 0.6em;
  padding-bottom: 0.6em;
  position: relative;
  margin-top: 0.2rem;

  @media ${mq.pc} {
    //
  }
`;

export const stacksItems = css`
  font-size: 1.1rem;
  line-height: 1.15;
  display: flex;
  flex-direction: column;
  gap: 0.2em;

  @media ${mq.pc} {
    font-size: 1.3rem;
  }

  > li {
    backface-visibility: hidden;
  }
`;

export const stacks__hr = css`
  width: 1px;
  height: 100%;
  background-color: currentColor;
  position: absolute;
  top: 0;
  left: 0;
  translate: -50%;
  transform-origin: top left;
  display: block;
  border: 0;

  @media ${mq.pc} {
    //
  }
`;

export const intro__indexNumber = css`
  position: absolute;
  top: 4rem;
  left: var(--grid);
  font-size: 1.1rem;
  overflow: hidden;

  @media ${mq.pc} {
    left: calc(var(--grid) - var(--gap) * 0.5);
    top: 6rem;
    font-size: 1.3rem;
  }
`;

export const eyecatch = css`
  overflow: hidden;
  backface-visibility: hidden;
`;

export const eyecatchImg = css`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 3 / 2;

  @media ${mq.pc} {
    aspect-ratio: auto;
  }
`;

export const screenshots = css`
  width: calc((var(--grid) * 10));
  margin-left: auto;
  margin-right: auto;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-bottom: 5rem;

  @media ${mq.pc} {
    width: calc(var(--grid) * 8);
    max-width: 1280px;
    gap: 14rem;
  }
`;

export const dummy = css`
  height: 101vh;
  height: 101svh;

  @media ${mq.pc} {
    height: 125vh;
    height: 125svh;
  }
`;

export const next = css`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  background-color: var(--color-text);
  z-index: 100;
  opacity: 0;
  perspective: 1000px;

  @media ${mq.pc} {
    padding-top: 15rem;
    padding-bottom: 15rem;
  }
`;

export const next__hgroup = css`
  display: inline-block;
  color: var(--color-bg);
`;
