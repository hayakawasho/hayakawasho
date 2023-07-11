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
      <Content namespace="home">
        <main className="h-full" data-component="home">
          <div css={intro} data-scroll-item>
            <h1 className="sr-only">Sho Hayakawa Developer</h1>
            <div className="sizefit relative" data-ref="artwork">
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
          <div className="mt-[8rem] | sm:mt-[16rem]" css={projects}>
            <h2 className="sr-only">PROJECTS</h2>
            {posts.map((post, index) => {
              return (
                <div
                  className={`mb-[8rem] | ${
                    (index + 1) % 2 === 0 ? "sm:flex-row-reverse" : ""
                  }`}
                  css={project}
                  data-scroll-item
                  key={post.id}
                >
                  <div css={project__g}>
                    <a
                      css={project__eyecatch}
                      // data-load="home2project"
                      href={`./projects/${post.id}/`}
                    >
                      <div
                        className="sizefit opacity-0"
                        data-ref="plane"
                        data-src={`${post.eyecatch.src}?auto=compress,format&sat=-100`}
                        data-src-sp={`${post.eyecatch.src}?auto=compress,format&w=750&sat=-100`}
                      />
                    </a>
                    {
                      <div className="" css={project__body}>
                        <h3
                          className={`mt-[1em] text-right | ${
                            (index + 1) % 2 === 0
                              ? "sm:text-left"
                              : "sm:text-right"
                          }`}
                          css={heading}
                        >
                          <span className="inline-block" data-ref="name">
                            {post.title}
                          </span>
                        </h3>
                      </div>
                    }
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const intro__frame = css`
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

  &:last-child {
    @media (min-width: 640px) {
      margin-bottom: 16rem;
    }
  }
`;

const project__g = css`
  display: block;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 6);
    padding: 0 var(--gap);
  }
`;

const project__eyecatch = css`
  display: block;
  aspect-ratio: 1 / 1;

  @media (min-width: 640px) {
    aspect-ratio: 16 / 9;
  }
`;

const project__body = css`
  backface-visibility: hidden;
`;

const heading = css`
  font-family: var(--font-en);
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.06em;
  line-height: 1.1;
  opacity: 0.7;
  backface-visibility: hidden;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: 1.3rem;
  }
`;
