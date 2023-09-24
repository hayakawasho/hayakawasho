import { css } from "@emotion/react";
import type { WorkMetadata } from "@/_work/model";

export const Screenshots = ({ post }: { post: WorkMetadata }) => {
  return (
    <ul className="" css={screenshots}>
      {post.screenshots.map((i, index) => {
        return (
          <li className="" key={index}>
            <img
              alt=""
              className={`pointer-events-none invisible`}
              data-h={i.height}
              data-ref="screenshot"
              data-src={`${i.src}`}
              data-w={i.width}
              height={i.height}
              width={i.width}
            />
          </li>
        );
      })}
    </ul>
  );
};

const screenshots = css`
  width: calc((var(--grid) * 10));
  margin-left: auto;
  margin-right: auto;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-bottom: 5rem;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 8);
    max-width: 1280px;
    gap: 14rem;
  }
`;
