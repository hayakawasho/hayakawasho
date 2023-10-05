import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Body } from "../_components/body";
import { Header } from "../_components/header";
import { PageWithHeader } from "../_components/page-with-header";
import { Seo } from "../_components/seo";
import type { WorkMetadata } from "@/_work/model";

export const data = {
  pagination: {
    addAllPagesToCollections: false,
    alias: "posts",
    data: "cms.projects",
    size: 99,
  },
};

export const render = (props: any) => {
  const posts = props.posts as WorkMetadata[];

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />} seo={<Seo permalink="" title="" />}>
      <Body namespace="projects">
        <main className="h-full" data-component="projects">
          <div data-scroll-item></div>
          <div css={wrap}>
            <ul className="" css={projects} data-ref="grid">
              {posts.map((post, _index) => (
                <li key={post.id}>
                  <a href={`./${post.id}/`}>{post.title}</a>
                </li>
              ))}
            </ul>
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
  text-align: center
  width: 100%;
`;
