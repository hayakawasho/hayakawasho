import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import {
  selectDatetime,
  selectLaunch,
  selectUrl,
  selectInfo,
} from "@/_work/model/selector";
import { Header } from "../_components/header";
import { Body } from "../_components/body";
import { PageWithHeader } from "../_components/page-with-header";
import { ResponsiveImage } from "../_components/responsive-image";
import { Seo } from "../_components/seo";
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

  const page = props.pagination.page;
  const nextPost: WorkMetadata =
    page.last.id === post.id ? page.first : page.next;

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
              <div css={intro__heading}>
                <h1 css={heading}>
                  <div className="inline-block leading-[1]">{post.title}</div>
                </h1>
              </div>
            </div>
          </div>

          <div
            className="mb-[4rem] sm:mb-[8rem]"
            css={eyecatch}
            data-ref="eyecatch"
            data-scroll-item
          >
            <ResponsiveImage
              alt=""
              className={``}
              pcH={post.eyecatch.height}
              pcSrc={`${post.eyecatch.src}?auto=compress,format`}
              pcW={post.eyecatch.width}
              spH={post.eyecatch.height}
              spSrc={`${post.eyecatch.src}?auto=compress,format&w=1200`}
              spW={post.eyecatch.width}
            />
          </div>

          <div data-scroll-item className="mb-[2rem]" css={category}>
            <p className="pb-[1.8rem]">
              <span className="">{post.kind}</span>
            </p>
          </div>

          <div css={intro__info} data-scroll-item className="mb-[8rem]">
            <div css={infoText} className="">
              <time dateTime={selectDatetime(post)}>
                <span className="">Year — {selectLaunch(post)}</span>
              </time>
            </div>
            <div css={infoText} className="sm:text-right">
              {selectInfo(post)}
            </div>
            {post.url && (
              <div css={infoText} className="sr-only">
                <a href={post.url} target="_blank">
                  {selectUrl(post)}
                  <span className="ml-[.5em]">↗</span>
                </a>
              </div>
            )}
          </div>

          <ul className="" css={screenshots} data-scroll-item>
            {post.screenshots.map((i, index) => {
              const aspect = i.width / i.height;
              return (
                <li className="mb-[2rem] sm:mb-[6rem]" key={index}>
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
          <aside css={next} data-scroll-item>
            <a css={next__img} data-ref="next" href={`../${nextPost.id}/`}>
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
  height: 80vh;
  position: relative;
  overflow: hidden;
`;

const intro__heading = css`
  overflow: hidden;
  position: absolute;
  // bottom: 12rem;
  top: 50%;
  z-index: 10;
  text-align: center;
  width: 100%;
  padding: 0 var(--gap);
`;

const heading = css`
  font-family: var(--font-en);
  font-size: 4rem;
  letter-spacing: 0.02em;
  font-weight: 700;

  @media (min-width: 640px) {
    font-size: 4.6rem;
    font-weight: 500;
  }
`;

const intro__num = css`
  position: absolute;
  top: 4rem;
  right: var(--grid);
  font-size: 1.2rem;
  overflow: hidden;

  @media (min-width: 640px) {
    right: var(--gap);
    font-size: 1.4rem;
  }
`;

const category = css`
  padding-left: var(--grid);
  padding-right: var(--grid);
  font-size: 1.4rem;
  letter-spacing: 0.02em;
  overflow: hidden;

  > p {
    border-bottom: 1px solid;
  }

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`;

const intro__info = css`
  padding: 0 var(--grid);
  display: flex;
  justify-content: space-between;
`;

const infoHeading = css`
  font-size: 1rem;
  line-height: 1.1;
  // letter-spacing: 0.06em;
  opacity: 0.5;
  font-weight: 300;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: 1.1rem;
  }
`;

const infoText = css`
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  font-weight: 300;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`;

const eyecatch = css`
  overflow: hidden;
  backface-visibility: hidden;
`;

const screenshots = css`
  width: calc((var(--grid) * 10));
  margin-left: auto;
  margin-right: auto;
  backface-visibility: hidden;

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
  overflow: hidden;
`;

const next__img = css`
  position: absolute;
  z-index: 1;
  aspect-ratio: 1 / 1;
  width: calc(var(--grid) * 6);
  backface-visibility: hidden;
  background-color: var(--color-bg);

  @media (min-width: 640px) {
    aspect-ratio: auto;
    width: calc(var(--grid) * 5);
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

// コンテンツの優先度はそのまま
// レイアウト・ラベリングの制度はまだ

// 火曜アイスタ定例
// 水曜クライアント定例
// 外部サービス
// リストファインダー
// タグ
