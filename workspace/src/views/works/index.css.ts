import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const wrap = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const list = css`
  & > li {
    padding: 1.7rem 0;
    padding-left: var(--gap);

    @media ${mq.pc} {
      padding: 3.2rem 0;
      text-align: center;
    }
  }
`;

export const item = css`
  backface-visibility: hidden;
  display: inline-block;
  width: 100%;
  font-size: 4.3rem;
  font-family: var(--font-en);
  letter-spacing: 0.02em;
  display: grid;
  grid-template-columns: 0.8em 1fr;
  gap: 1.6rem;

  @media ${mq.pc} {
    display: inline-block;
    width: auto;
    font-size: 9.8rem;
    padding-left: 0;
  }
`;

export const item__thumb = css`
  width: 0.85em;
  height: 0.85em;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 0.05em;
`;
