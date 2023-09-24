import { css } from "@emotion/react";
import type { WorkMetadata } from "@/_work/model";

export const NextProject = ({ post }: { post: WorkMetadata }) => {
  return (
    <div css={nextProject} data-ref="nextProject">
      <a
        css={nextProject__hgroup}
        data-ref="nextHGroup"
        href={`../${post.id}/`}
      >
        <h2 css={nextProject__heading}>
          <span className="inline-block leading-[1]">Next Project</span>
        </h2>
        <h3 className="" css={nextProject__sub}>
          ({post.title})
        </h3>
      </a>
    </div>
  );
};

const nextProject = css`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  background-color: #041f1e;
  z-index: 100;
  opacity: 0;
  perspective: 1000px;

  @media (min-width: 640px) {
    padding-top: 15rem;
    padding-bottom: 15rem;
  }
`;

const nextProject__hgroup = css`
  display: inline-block;
  pointer-events: auto;
  color: #fff;
`;

const nextProject__heading = css`
  font-size: 5.6rem;
  font-family: var(--font-en);
  letter-spacing: 0.04em;
  line-height: 1;

  @media (min-width: 640px) {
    font-size: 9rem;
    margin-top: -0.5em;
  }
`;

const nextProject__sub = css`
  font-size: 1.1rem;
  letter-spacing: 0.04em;
  text-align: left;
  opacity: 0.5;
  margin-top: -0.6em;
  margin-left: 0.3em;

  @media (min-width: 640px) {
    font-size: 1.5rem;
    margin-top: -0.8em;
    margin-left: 0.4em;
  }
`;
