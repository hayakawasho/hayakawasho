import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Header } from "../_components/header";
import { Content } from "../_components/page-content";
import { PageWithHeader } from "../_components/page-with-header";
import { ResponsiveImage } from "../_components/responsive-image";
import type { WorkMetadata } from "@/_work/model";

export const data = {
  pagination: {
    addAllPagesToCollections: true,
    alias: "post",
    data: "cms.index",
    size: 1,
  },
  permalink: (context: any) => `works/${context.post.id}/index.html`,
};

export const render = (props: any) => {
  const post: WorkMetadata = props.post;

  const page = props.pagination.page;
  const nextPost: WorkMetadata =
    page.last.id === post.id ? { ...page.first } : { ...page.next };

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content>
        <main data-component="">
          <div css={head} data-scroll-item>
            <h1>{post.title}</h1>
          </div>
          <div className="mb-[8rem]" data-scroll-item>
            <ResponsiveImage
              alt=""
              pcH={post.eyecatch.height}
              pcSrc={`${post.eyecatch.src}?auto=compress,format`}
              pcW={post.eyecatch.width}
              spH={post.eyecatch.height}
              spSrc={`${post.eyecatch.src}?auto=compress,format&fit=crop&w=750`}
              spW={post.eyecatch.width}
            />
          </div>
          <div css={cases} data-scroll-item>
            <ul>
              {post.cases.map((i, index) => {
                return (
                  <li className="mb-[2.5rem]" key={index}>
                    <ResponsiveImage
                      alt=""
                      pcH={i.height}
                      pcSrc={`${i.src}?auto=compress,format`}
                      pcW={i.width}
                      spH={i.height}
                      spSrc={`${i.src}?auto=compress,format&fit=crop&w=750`}
                      spW={i.width}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
      </Content>
    </PageWithHeader>
  )}`;
};

const head = css`
  height: 132vw;
`;

const cases = css`
  padding-left: calc(var(--gap) * 2);
  padding-right: calc(var(--gap) * 2);
`;
