import { renderToStaticMarkup as r } from "react-dom/server";
import * as styles from "./index.css";
import { Body } from "../_components/body";
import { Header } from "../_components/header";
import { PageWithHeader } from "../_components/page-with-header";
import { Seo } from "../_components/seo";
import type { WorkMetadata } from "@/_work/model";

const PER_PAGE = 99;

export const data = {
  pagination: {
    addAllPagesToCollections: false,
    alias: "posts",
    data: "cms.works",
    size: PER_PAGE,
  },
};

export const render = (props: any) => {
  const posts = props.posts as WorkMetadata[];

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader
      header={<Header />}
      seo={<Seo permalink="/works/" title="Works" />}
    >
      <Body namespace="Works">
        <main className="h-full" data-component="Works">
          <div aria-hidden="true" data-scroll-item />
          <div css={styles.wrap}>
            <ul css={styles.list} data-ref="list">
              {posts.map((post) => {
                return (
                  <li key={post.id}>
                    <a css={styles.item} data-ref="item" href={`./${post.id}/`}>
                      <img
                        alt=""
                        className="pc:hidden"
                        decoding="async"
                        height={post.eyecatch.height}
                        loading="lazy"
                        src={post.eyecatch.src + "?auto=compress,format&w=100"}
                        width={post.eyecatch.width}
                      />
                      <span className="inline-block leading-[.85]">
                        {post.title}
                      </span>
                    </a>
                  </li>
                );
              })}
              {posts.map((post) => {
                return (
                  <li key={post.id}>
                    <a css={styles.item} data-ref="item" href={`./${post.id}/`}>
                      <img
                        alt=""
                        className="pc:hidden"
                        decoding="async"
                        height={post.eyecatch.height}
                        loading="lazy"
                        src={post.eyecatch.src + "?auto=compress,format&w=100"}
                        width={post.eyecatch.width}
                      />
                      <span className="inline-block leading-[.85]">
                        {post.title}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </main>
      </Body>
    </PageWithHeader>
  )}`;
};
