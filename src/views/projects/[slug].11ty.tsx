import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import {
  selectDatetime,
  selectLaunch,
  selectUrl,
} from "@/_work/model/selector";
import { Header } from "../_components/header";
import { Content } from "../_components/page-content";
import { PageWithHeader } from "../_components/page-with-header";
import { ResponsiveImage } from "../_components/responsive-image";
import { Seo } from "../_components/seo";
import type { WorkMetadata } from "@/_work/model";
import type { FC, ReactNode } from "react";

export const data = {
  pagination: {
    addAllPagesToCollections: true,
    alias: "post",
    data: "cms.projects",
    size: 1,
  },
  permalink: (context: any) => `projects/${context.post.id}/index.html`,
};

const Info: FC<{
  heading: string;
  text: ReactNode;
  className?: string;
}> = ({ className = "", ...props }) => {
  return (
    <dl className={className}>
      <dt className="mb-[1em]" css={infoHeading}>
        {props.heading}
      </dt>
      <dd css={infoText}>{props.text}</dd>
    </dl>
  );
};

export const render = (props: any) => {
  const post: WorkMetadata = props.post;
  const page = props.pagination.page;
  const nextPost: WorkMetadata =
    page.last.id === post.id ? { ...page.first } : { ...page.next };

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader
      header={<Header />}
      seo={<Seo permalink={`/projects/${post.id}/`} title={post.title} />}
    >
      <Content>
        <main data-component="project">
          <div css={head} data-scroll-item>
            <div css={head__hgroup}>
              <h1 className="" css={heading} data-h1={post.title} data-ref="h1">
                {post.title}
              </h1>
            </div>
            <div css={head__info}>
              <Info
                heading="DATE"
                text={
                  <time dateTime={selectDatetime(post)}>
                    {selectLaunch(post)}
                  </time>
                }
              ></Info>
              {post.url && (
                <Info
                  className="mt-[2.4rem] sm:mt-0"
                  heading="URL"
                  text={
                    <a href={post.url} target="_blank">
                      {selectUrl(post)}
                      <span className="ml-[.5em]">↗</span>
                    </a>
                  }
                ></Info>
              )}
            </div>
          </div>
          <div
            className="mb-[8rem] sm:mb-[20rem]"
            css={eyecatch}
            data-ref="eyecatch"
            data-scroll-item
          >
            <ResponsiveImage
              alt=""
              pcH={post.eyecatch.height}
              pcSrc={`${post.eyecatch.src}?auto=compress,format`}
              pcW={post.eyecatch.width}
              spH={post.eyecatch.height}
              spSrc={`${post.eyecatch.src}?auto=compress,format&w=750`}
              spW={post.eyecatch.width}
            />
          </div>
          <ul className="" css={screenshots} data-scroll-item>
            {post.screenshots.map((i, index) => {
              return (
                <li className="mb-[2rem] sm:mb-[6rem]" key={index}>
                  <img
                    alt=""
                    data-ref="screenshot"
                    data-src={`${i.src}?auto=compress,format`}
                    data-src-sp={`${i.src}?auto=compress,format&w=750`}
                    decoding="async"
                    height={i.height}
                    src={`${i.src}?auto=compress,format`}
                    width={i.width}
                  />
                </li>
              );
            })}
          </ul>
          <aside css={next} data-scroll-item>
            <div css={next__img}>
              <a className="inset-0 absolute" href={`../${nextPost.id}/`}>
                <span className="sr-only">NEXT PROJECT</span>
              </a>
              <img
                alt={nextPost.title}
                data-src={`${nextPost.eyecatch.src}?auto=compress,format&w=750`}
                data-src-sp={`${nextPost.eyecatch.src}?auto=compress,format&w=750`}
                decoding="async"
                height={nextPost.eyecatch.height}
                src={`${nextPost.eyecatch.src}?auto=compress,format&sat=-100`}
                width={nextPost.eyecatch.width}
              />
            </div>
          </aside>
        </main>
      </Content>
    </PageWithHeader>
  )}`;
};

const head = css`
  height: calc(100vh - (100vw * 0.56 / 2));
  height: calc(100svh - (100vw * 0.56 / 2));
  position: relative;
  overflow: hidden;

  @media (min-width: 640px) {
    height: 90vh;
    height: 90svh;
  }
`;

const head__hgroup = css`
  position: absolute;
  top: 50vh;
  top: 50svh;
  width: 100%;
`;

const heading = css`
  font-family: var(--font-en);
  font-size: 5.6rem;
  letter-spacing: 0.16em;
  line-height: 1.1;
  margin-top: -1em;
  white-space: nowrap;
  font-weight: 600;

  @media (min-width: 640px) {
    font-size: 9rem;
  }
`;

const head__info = css`
  position: absolute;
  bottom: 5rem;
  left: var(--grid);
  backface-visibility: hidden;

  @media (min-width: 640px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    bottom: 8rem;
    left: 50%;
    transform: translateX(-50%);
    gap: calc(var(--gap) * 2);
  }
`;

const infoHeading = css`
  font-size: 1rem;
  line-height: 1.1;
  letter-spacing: 0.06em;
  opacity: 0.5;
  font-weight: 300;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`;

const infoText = css`
  font-size: 1.2rem;
  line-height: 1.1;
  letter-spacing: 0.06em;
  font-weight: 300;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const eyecatch = css`
  overflow: hidden;
  backface-visibility: hidden;

  & > img {
    @media (min-width: 640px) {
      margin: -6rem 0;
    }
  }
`;

const screenshots = css`
  width: calc((var(--grid) * 10));
  margin-left: auto;
  margin-right: auto;
  backface-visibility: hidden;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 9);
  }
`;

const next = css`
  height: 100vh;
  height: 100svh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const next__img = css`
  position: absolute;
  z-index: 1;
  aspect-ratio: 1 / 1;
  width: calc(var(--grid) * 6);
  opacity: 0.8;
  backface-visibility: hidden;

  @media (min-width: 640px) {
    aspect-ratio: auto;
    width: calc(var(--grid) * 5);
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// const next__link = css`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   z-index: 2;
//   mix-blend-mode: difference;
// `;

// const next__heading = css`
//   font-family: var(--font-en);
//   font-size: 2.1rem;
//   font-weight: bold;
//
//   @media (min-width: 640px) {
//     font-size: 3rem;
//     margin-bottom: -0.1em;
//     margin-left: -0.3em;
//   }
// `;

// const next__sub = css`
//   font-size: 1.2rem;
//   line-height: 1.1;
//   font-weight: bold;
//
//   @media (min-width: 640px) {
//     font-size: 1.3rem;
//   }
// `;
