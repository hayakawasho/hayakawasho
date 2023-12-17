import { css } from '@emotion/react';
import { mq } from '@/_foundation/const';

export const back = css`
  position: fixed;
  top: 1.2rem;
  left: calc(var(--grid) - 2rem);
  z-index: 9;
  font-size: 1.1rem;
  overflow: hidden;
  letter-spacing: 0.04em;
  line-height: 1;
  padding: 2rem;
  backface-visibility: hidden;

  @media ${mq.pc} {
    left: calc(var(--grid) - var(--gap) * 0.5 - 2rem);
    top: 5rem;
    font-size: 1.3rem;
  }
`;

export const sub = css`
  font-size: 4.3rem;
  font-family: var(--font-en);
  text-transform: uppercase;
  line-height: 1;
  text-align: center;
  letter-spacing: 0.02em;
  backface-visibility: hidden;

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
  text-align: center;
  backface-visibility: hidden;

  @media ${mq.pc} {
    font-size: 9.4rem;
  }

  & ._l {
    overflow: hidden;
    line-height: 1.25;

    & + ._l {
      margin-top: -0.2em;
    }
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
    margin-top: -15rem;
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
    bottom: 7rem;
    left: calc(var(--grid) * 3);
    padding: 0;
  }
`;

export const intro__indexNumber = css`
  position: absolute;
  top: 3.2rem;
  right: var(--grid);
  font-size: 1.1rem;
  overflow: hidden;

  @media ${mq.pc} {
    right: calc(var(--grid) - var(--gap) * 0.5);
    top: 7rem;
    font-size: 1.3rem;
  }
`;

export const info = css`
  width: calc(var(--grid) * 5);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media ${mq.pc} {
    width: calc(var(--grid) * 2);
    gap: 1.4rem;
  }
`;

export const stacks = css`
  padding-left: 0.6em;
  padding-bottom: 0.5em;
  position: relative;
  margin-top: 0.2rem;

  @media ${mq.pc} {
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
    gap: 0.3rem;
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

export const eyecatch = css`
  overflow: hidden;
  backface-visibility: hidden;
  position: relative;

  &:before {
    content: '';
    // padding-top: calc(2 / 3 * 100%);
    padding-top: calc(9 / 16 * 100%);
    display: block;
  }
`;

export const eyecatchImg = css`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    width: calc(var(--grid) * 9);
    max-width: 1200px;
    gap: 14rem;
  }
`;

export const dummy = css`
  position: relative;
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
