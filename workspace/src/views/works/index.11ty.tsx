import { renderToStaticMarkup as r } from "react-dom/server";
import * as styles from "./index.css";
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

const IMG_API = "?auto=compress,format&fit=crop&w=100&h=100";

export const render = (props: any) => {
  const posts = props.posts as WorkMetadata[];

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader
      header={<Header />}
      namespace="Works"
      seo={<Seo permalink="/works/" title="Works" />}
    >
      <main className="h-full" data-component="Works">
        <div aria-hidden="true" data-scroll-item />
        <h1 className="sr-only">Works</h1>
        <div css={styles.wrap}>
          <ul css={styles.list} data-ref="list">
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <a css={styles.item} data-ref="item" href={`./${post.id}/`}>
                    <div className="pc:hidden" css={styles.item__thumb}>
                      <img
                        alt=""
                        className="w-full h-full rounded-1/2 | js-item"
                        decoding="auto"
                        height={100}
                        src={post.eyecatch.src + IMG_API}
                        width={100}
                      />
                    </div>
                    <h2 className="inline-block leading-[1]">
                      <span className="block overflow-hidden" data-ref="text">
                        <span className="block | js-item">{post.title}</span>
                      </span>
                    </h2>
                  </a>
                </li>
              );
            })}
            {posts.map((post) => {
              return (
                <li aria-hidden="true" key={post.id}>
                  <a css={styles.item} data-ref="item" href={`./${post.id}/`}>
                    <div className="pc:hidden" css={styles.item__thumb}>
                      <img
                        alt=""
                        className="w-full h-full rounded-1/2 | js-item"
                        decoding="auto"
                        height={100}
                        loading="lazy"
                        src={post.eyecatch.src + IMG_API}
                        width={100}
                      />
                    </div>
                    <h2 className="inline-block leading-[1]">
                      <span className="block overflow-hidden" data-ref="text">
                        <span className="block | js-item">{post.title}</span>
                      </span>
                    </h2>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </PageWithHeader>
  )}`;
};
