import { css } from "@emotion/react";
import { mq } from "@/_foundation/mq";

export const screen = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const list = css`
  & > li {
    padding: 1.3rem 0;
    padding-left: var(--gap);

    @media ${mq.pc} {
      padding: 1.6rem 0;
      text-align: center;
      will-change: transform;
    }
  }
`;

export const item__title = css`
  display: inline-block;
  line-height: 1.15;
  overflow: hidden;
  transform: translateZ(0);

  @media (hover: hover) {
    @media ${mq.pc} {
      opacity: 0.6;
      transition: opacity 0.65s cubic-bezier(0.32, 0.94, 0.6, 1);
    }

    &:hover {
      opacity: 1;
    }
  }
`;

export const item = css`
  display: grid;
  grid-template-columns: 0.8em 1fr;
  gap: 1.5rem;
  width: 100%;
  font-size: 4.3rem;
  font-family: var(--font-en);
  letter-spacing: 0.02em;

  @media ${mq.pc} {
    display: inline-block;
    width: auto;
    font-size: 9.8rem;
    padding-left: 0;
    line-height: 1;
  }

  & ._l {
    overflow: hidden;

    & + ._l {
      margin-top: -0.15em;
    }
  }
`;

export const item__thumb = css`
  width: 0.85em;
  height: 0.85em;
  overflow: hidden;
  margin-top: 0.1em;
`;
