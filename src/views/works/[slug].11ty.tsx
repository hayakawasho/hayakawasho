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
    data: "cms.index",
    size: 1,
  },
  permalink: (context: any) => `works/${context.post.id}/index.html`,
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
        <main data-component="works">
          <div css={head} data-scroll-item>
            <h1 className="" css={heading}>
              {post.title}
            </h1>
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
                  className="mt-[2.4rem]"
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
          <div className="mb-[8rem]" data-scroll-item>
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
                <li className="mb-[2rem] sm:mb-[4rem]" key={index}>
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
          <div css={next} data-scroll-item></div>
        </main>
      </Content>
    </PageWithHeader>
  )}`;
};

const infoHeading = css`
  font-size: 1.1rem;
  line-height: 1.1;
  letter-spacing: 0.06em;
  opacity: 0.5;
`;

const infoText = css`
  font-size: 1.2rem;
  line-height: 1.1;
  letter-spacing: 0.06em;
`;

const head = css`
  height: calc(100vh - (100vw * 0.56 / 2));
  height: calc(100svh - (100vw * 0.56 / 2));
  position: relative;
  overflow: hidden;

  @media (min-width: 640px) {
    height: 80vh;
  }
`;

const head__info = css`
  position: absolute;
  bottom: 5rem;
  left: var(--grid);
`;

const heading = css`
  font-family: var(--font-en);
  font-size: 3.8rem;
  letter-spacing: -0.4em;
  line-height: 1.1;
  opacity: 0.5;
  margin-left: -0.2em;
  position: absolute;
  left: -0.1em;
  top: 50%;
  margin-top: -0.5em;
`;

const screenshots = css`
  width: calc(100% - (var(--grid) * 2));
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 6);
  }
`;

const next = css`
  height: 100vh;
  height: 100svh;
`;
