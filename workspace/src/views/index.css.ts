import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const wrap = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const projects = css`
  position: absolute;
  top: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: calc(100% + var(--grid) * 11);
  left: calc(var(--grid) * -5.5);

  @media ${mq.pc} {
    width: calc(100% + var(--grid) * 8);
    left: calc(var(--grid) * -4);
  }
`;

export const project = css`
  position: relative;
  padding-top: 100%;

  @media ${mq.pc} {
    padding-top: 62.5%;
  }
`;

export const project__eyecatch = css`
  position: absolute;
  inset: 1.5rem;
  display: block;

  @media ${mq.pc} {
    inset: 6rem;
  }
`;
