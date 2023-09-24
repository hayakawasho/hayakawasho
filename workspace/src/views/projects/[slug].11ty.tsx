import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Body } from "../_components/body";
import { Header } from "../_components/header";
import { IndexNumber } from "../_components/page/project/index-number";
import { InfoLabel, InfoUrl, InfoDate } from "../_components/page/project/info";
import { NextProject } from "../_components/page/project/next";
import { Screenshots } from "../_components/page/project/screenshots";
import { Stacks } from "../_components/page/project/stacks";
import { PageWithHeader } from "../_components/page-with-header";
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
          <div className="mb-[10rem] sm:mb-[20rem]" data-scroll-item>
            <div css={intro}>
              <div css={intro__g}>
                <div css={intro__indexNumber}>
                  <IndexNumber max={max} now={now} />
                </div>
                <h1 css={intro__heading} data-ref="h1">
                  <span className="inline-block leading-[1]">{post.title}</span>
                </h1>
                <div css={intro__infoWrap}>
                  <div css={intro__info}>
                    <InfoLabel heading="(CATEGORY)" label={post.category} />
                    <InfoDate post={post} />
                    {post.url && <InfoUrl post={post} />}
                  </div>
                  {post.stacks.length > 0 && (
                    <div css={intro__stacks}>
                      <Stacks post={post} />
                      <hr css={intro__stacks__hr} data-ref="infoLine" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="u-sp" css={intro__eyecatch} data-ref="eyecatch">
              <img
                alt=""
                className="pointer-events-none"
                css={eyecatchImg}
                height={post.eyecatch.height}
                src={`${post.eyecatch.src}?auto=compress,format&w=1200`}
                width={post.eyecatch.width}
              />
            </div>
          </div>

          <div data-scroll-item>
            <Screenshots post={post} />
          </div>

          <aside data-ref="next">
            <div css={dummy} data-ref="end" data-scroll-item></div>
            <NextProject post={nextPost} />
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
  min-height: 125vw;
  position: relative;
  overflow: hidden;

  @media (min-width: 640px) {
    min-height: auto;
    height: 100vh;
    height: 100svh;
  }
`;

const intro__heading = css`
  width: 100%;
  font-size: 5.6rem;
  font-weight: 300;
  font-family: var(--font-en);
  letter-spacing: 0.08em;
  white-space: nowrap;
  padding-top: 10rem;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: 9rem;
    white-space: nowrap;
    position: absolute;
    top: 50%;
    padding: 0;
    margin-top: -1.5em;
    text-align: center;
  }
`;

const intro__infoWrap = css`
  padding: 0 var(--grid);
  padding-top: 4.8rem;
  padding-bottom: 6.6667vw;
  display: flex;
  align-items: flex-start;

  @media (min-width: 640px) {
    position: absolute;
    bottom: 0;
    left: calc(var(--grid) * 3);
    padding: 0 0 8rem 0;
  }
`;

const intro__info = css`
  width: calc(var(--grid) * 5);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 2);
  }
`;

const intro__stacks = css`
  padding-left: 0.6em;
  padding-bottom: 0.6em;
  position: relative;
  margin-top: 0.2rem;

  @media (min-width: 640px) {
    //
  }
`;

const intro__stacks__hr = css`
  width: 1px;
  height: 100%;
  background-color: currentColor;
  position: absolute;
  top: 0;
  left: 0;
  translate: -50%;
  transform-origin: top left;
  display: block;
  border: 0;

  @media (min-width: 640px) {
    //
  }
`;

const intro__indexNumber = css`
  position: absolute;
  top: 4rem;
  right: var(--grid);
  font-size: 1.1rem;
  overflow: hidden;

  @media (min-width: 640px) {
    right: calc(var(--grid) - var(--gap) * 0.5);
    top: 8rem;
    font-size: 1.4rem;
  }
`;

const intro__eyecatch = css`
  overflow: hidden;
  backface-visibility: hidden;
`;

const eyecatchImg = css`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 3 / 2;

  @media (min-width: 640px) {
    aspect-ratio: auto;
  }
`;

const dummy = css`
  height: 101vh;
  height: 101svh;

  @media (min-width: 640px) {
    height: 125vh;
    height: 125svh;
  }
`;
