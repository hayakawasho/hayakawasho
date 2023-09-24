import { css } from "@emotion/react";
import type { WorkMetadata } from "@/_work/model";

export const Stacks = ({ post }: { post: WorkMetadata }) => {
  return (
    <ul css={stacksItems}>
      {post.stacks.map((stack, i) => (
        <li className="overflow-hidden" key={i}>
          <span className="inline-block" data-ref="stack">
            {stack}
          </span>
        </li>
      ))}
    </ul>
  );
};

const stacksItems = css`
  font-size: 1.1rem;
  line-height: 1.15;
  display: flex;
  flex-direction: column;
  gap: 0.2em;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }

  > li {
    backface-visibility: hidden;
  }
`;
