import { renderToStaticMarkup as r } from "react-dom/server";
import * as styles from "./index.css";
import { Header } from "../_components/header";
import { PageWithHeader } from "../_components/page-with-header";
import { Seo } from "../_components/seo";
import { Link } from "../_components/ui/link";
import type { WorkMetadata } from "@/_work/model";

export const data = {
  pagination: {
    addAllPagesToCollections: false,
    alias: "posts",
    data: "cms.works",
    size: 99,
  },
};

const IMG_API = "?auto=compress,format";
const IMG_API_CROPPED = IMG_API + "&fit=crop&w=100&h=100";

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
        <div css={styles.screen}>
          <ul css={styles.list} data-ref="items">
            {posts.map((post) => {
              return (
                <li
                  data-h={post.eyecatch.height}
                  data-img={post.eyecatch.src + IMG_API}
                  data-ref="item"
                  data-w={post.eyecatch.width}
                  key={post.id}
                >
                  <Link css={styles.item} to={`./${post.id}/`}>
                    <div className="pc:hidden" css={styles.item__thumb}>
                      <img
                        alt=""
                        className="w-full h-full rounded-1/2"
                        data-ref="img"
                        decoding="auto"
                        height={100}
                        src={post.eyecatch.src + IMG_API_CROPPED}
                        width={100}
                      />
                    </div>
                    <h2
                      className="pl-[0.05em]"
                      css={styles.item__title}
                      data-ref="text"
                    >
                      {post.title}
                    </h2>
                  </Link>
                </li>
              );
            })}
            {posts.map((post) => {
              return (
                <li
                  aria-hidden="true"
                  data-h={post.eyecatch.height}
                  data-img={post.eyecatch.src + IMG_API}
                  data-ref="item"
                  data-w={post.eyecatch.width}
                  key={post.id}
                >
                  <Link css={styles.item} to={`./${post.id}/`}>
                    <div className="pc:hidden" css={styles.item__thumb}>
                      <img
                        alt=""
                        className="w-full h-full rounded-1/2"
                        data-ref="img"
                        decoding="auto"
                        height={100}
                        loading="lazy"
                        src={post.eyecatch.src + IMG_API_CROPPED}
                        width={100}
                      />
                    </div>
                    <h2
                      className="pl-[0.05em]"
                      css={styles.item__title}
                      data-ref="text"
                    >
                      {post.title}
                    </h2>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </PageWithHeader>
  )}`;
};
