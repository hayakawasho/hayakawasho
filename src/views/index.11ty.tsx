import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Header } from "./_components/header";
import { Content } from "./_components/page-content";
import { PageWithHeader } from "./_components/page-with-header";
import type { WorkMetadata } from "@/_work/model";

export const data = {
  pagination: {
    addAllPagesToCollections: false,
    alias: "posts",
    data: "cms.index",
    size: 5,
  },
};

export const render = (props: any) => {
  const posts = props.posts as WorkMetadata[];

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content>
        <main data-component="home">
          <div css={intro} data-ref="intro" data-scroll-item>
            <h1 className="sr-only">Sho Hayakawa Developer</h1>
            <canvas
              className="inset-0 w-full h-full pointer-events-none absolute"
              data-ref="introCanvas"
            ></canvas>
          </div>
          <div className="mt-[8rem] | sm:mt-[12rem]" css={projects}>
            <h2 className="sr-only">PROJECTS</h2>
            {posts.map((post, index) => {
              return (
                <div
                  className={`mb-[8rem] | sm:mb-[12rem] ${
                    (index + 1) % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                  css={project}
                  data-scroll-item
                  key={post.id}
                >
                  <figure
                    className="mb-[2rem] | sm:mb-0"
                    css={project__eyecatch}
                  >
                    <img
                      alt=""
                      data-pc-src={`${post.eyecatch.src}?auto=compress,format`}
                      data-ref="plane"
                      data-sp-src={`${post.eyecatch.src}?auto=compress,format&fit=crop&w=750&h=750`}
                      height={post.eyecatch.height}
                      loading="lazy"
                      src={`${post.eyecatch.src}?auto=compress,format`}
                      width={post.eyecatch.width}
                    />
                  </figure>
                  <div css={project__body}>
                    <h3 css={heading}>{post.title}</h3>
                    <p className="mt-[.5em] | sm:mt-0" css={text}>
                      {post.kind}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </Content>
    </PageWithHeader>
  )}`;
};

const intro = css`
  height: 100vh;
  height: 100svh;
  overflow: hidden;
  position: relative;
`;

const projects = css`
  padding: 0 var(--grid);
`;

const project = css`
  @media (min-width: 640px) {
    display: flex;
    gap: var(--gap);
  }
`;

const project__eyecatch = css`
  aspect-ratio: 1 / 1;

  @media (min-width: 640px) {
    aspect-ratio: unset;
    width: calc(var(--grid) * 5);
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    visibility: hidden;
  }
`;

const project__body = css`
  text-align: center;

  @media (min-width: 640px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 1.5rem;
    text-align: left;
  }
`;

const heading = css`
  font-size: 2.4rem;
  font-weight: 200;
  letter-spacing: 0.1em;
  line-height: 1.05;

  @media (min-width: 640px) {
    font-size: 3.6rem;
    margin-bottom: -0.1em;
  }
`;

const text = css`
  font-size: 1.2rem;
  line-height: 1;
  opacity: 0.3;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`;
