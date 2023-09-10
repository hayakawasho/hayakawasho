import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import {
  selectDatetime,
  selectLaunch,
  selectUrl,
} from "@/_work/model/selector";
import { Body } from "../_components/body";
import { Header } from "../_components/header";
import { PageWithHeader } from "../_components/page-with-header";
import { ResponsiveImage } from "../_components/responsive-image";
import { Seo } from "../_components/seo";
import { Svg } from "../_components/svg";
import type { WorkMetadata } from "@/_work/model";

export const data = {
  pagination: {
    addAllPagesToCollections: true,
    alias: "post",
    data: "cms.projects",
    size: 1,
  },
  permalink: (context: any) => `projects/${context.post.id}/index.html`,
};

export const render = (props: any) => {
  const post: WorkMetadata = props.post;

  const { page } = props.pagination;
  const { last, first, next } = page;

  const nextPost: WorkMetadata = last.id === post.id ? first : next;

  const max = props.pagination.links.length;
  const now = props.pagination.pageNumber + 1;

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader
      header={<Header />}
      seo={<Seo permalink={`/projects/${post.id}/`} title={post.title} />}
    >
      <Body namespace="project">
        <main data-component="project">
          <div css={intro} data-scroll-item>
            <div className="" css={intro__g}>
              <div css={intro__indexNumber}>
                <span className="inline-block" data-ref="now">
                  {now}
                </span>
                <span
                  className="relative top-[-1px] inline-block mx-[.4em]"
                  data-ref="dash"
                >
                  —
                </span>
                <span className="inline-block" data-ref="max">
                  {max}
                </span>
              </div>

              <h1 css={intro__heading}>
                <span className="inline-block leading-[1]">{post.title}</span>
              </h1>

              <div css={intro__infoWrap}>
                <div css={intro__info}>
                  <dl css={info}>
                    <dt>(CATEGORY)</dt>
                    <dd className="uppercase">{post.category}</dd>
                  </dl>
                  <dl css={info}>
                    <dt>(DATE)</dt>
                    <dd className="uppercase">
                      <time dateTime={selectDatetime(post)}>
                        {selectLaunch(post)}
                      </time>
                    </dd>
                  </dl>
                  {post.url && (
                    <dl css={info}>
                      <dt>(URL)</dt>
                      <dd className="_url">
                        <a href={post.url} target="_blank">
                          {selectUrl(post)}{" "}
                          <span className="text-[80%]">↗</span>
                        </a>
                      </dd>
                    </dl>
                  )}
                </div>
                {post.stacks.length > 0 && (
                  <ul css={intro__tags}>
                    {post.stacks.map((stack, i) => (
                      <li key={i}>{stack}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div
            className="mb-[10rem] sm:mb-[20rem]"
            css={eyecatch}
            data-ref="eyecatch"
            data-scroll-item
          >
            <ResponsiveImage
              alt=""
              className={`w-full`}
              pcH={post.eyecatch.height}
              pcSrc={`${post.eyecatch.src}?auto=compress,format`}
              pcW={post.eyecatch.width}
              spH={post.eyecatch.height}
              spSrc={`${post.eyecatch.src}?auto=compress,format&w=1200`}
              spW={post.eyecatch.width}
            />
          </div>

          <ul className="" css={screenshots} data-scroll-item>
            {post.screenshots.map((i, index) => {
              const aspect = i.width / i.height;
              return (
                <li className="mb-[6rem] sm:mb-[14rem]" key={index}>
                  <img
                    className={`pointer-events-none`}
                    data-ref="screenshot"
                    data-src-sp={`${i.src}?auto=compress,format&w=750`}
                    src={`${i.src}?auto=compress,format`}
                    style={{
                      aspectRatio: aspect + "",
                    }}
                  />
                </li>
              );
            })}
          </ul>

          <aside css={nextKv} data-scroll-item>
            <a css={nextKv__link} data-ref="next" href={`../${nextPost.id}/`}>
              <div css={nextSubTitle}>Next Project</div>
              <div
                className={`pointer-events-none opacity-0 h-full`}
                data-ref="nextImage"
                data-src={`${nextPost.eyecatch.src}?auto=compress,format&sat=-100`}
                data-src-sp={`${nextPost.eyecatch.src}?auto=compress,format&w=1200&sat=-100`}
              ></div>
            </a>
          </aside>
        </main>
      </Body>
    </PageWithHeader>
  )}`;
};

const intro = css`
  position: relative;
`;

const intro__g = css`
  // height: 132vw;
  min-height: 132vw;
  position: relative;
  overflow: hidden;

  @media (min-width: 640px) {
    height: 100vh;
  }
`;

const intro__heading = css`
  width: 100%;
  font-size: 6.4rem;
  font-weight: 300;
  font-family: var(--font-en);
  letter-spacing: 0.1em;
  white-space: nowrap;
  padding-top: 8rem;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: 9.6rem;
    white-space: nowrap;
  }
`;

const intro__infoWrap = css`
  padding: 0 var(--grid);
  padding-top: 10.6667vw;
  padding-bottom: 6.6667vw;
  display: flex;
  align-items: flex-start;
`;

const intro__info = css`
  width: calc(var(--grid) * 5);
  display: flex;
  flex-direction: column;
  gap: 3.2vw;
`;

const info = css`
  font-size: 1.1rem;

  & > dt {
    opacity: 0.5;
  }

  ._url {
    font-size: 110%;
  }
`;

const intro__tags = css`
  font-size: 1.1rem;
  line-height: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  margin-top: 0.2em;
  padding-left: 0.5em;
  padding-bottom: 0.6em;
  border-left: 1px solid;
`;

const intro__indexNumber = css`
  position: absolute;
  top: 3rem;
  right: var(--grid);
  font-size: 1.1rem;
  overflow: hidden;

  @media (min-width: 640px) {
    right: calc(var(--grid) - var(--gap) * 0.5);
    top: 6rem;
    font-size: 1.4rem;
  }
`;

//----------------------------------------------------------------

const eyecatch = css`
  overflow: hidden;
  backface-visibility: hidden;
`;

const screenshots = css`
  width: calc((var(--grid) * 9));
  margin-left: auto;
  margin-right: auto;
  backface-visibility: hidden;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 8);
  }
`;

//----------------------------------------------------------------

const nextKv = css`
  // height: 100vh;
  // height: 100svh;
  // position: relative;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // overflow: hidden;
  padding: 0 var(--gap);
`;

const nextKv__link = css`
  display: block;
  position: relative;
  padding-top: 2rem;
  padding-bottom: 6rem;
  margin-top: 6rem;
  border-top: 1px solid;
`;

const nextSubTitle = css`
  font-size: 1.1rem;
  opacity: 0.5;

  @media (min-width: 640px) {
    font-size: 1.5rem;
  }
`;

const nextTitle = css`
  font-size: 4rem;
  font-family: var(--font-en);
  letter-spacing: 0.12em;

  @media (min-width: 640px) {
    font-size: 9.6rem;
    white-space: nowrap;
  }
`;
