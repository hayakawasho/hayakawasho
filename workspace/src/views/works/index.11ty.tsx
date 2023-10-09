import { renderToStaticMarkup as r } from "react-dom/server";
import { shuffle } from "@/_foundation/shuffle";
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
  const posts = shuffle(props.posts as WorkMetadata[]);

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
            <ul className="" css={styles.projects}>
              {posts.map((post) => (
                <li key={post.id}>
                  <div></div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </Body>
    </PageWithHeader>
  )}`;
};
