import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Header } from "./_components/header";
import { Body } from "./_components/body";
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
      <Body namespace="home">
        <main className="h-full" data-component="home">
          <h1 className="sr-only">SHO HAYAKAWA PORTFOLIO</h1>
          <div data-scroll-item>
            <div className="" css={projects}>
              {posts.map((post, _index) => {
                return (
                  <div className={`mb-[2rem]`} css={project} key={post.id}>
                    <div css={project__g}>
                      <a
                        css={project__eyecatch}
                        href={`./projects/${post.id}/`}
                      >
                        <img
                          alt={post.title}
                          className="sizefit opacity-0"
                          data-ref="plane"
                          data-src={`${post.eyecatch.src}?auto=compress,format&sat=-100`}
                          data-src-sp={`${post.eyecatch.src}?auto=compress,format&w=750&sat=-100`}
                        ></img>
                      </a>
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

const projects = css`
  width: calc(var(--grid) * 7);
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
