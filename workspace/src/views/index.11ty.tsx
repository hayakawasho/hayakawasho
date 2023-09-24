import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { shuffle } from "@/_foundation/shuffle";
import { Body } from "./_components/body";
import { Header } from "./_components/header";
import { PageWithHeader } from "./_components/page-with-header";
import { Seo } from "./_components/seo";
import type { WorkMetadata } from "@/_work/model";

const PER_PAGE = 9;

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

  const start = shuffle(posts);
  const end = shuffle(posts);

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />} seo={<Seo permalink="" title="" />}>
      <Body namespace="home">
        <main className="h-full" data-component="home">
          <div data-scroll-item></div>
          <h1 className="sr-only">SHO HAYAKAWA PORTFOLIO</h1>
          <div css={wrap}>
            <div className="" css={projects} data-ref="grid">
              <div>
                {start.map((post, _index) => (
                  <Thumbnail key={post.id} post={post} speed={0.9} />
                ))}
                {start.map((post, _index) => (
                  <Thumbnail key={post.id} post={post} speed={0.9} />
                ))}
              </div>
              <div>
                {posts.map((post, _index) => (
                  <Thumbnail key={post.id} post={post} speed={1} />
                ))}
                {posts.map((post, _index) => (
                  <Thumbnail key={post.id} post={post} speed={1} />
                ))}
              </div>
              <div>
                {end.map((post, _index) => (
                  <Thumbnail key={post.id} post={post} speed={0.9} />
                ))}
                {end.map((post, _index) => (
                  <Thumbnail key={post.id} post={post} speed={0.9} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </Body>
    </PageWithHeader>
  )}`;
};

const Thumbnail = ({ post, speed }: { post: WorkMetadata; speed: number }) => {
  return (
    <div css={project}>
      <div css={project__eyecatch}>
        <img
          alt={post.title}
          className="w-full h-full invisible"
          data-h={post.eyecatch.height}
          data-ref="plane"
          data-speed={speed}
          data-src={post.eyecatch.src}
          data-w={post.eyecatch.width}
          height={post.eyecatch.height}
          width={post.eyecatch.width}
        />
      </div>
    </div>
  );
};

const wrap = css`
  position: fixed;
  width: 100%;
  height: 100%;
`;

const projects = css`
  position: absolute;
  top: 0;
  left: calc(var(--grid) * -5.5);
  width: calc(100% + var(--grid) * 11);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const project = css`
  position: relative;
  padding-top: 100%;

  @media (min-width: 640px) {
    padding-top: 62.5%;
  }
`;

const project__eyecatch = css`
  position: absolute;
  inset: 1.5rem;
  display: block;

  @media (min-width: 640px) {
    inset: 5rem;
  }
`;
