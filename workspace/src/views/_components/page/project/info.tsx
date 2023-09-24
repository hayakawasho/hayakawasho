import { css } from "@emotion/react";
import {
  selectDatetime,
  selectLaunch,
  selectUrl,
} from "@/_work/model/selector";
import type { WorkMetadata } from "@/_work/model";

export const InfoLabel = ({
  heading,
  label,
}: {
  heading: string;
  label: string;
}) => {
  return (
    <dl css={info}>
      <dt css={info__heading}>
        <span className="inline-block" data-ref="infoText">
          {heading}
        </span>
      </dt>
      <dd css={info__label}>
        <span className="inline-block" data-ref="infoText">
          {label}
        </span>
      </dd>
    </dl>
  );
};

export const InfoDate = ({ post }: { post: WorkMetadata }) => {
  return (
    <dl css={info}>
      <dt css={info__heading}>
        <span className="inline-block" data-ref="infoText">
          (DATE)
        </span>
      </dt>
      <dd className="uppercase" css={info__label}>
        <time
          className="inline-block"
          data-ref="infoText"
          dateTime={selectDatetime(post)}
        >
          {selectLaunch(post)}
        </time>
      </dd>
    </dl>
  );
};

export const InfoUrl = ({ post }: { post: WorkMetadata }) => {
  return (
    <dl css={info}>
      <dt css={info__heading}>
        <span className="inline-block" data-ref="infoText">
          (URL)
        </span>
      </dt>
      <dd css={info__url}>
        <a
          className="inline-block"
          data-ref="infoText"
          href={post.url}
          target="_blank"
        >
          {selectUrl(post)} <span className="text-[90%]">↗</span>
        </a>
      </dd>
    </dl>
  );
};

const info = css`
  font-size: 1.1rem;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`;

const info__heading = css`
  opacity: 0.5;
  backface-visibility: hidden;
  overflow: hidden;
`;

const info__label = css`
  backface-visibility: hidden;
  overflow: hidden;
`;

const info__url = css`
  ${info__label}
  font-size: 110%;
`;
