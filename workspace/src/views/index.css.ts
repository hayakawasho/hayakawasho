import { css } from '@emotion/react';
import { mq } from '@/_foundation/mq';

export const screen = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const toProjects = css`
  position: fixed;
  left: 50%;
  bottom: 2.8rem;
  z-index: 100;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  padding: 1.2rem 1.5rem;
  color: #fff;
  mix-blend-mode: difference;
  transform: translateX(-50%) translateZ(0);
  display: inline-block;
  overflow: hidden;

  @media ${mq.pc} {
    font-size: 1.3rem;
    bottom: 6rem;
  }
`;

export const projects = css`
  position: absolute;
  top: 0;
  width: 100%;
`;

export const project = css`
  position: relative;
  padding-top: calc(2 / 3 * 100%);
  padding-top: 62.5%;

  @media ${mq.pc} {
    padding-top: 62.5%;
  }
`;

export const project__eyecatch = css`
  position: absolute;
  inset: 2.5rem 3rem;
  display: block;

  @media ${mq.pc} {
    inset: 0.3rem;
  }
`;
