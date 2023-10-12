import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const wrap = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const list = css`
  & > li {
    padding: 1.5rem 0;
    padding-left: calc(var(--gap) * 1);

    @media ${mq.pc} {
      padding: 3.4rem 0;
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
  line-height: 1.1;
  display: flex;
  gap: 1.5rem;

  @media ${mq.pc} {
    display: inline-block;
    width: auto;
    font-size: 9.8rem;
    padding-left: 0;
  }

  > img {
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;
