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
          <div css={projectsName}>
            {posts.map((post) => (
              <a key={post.id} href={`./projects/${post.id}/`}>
                {post.title}
              </a>
            ))}
          </div>
          <div css={wrap}>
            <div className="" css={projects} data-ref="grid">
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <div css={project__eyecatch}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1}
                        data-ref="plane"
                        data-src={post.eyecatch.src}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
                        width={post.eyecatch.width}
                      />
                    </div>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <div css={project__eyecatch}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE}
                        data-ref="plane"
                        data-src={post.eyecatch.src}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
                        width={post.eyecatch.width}
                      />
                    </div>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <div css={project__eyecatch}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE * 2}
                        data-ref="plane"
                        data-src={post.eyecatch.src}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
                        width={post.eyecatch.width}
                      />
                    </div>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <div css={project__eyecatch}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE * 3}
                        data-ref="plane"
                        data-src={post.eyecatch.src}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
                        width={post.eyecatch.width}
                      />
                    </div>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <div css={project__eyecatch}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE * 4}
                        data-ref="plane"
                        data-src={post.eyecatch.src}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
                        width={post.eyecatch.width}
                      />
                    </div>
                  </div>
                );
              })}
              {posts.map((post, index) => {
                return (
                  <div css={project} key={post.id}>
                    <div css={project__eyecatch}>
                      <img
                        alt={post.title}
                        className="w-full h-full invisible"
                        data-h={post.eyecatch.height}
                        data-index={index + 1 + PER_PAGE * 5}
                        data-ref="plane"
                        data-src={post.eyecatch.src}
                        data-w={post.eyecatch.width}
                        height={post.eyecatch.height}
                        src="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
                        width={post.eyecatch.width}
                      />
                    </div>
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

const projectsName = css`
  position: fixed;
  font-size: 1.6rem;
  color: #fff;
  font-size: 2rem;
  z-index: 100;
  mix-blend-mode: difference;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  > a {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
`;

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
  width: calc(100% + var(--grid) * 11);
  left: calc(var(--grid) * -5.5);

  @media (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
    width: calc(100% + var(--grid) * 4);
    left: calc(var(--grid) * -2);
  }
`;

const project = css`
  position: relative;
  padding-top: 100%;

  @media (min-width: 640px) {
    padding-top: 120%;
  }
`;

const project__eyecatch = css`
  position: absolute;
  inset: 1.5rem;
  display: block;

  @media (min-width: 640px) {
    inset: 4rem;
  }
`;
