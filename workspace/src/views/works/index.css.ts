import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const wrap = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const li = css`
  text-align: center;
  padding-top: 2rem;

  @media ${mq.pc} {
    padding-top: 3.6rem;
  }
`;

export const item = css`
  backface-visibility: hidden;
  display: inline-block;
  width: 100%;
  font-size: 4.2rem;
  font-family: var(--font-en);
  letter-spacing: 0.02em;
  line-height: 1.1;
  padding-left: var(--gap);

  @media ${mq.pc} {
    width: auto;
    font-size: 12rem;
    padding-left: 0;
  }
`;
