import { renderToStaticMarkup as r } from "react-dom/server";
import { shuffle } from "@/_foundation/shuffle";
import { Body } from "./_components/body";
import { Header } from "./_components/header";
import { PageWithHeader } from "./_components/page-with-header";
import { Seo } from "./_components/seo";
import * as styles from "./index.css";
import type { WorkMetadata } from "@/_work/model";

const PER_PAGE = 5;

export const data = {
  pagination: {
    addAllPagesToCollections: false,
    alias: "posts",
    data: "cms.home",
    size: PER_PAGE,
  },
};

export const render = (props: any) => {
  const posts = shuffle(props.posts as WorkMetadata[]);

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />} seo={<Seo permalink="" title="" />}>
      <Body namespace="home">
        <main className="h-full" data-component="Home">
          <div data-scroll-item></div>
          <h1 className="sr-only">SHO HAYAKAWA PORTFOLIO</h1>
          <div css={styles.wrap}>
            <ul className="" css={styles.projects} data-ref="grid">
              {posts.map((post, index) => (
                <li css={styles.project} key={post.id}>
                  <Thumbnail index={index} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 2} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 3} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 4} post={post} />
                </li>
              ))}
              {posts.map((post, index) => (
                <li css={styles.project} key={post.id}>
                  <Thumbnail index={index + PER_PAGE * 5} post={post} />
                </li>
              ))}
            </ul>
          </div>
        </main>
      </Body>
    </PageWithHeader>
  )}`;
};

const Thumbnail = ({ post, index }: { post: WorkMetadata; index: number }) => {
  const speed = {
    0: 0.75,
    1: 0.9,
    2: 0.75,
  }[index % 3];

  return (
    <a css={styles.project__eyecatch} href={`./works/${post.id}/`}>
      <img
        alt={post.title}
        className="w-full h-full invisible"
        data-h={post.eyecatch.height}
        data-ref="plane"
        data-speed={speed}
        data-src={post.eyecatch.src}
        data-w={post.eyecatch.width}
        height={post.eyecatch.height}
        width={post.eyecatch.width}
      />
    </a>
  );
};
