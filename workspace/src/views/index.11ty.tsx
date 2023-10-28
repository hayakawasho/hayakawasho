import { renderToStaticMarkup as r } from "react-dom/server";
import { mq } from "@/_foundation/mq";
import { shuffle } from "@/_foundation/shuffle";
import { Header } from "./_components/header";
import { PageWithHeader } from "./_components/page-with-header";
import { Seo } from "./_components/seo";
import { ImagePreloader } from "./_components/ui/image-preloader";
import { Link } from "./_components/ui/link";
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

const IMG_API = "?auto=compress,format";

export const render = (props: any) => {
  const posts = shuffle(props.posts as WorkMetadata[]);

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader
      header={<Header />}
      namespace="Home"
      seo={
        <Seo
          permalink=""
          prepend={
            <>
              {posts.map((post) => (
                <ImagePreloader
                  href={post.eyecatch.src + IMG_API}
                  key={post.id}
                  media={mq.pc}
                />
              ))}
              {posts.map((post) => (
                <ImagePreloader
                  href={post.eyecatch.src + IMG_API + "&w=750"}
                  key={post.id}
                  media={mq.sp}
                />
              ))}
            </>
          }
          title=""
        />
      }
    >
      <main className="h-full" data-component="Home">
        <div aria-hidden="true" data-scroll-item />
        <h1 className="sr-only">Sho Hayakawa Portfolio</h1>
        <Link
          css={styles.toProjects}
          data-ref="viewProjects"
          swap="swap:1s"
          to="./works/"
        >
          <span aria-hidden="true" className="_w" data-ref="w">
            V
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            i
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            e
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            w
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            {" "}
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            a
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            l
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            l
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            {" "}
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            p
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            r
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            o
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            j
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            e
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            c
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            t
          </span>
          <span aria-hidden="true" className="_w" data-ref="w">
            s
          </span>
          <span className="sr-only">View all projects</span>
        </Link>
        <div css={styles.wrap}>
          <ul className="" css={styles.projects} data-ref="grid">
            {posts.map((post, index) => (
              <li css={styles.project} key={post.id}>
                <Thumbnail index={index} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" css={styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" css={styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE * 2} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" css={styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE * 3} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" css={styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE * 4} post={post} />
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" css={styles.project} key={post.id}>
                <Thumbnail index={index + PER_PAGE * 5} post={post} />
              </li>
            ))}
          </ul>
        </div>
      </main>
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
    <figure css={styles.project__eyecatch} data-ref="gridItem">
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
    </figure>
  );
};
