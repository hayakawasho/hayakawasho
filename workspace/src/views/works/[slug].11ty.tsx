import { renderToStaticMarkup as r } from "react-dom/server";
import { zeroPadding } from "@/_foundation/utils";
import * as styles from "./[slug].css";
import { Header } from "../_components/header";
import { ImagePreloader } from "../_components/image-preloader";
import {
  InfoCategory,
  InfoUrl,
  InfoDate,
} from "../_components/page/works/info";
import { PageWithHeader } from "../_components/page-with-header";
import { Seo } from "../_components/seo";
import type { WorkMetadata } from "@/_work/model";

export const data = {
  pagination: {
    addAllPagesToCollections: true,
    alias: "post",
    data: "cms.works",
    size: 1,
  },
  permalink: (context: any) => `works/${context.post.id}/index.html`,
};

export const render = (props: any) => {
  const post: WorkMetadata = props.post;
  const eyecatchSrc = post.eyecatch.src + "?auto=compress,format&w=1200";

  const { page } = props.pagination;
  const { last, first, next } = page;

  const nextPost: WorkMetadata = last.id === post.id ? first : next;

  const max = props.pagination.links.length;
  const now = props.pagination.pageNumber + 1;

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader
      header={<Header />}
      namespace="Work"
      seo={
        <Seo
          permalink={`/works/${post.id}/`}
          prepend={<ImagePreloader href={eyecatchSrc} />}
          title={post.title}
        />
      }
    >
      <main data-component="Work">
        <div className="mb-[10rem] pc:mb-[20rem]" data-scroll-item>
          <div css={styles.intro}>
            <div css={styles.intro__g}>
              <div css={styles.intro__indexNumber}>
                <span
                  className="inline-block tracking-[-0.02em]"
                  data-ref="now"
                >
                  {zeroPadding(now)}
                </span>
                <span
                  className="relative inline-block mx-[.5em]"
                  data-ref="dash"
                >
                  ー
                </span>
                <span
                  className="inline-block  tracking-[-0.02em]"
                  data-ref="max"
                >
                  {zeroPadding(max)}
                </span>
              </div>

              <div css={styles.intro__hgroup}>
                <h2 className="" css={styles.sub}>
                  <span className="inline-block uppercase">Projects/</span>
                </h2>
                <h1 className="" css={styles.heading} data-ref="h1">
                  <span className="inline-block leading-[1]">{post.title}</span>
                </h1>
              </div>

              <div css={styles.intro__info}>
                <div css={styles.info}>
                  <InfoCategory post={post} />
                  <InfoDate post={post} />
                  {post.url && <InfoUrl post={post} />}
                </div>
                {post.stacks.length > 0 && (
                  <div css={styles.stacks}>
                    <ul css={styles.stacksItems}>
                      {post.stacks.map((stack, i) => (
                        <li className="overflow-hidden" key={i}>
                          <span className="inline-block" data-ref="stack">
                            {stack}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <hr css={styles.stacks__hr} data-ref="infoLine" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pc:hidden" css={styles.eyecatch} data-ref="eyecatch">
            <img
              alt=""
              className="pointer-events-none"
              css={styles.eyecatchImg}
              height={post.eyecatch.height}
              src={eyecatchSrc}
              width={post.eyecatch.width}
            />
          </div>
        </div>

        <div data-scroll-item>
          <ul className="" css={styles.screenshots}>
            {post.screenshots.map((i, index) => {
              return (
                <li className="" key={index}>
                  <img
                    alt=""
                    className={`pointer-events-none invisible`}
                    data-h={i.height}
                    data-ref="screenshot"
                    data-src={`${i.src}`}
                    data-w={i.width}
                    height={i.height}
                    width={i.width}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <aside data-ref="next">
          <div
            aria-hidden="true"
            css={styles.dummy}
            data-ref="end"
            data-scroll-item
          />
          <div css={styles.next} data-ref="nextProject">
            <div
              css={styles.next__hgroup}
              data-href={`../${nextPost.id}/`}
              data-ref="nextLink"
            >
              <p className="!pc:text-center" css={styles.sub}>
                <span className="inline-block uppercase">Next</span>
              </p>
              <h2 className="!pc:text-center" css={styles.heading}>
                <span className="inline-block leading-[1]">
                  {nextPost.title}
                </span>
              </h2>
            </div>
          </div>
        </aside>
      </main>
    </PageWithHeader>
  )}`;
};
