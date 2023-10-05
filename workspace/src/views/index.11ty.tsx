import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { shuffle } from "@/_foundation/shuffle";
import { Body } from "./_components/body";
import { Header } from "./_components/header";
import { PageWithHeader } from "./_components/page-with-header";
import { Seo } from "./_components/seo";
import type { WorkMetadata } from "@/_work/model";

const PER_PAGE = 10;

export const data = {
  pagination: {
    addAllPagesToCollections: false,
    alias: "posts",
    data: "cms.home",
    size: PER_PAGE,
  },
};

export const render = (props: any) => {
  const posts = shuffle(props.posts as WorkMetadata[]);

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />} seo={<Seo permalink="" title="" />}>
      <Body namespace="home">
        <main className="h-full" data-component="home">
          <div data-scroll-item></div>
          <h1 className="sr-only">SHO HAYAKAWA PORTFOLIO</h1>
          <div css={wrap}>
            <ul className="" css={projects} data-ref="grid">
              {posts.map((post, index) => (
                <li css={project} key={post.id}>
                  <Thumbnail index={index} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 2} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 3} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 4} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 5} post={post} />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </Body>
    </PageWithHeader>
  )}`;
};

const Thumbnail = ({ post, index }: { post: WorkMetadata; index: number }) => {
  const speed = {
    0: 0.9,
    1: 1,
    2: 0.9,
  }[index % 3];

  return (
    <a css={project__eyecatch} href={`./projects/${post.id}/`}>
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
    </a>
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: calc(100% + var(--grid) * 11);
  left: calc(var(--grid) * -5.5);
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
