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
