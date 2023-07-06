import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Header } from "./_components/header";
import { Content } from "./_components/page-content";
import { PageWithHeader } from "./_components/page-with-header";
import { Seo } from "./_components/seo";
import type { WorkMetadata } from "@/_work/model";

export const data = {
  pagination: {
    addAllPagesToCollections: false,
    alias: "posts",
    data: "cms.index",
    size: 10,
  },
};

export const render = (props: any) => {
  const posts = props.posts as WorkMetadata[];

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />} seo={<Seo permalink="" title="" />}>
      <Content>
        <main className="h-full" data-component="home">
          <div css={intro} data-scroll-item>
            <h1 className="sr-only">Sho Hayakawa Developer</h1>
            <div className="sizefull relative" data-ref="artwork">
              <div
                className="inset-0 absolute"
                css={intro__frame}
                role="presentation"
              ></div>
              <canvas
                className="inset-0 w-full h-full pointer-events-none absolute"
                data-ref="artworkCanvas"
              ></canvas>
            </div>
          </div>
          <div className="mt-[8rem] | sm:mt-[10rem]" css={projects}>
            <h2 className="sr-only">PROJECTS</h2>
            {posts.map((post, index) => {
              return (
                <div
                  className={`mb-[8rem] | sm:mb-[10rem] ${
                    (index + 1) % 2 === 0 ? "sm:flex-row-reverse" : ""
                  }`}
                  css={project}
                  data-scroll-item
                  key={post.id}
                >
                  <a
                    className=""
                    css={project__eyecatch}
                    href={`./projects/${post.id}/`}
                  >
                    <img
                      alt=""
                      data-ref="plane"
                      data-src={`${post.eyecatch.src}?auto=compress,format`}
                      data-src-sp={`${post.eyecatch.src}?auto=compress,format&fit=crop&w=750&h=750`}
                      decoding="async"
                      height={post.eyecatch.height}
                      src={`${post.eyecatch.src}?auto=compress,format&sat=-100`}
                      width={post.eyecatch.width}
                    />
                  </a>
                  {
                    <div className="u-sp" css={project__body}>
                      <h3 className="mt-[1em]" css={heading}>
                        {post.title}
                      </h3>
                    </div>
                  }
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
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 0.4rem;
`;

const intro__frame = css`
  // border: 1px solid var(--color-bg);
  pointer-events: none;
  background-color: #fff;
`;

const projects = css`
  width: calc(var(--grid) * 10);
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    width: 100%;
  }
`;

const project = css`
  @media (min-width: 640px) {
    display: flex;
    gap: var(--gap);
  }
`;

const project__eyecatch = css`
  display: block;
  aspect-ratio: 1 / 1;
  background-color: var(--color-bg);

  @media (min-width: 640px) {
    aspect-ratio: auto;
    width: calc(var(--grid) * 8);
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
  backface-visibility: hidden;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 5 - var(--gap) * 2);
    display: flex;
    flex-direction: column-reverse;
    gap: 1.5rem;
    text-align: left;
  }
`;

const heading = css`
  font-family: var(--font-en);
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.06em;
  line-height: 1.1;
  opacity: 0.7;
  text-align: right;
  backface-visibility: hidden;

  @media (min-width: 640px) {
    font-size: 3rem;
    margin-bottom: -0.1em;
    margin-left: -0.3em;
  }
`;
