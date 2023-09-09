import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { selectDatetime, selectYear } from "@/_work/model/selector";
import { Header } from "../_components/header";
import { Body } from "../_components/body";
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
  const { last, first, next, previous } = page;

  const nextPost: WorkMetadata = last.id === post.id ? first : next;
  const prevPost: WorkMetadata = first.id === post.id ? last : previous;

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
            <div css={intro__g} className="">
              <div css={intro__num}>
                <span data-ref="now" className="inline-block">
                  {now}
                </span>
                <span
                  className="relative top-[-1px] inline-block mx-[.5em]"
                  data-ref="dash"
                >
                  —
                </span>
                <span data-ref="max" className="inline-block">
                  {max}
                </span>
              </div>

              <h1 css={intro__heading}>
                <span className="inline-block leading-[1]">{post.title}</span>
              </h1>

              <div css={intro__prevNext}>
                <a href={`../${prevPost.id}/`} css={iconPrev}>
                  <Svg name="icon-arrow_right" />
                </a>
                <a href={`../${nextPost.id}/`} css={iconNext}>
                  <Svg name="icon-arrow_right" />
                </a>
              </div>
              <div css={intro__date}>
                <span>{post.category}, </span>
                <time dateTime={selectDatetime(post)}>{selectYear(post)}</time>
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
                    src={`${i.src}?auto=compress,format`}
                    data-src-sp={`${i.src}?auto=compress,format&w=750`}
                    style={{
                      aspectRatio: aspect + "",
                    }}
                  />
                </li>
              );
            })}
          </ul>

          <aside css={nextKv} data-scroll-item>
            <a css={nextKv__img} data-ref="next" href={`../${nextPost.id}/`}>
              <div
                className={`pointer-events-none opacity-0 h-full`}
                data-ref="nextImage"
                data-src={`${nextPost.eyecatch.src}?auto=compress,format&sat=-100`}
                data-src-sp={`${nextPost.eyecatch.src}?auto=compress,format&w=1200&sat=-100`}
              >
                <h3 className="sr-only">NEXT PROJECT</h3>
              </div>
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
  height: 132vw;
  position: relative;
  overflow: hidden;

  @media (min-width: 640px) {
    height: 100vh;
  }
`;

const intro__heading = css`
  overflow: hidden;
  position: absolute;
  top: 50%;
  z-index: 10;
  text-align: center;
  width: 100%;
  padding: 0 var(--gap);
  font-size: 4rem;
  font-family: var(--font-en);
  font-size: 4rem;
  font-weight: 600;
  letter-spacing: 0;
  margin-top: -1em;

  @media (min-width: 640px) {
    font-size: 9.6rem;
    white-space: nowrap;
    letter-spacing: 0;
  }
`;

const intro__date = css`
  position: absolute;
  left: 50%;
  bottom: 4.5rem;
  font-size: 1.1rem;
  opacity: 0.5;
  transform: translateX(-50%);

  @media (min-width: 640px) {
    transform: translateZ(0);
    left: calc(var(--grid) - var(--gap) * 0.5);
    bottom: 7rem;
    font-size: 1.5rem;
    width: auto;
  }
`;

const intro__prevNext = css`
  position: absolute;
  right: var(--grid);
  bottom: 3rem;
  display: flex;
  gap: var(--gap);

  @media (min-width: 640px) {
    flex-direction: column-reverse;
    gap: 1rem;
    right: calc(var(--grid) - var(--gap) * 0.5);
    bottom: 7rem;
  }
`;

const iconPrev = css`
  fill: #fff;
  display: block;
  width: 1.6rem;
  height: 4.6rem;
  transform: rotateZ(-180deg);
  position: relative;
  z-index: 2;

  @media (min-width: 640px) {
    width: 2rem;
    height: 2.4rem;
  }
`;

const iconNext = css`
  fill: #fff;
  display: block;
  width: 1.6rem;
  height: 4.6rem;
  position: relative;

  @media (min-width: 640px) {
    width: 2rem;
    height: 2.4rem;
  }
`;

const intro__num = css`
  position: absolute;
  top: 4rem;
  right: var(--grid);
  font-size: 1.2rem;
  overflow: hidden;

  @media (min-width: 640px) {
    right: calc(var(--grid) - var(--gap) * 0.5);
    top: 6rem;
    font-size: 1.4rem;
  }
`;

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

const nextKv = css`
  height: 100vh;
  height: 100svh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const nextKv__img = css`
  position: absolute;
  z-index: 1;
  aspect-ratio: 1 / 1;
  width: calc(var(--grid) * 6);
  backface-visibility: hidden;
  background-color: var(--color-bg);

  @media (min-width: 640px) {
    // aspect-ratio: auto;
    width: calc(var(--grid) * 5);
  }
`;
