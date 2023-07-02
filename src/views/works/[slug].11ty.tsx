import { css } from "@emotion/react";
import type { FC, ReactNode } from "react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Header } from "../_components/header";
import { Content } from "../_components/page-content";
import { PageWithHeader } from "../_components/page-with-header";
import { ResponsiveImage } from "../_components/responsive-image";
import {
  selectDatetime,
  selectLaunch,
  selectUrl,
} from "@/_work/model/selector";
import type { WorkMetadata } from "@/_work/model";

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
      <dt css={infoHeading} className="font-montserrat mb-[0.5em]">
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
            <h1 css={heading} className="font-montserrat">
              {post.title}
            </h1>
            <div css={head__info}>
              <Info
                className="mb-[2rem]"
                heading="DATE"
                text={
                  <time dateTime={selectDatetime(post)}>
                    {selectLaunch(post)}
                  </time>
                }
              ></Info>
              {post.url && (
                <Info
                  heading="URL"
                  text={
                    <a target="_blank" href={post.url}>
                      {selectUrl(post)}
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

const head = css`
  height: calc(100vh - (100vw * 0.56 / 2));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;

  @media (min-width: 640px) {
    height: 80vh;
  }
`;

const head__info = css`
  position: absolute;
  bottom: 4rem;
  left: var(--grid);
`;

const infoHeading = css`
  font-size: 1.2rem;
  line-height: 1.1;
  letter-spacing: 0.06em;
  opacity: 0.5;
`;

const infoText = css`
  font-size: 1.2rem;
  line-height: 1.1;
  letter-spacing: 0.12em;
`;

const heading = css`
  font-size: 7rem;
  letter-spacing: -0.025em;
  font-weight: 100;
  line-height: 1.1;
  opacity: 0.3;
  white-space: nowrap;
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
`;
