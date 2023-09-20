import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Body } from "./_components/body";
import { Header } from "./_components/header";
import { PageWithHeader } from "./_components/page-with-header";
import { Seo } from "./_components/seo";
import type { WorkMetadata } from "@/_work/model";

const PER_PAGE = 8;

export const data = {
  pagination: {
    addAllPagesToCollections: false,
    alias: "posts",
    data: "cms.index",
    size: PER_PAGE,
  },
};

export const render = (props: any) => {
  const posts = props.posts as WorkMetadata[];

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />} seo={<Seo permalink="" title="" />}>
      <Body namespace="home">
        <main className="h-full" data-component="home">
          <div data-scroll-item></div>
          <h1 className="sr-only">SHO HAYAKAWA PORTFOLIO</h1>
          <div css={wrap}>
            <div className="" css={projects} data-ref="grid">
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <a css={project__eyecatch} href={`./projects/${post.id}/`}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1}
                        data-ref="plane"
                        data-src={`${post.eyecatch.src}?auto=compress,format`}
                        data-src-sp={`${post.eyecatch.src}?auto=compress,format&w=750`}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src={`${post.eyecatch.src}?auto=compress,format&sat=-100`}
                        width={post.eyecatch.width}
                      />
                    </a>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <a css={project__eyecatch} href={`./projects/${post.id}/`}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE}
                        data-ref="plane"
                        data-src={`${post.eyecatch.src}?auto=compress,format`}
                        data-src-sp={`${post.eyecatch.src}?auto=compress,format&w=750`}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src={`${post.eyecatch.src}?auto=compress,format&sat=-100`}
                        width={post.eyecatch.width}
                      />
                    </a>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <a css={project__eyecatch} href={`./projects/${post.id}/`}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE * 2}
                        data-ref="plane"
                        data-src={`${post.eyecatch.src}?auto=compress,format`}
                        data-src-sp={`${post.eyecatch.src}?auto=compress,format&w=750`}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src={`${post.eyecatch.src}?auto=compress,format&sat=-100`}
                        width={post.eyecatch.width}
                      />
                    </a>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <a css={project__eyecatch} href={`./projects/${post.id}/`}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE * 3}
                        data-ref="plane"
                        data-src={`${post.eyecatch.src}?auto=compress,format`}
                        data-src-sp={`${post.eyecatch.src}?auto=compress,format&w=750`}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src={`${post.eyecatch.src}?auto=compress,format&sat=-100`}
                        width={post.eyecatch.width}
                      />
                    </a>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <a css={project__eyecatch} href={`./projects/${post.id}/`}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE * 4}
                        data-ref="plane"
                        data-src={`${post.eyecatch.src}?auto=compress,format`}
                        data-src-sp={`${post.eyecatch.src}?auto=compress,format&w=750`}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src={`${post.eyecatch.src}?auto=compress,format&sat=-100`}
                        width={post.eyecatch.width}
                      />
                    </a>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <a css={project__eyecatch} href={`./projects/${post.id}/`}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE * 5}
                        data-ref="plane"
                        data-src={`${post.eyecatch.src}?auto=compress,format`}
                        data-src-sp={`${post.eyecatch.src}?auto=compress,format&w=750`}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src={`${post.eyecatch.src}?auto=compress,format&sat=-100`}
                        width={post.eyecatch.width}
                      />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </Body>
    </PageWithHeader>
  )}`;
};

const wrap = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const projects = css`
  position: absolute;
  top: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: calc(100% + var(--grid) * 10);
  left: calc(var(--grid) * -5);

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
    width: calc(100% + var(--grid) * 4);
    left: calc(var(--grid) * -2);
  }
`;

const project = css`
  position: relative;
  padding-top: 100%;
  pointer-events: none;

  @media (min-width: 640px) {
    // padding-top: 125%;
  }

  &:nth-child(2n) {
    pointer-events: auto;
  }
`;

const project__eyecatch = css`
  position: absolute;
  inset: 0.5rem;
  display: block;
  pointer-events: none;

  @media (min-width: 640px) {
    inset: 1rem;
  }
`;
