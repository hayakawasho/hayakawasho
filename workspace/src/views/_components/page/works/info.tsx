import { css } from '@emotion/react';
import { selectDatetime, selectLaunch, selectUrl } from '@/_work/model/selector';
import type { WorkMetadata } from '@/_work/model';

export const InfoCategory = ({ post }: { post: WorkMetadata }) => {
  return (
    <dl css={info}>
      <dt css={info__heading}>
        <span className="inline-block uppercase" data-ref="infoText">
          (Category)
        </span>
      </dt>
      <dd css={info__label}>
        <span className="inline-block" data-ref="infoText">
          {post.category}
        </span>
      </dd>
    </dl>
  );
};

export const InfoDate = ({ post }: { post: WorkMetadata }) => {
  return (
    <dl css={info}>
      <dt css={info__heading}>
        <span className="inline-block uppercase" data-ref="infoText">
          (Date)
        </span>
      </dt>
      <dd className="uppercase" css={info__label}>
        <time className="inline-block" data-ref="infoText" dateTime={selectDatetime(post)}>
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
        <span className="inline-block uppercase" data-ref="infoText">
          (Url)
        </span>
      </dt>
      <dd css={info__url}>
        <a className="inline-block" data-ref="infoText" href={post.url} target="_blank">
          {selectUrl(post)} <span className="text-[90%]">↗</span>
        </a>
      </dd>
    </dl>
  );
};

const info = css`
  font-size: 1.1rem;

  @media (min-width: 640px) {
    font-size: 1.3rem;
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
