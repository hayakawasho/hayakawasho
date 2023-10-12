import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const wrap = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const list = css`
  & > li {
    padding-top: 1.6rem;
    padding-left: var(--grid);

    @media ${mq.pc} {
      padding-top: 4.2rem;
      padding-left: 0;
      text-align: center;
    }
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

  @media ${mq.pc} {
    width: auto;
    font-size: 9.8rem;
    padding-left: 0;
  }
`;
