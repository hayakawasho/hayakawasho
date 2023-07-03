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
      <dt className="mb-[0.6em]" css={infoHeading}>
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
    <PageWithHeader header={<Header />}>
      <Content>
        <main data-component="project">
          <div css={head} data-scroll-item>
            <div css={head__hgroup}>
              <h1 className="" css={heading}>
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
          <div className="mb-[8rem] sm:mb-[16rem]" data-scroll-item>
            <ResponsiveImage
              alt=""
              pcH={post.eyecatch.height}
              pcSrc={`${post.eyecatch.src}?auto=compress,format`}
              pcW={post.eyecatch.width}
              spH={post.eyecatch.height}
              spSrc={`${post.eyecatch.src}?auto=compress,format&fit=crop&w=750`}
              spW={post.eyecatch.width}
            />
          </div>
          <ul css={screenshots} data-scroll-item>
            {post.screenshots.map((i, index) => {
              return (
                <li className="mb-[2rem] sm:mb-[5rem]" key={index}>
                  <ResponsiveImage
                    alt=""
                    pcH={i.height}
                    pcSrc={`${i.src}?auto=compress,format`}
                    pcW={i.width}
                    spH={i.height}
                    spSrc={`${i.src}?auto=compress,format&fit=crop&w=750`}
                    spW={i.width}
                  />
                </li>
              );
            })}
          </ul>
          <aside css={next} data-scroll-item>
            <a href={`../${nextPost.id}/`} css={next__link}>
              <h2 css={next__heading}>NEXT PROJECT</h2>
              <p className="mt-[.6em]" css={next__sub}>
                {nextPost.title}
              </p>
            </a>
            <figure css={next__img}>
              <img
                alt=""
                decoding="async"
                height={nextPost.eyecatch.height}
                src={`${nextPost.eyecatch.src}?auto=compress,format&sat=-100`}
                width={nextPost.eyecatch.width}
              />
            </figure>
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
    height: 80vh;
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
  font-size: 4.6rem;
  letter-spacing: -0.24em;
  line-height: 1.1;
  opacity: 0.5;
  margin-left: -0.3em;
  margin-top: -1em;
  white-space: nowrap;

  @media (min-width: 640px) {
    font-size: 8rem;
  }
`;

const head__info = css`
  position: absolute;
  bottom: 5rem;
  left: var(--grid);

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
  font-size: 1.1rem;
  line-height: 1.1;
  letter-spacing: 0.06em;
  opacity: 0.5;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`;

const infoText = css`
  font-size: 1.2rem;
  line-height: 1.1;
  letter-spacing: 0.06em;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const screenshots = css`
  width: calc((var(--grid) * 10));
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 8);
  }
`;

const next = css`
  height: 100vh;
  height: 100svh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const next__link = css`
  position: relative;
  z-index: 2;
  text-align: center;
`;

const next__img = css`
  position: absolute;
  z-index: 1;
  aspect-ratio: 1 / 1;
  width: calc(var(--grid) * 6);
  opacity: 0.4;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const next__heading = css`
  font-family: var(--font-en);
  font-size: 2.2rem;
  letter-spacing: -0.24em;
  font-weight: bold;
  line-height: 1.1;

  @media (min-width: 640px) {
    font-size: 3rem;
    margin-bottom: -0.1em;
    margin-left: -0.3em;
  }
`;

const next__sub = css`
  font-size: 1.2rem;
  line-height: 1.1;
  font-weight: bold;

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }
`;
