import cx from "clsx";
import React from "react";
import { selectDatetime, selectLaunch, selectUrl } from "@/_features/work/selector";
import { zeroPadding } from "@/_foundation/utils";
import Styles from "./index.module.scss";
import { Header } from "../header/view";
import { PageWrapper } from "../page-wrapper/view";
import { Link } from "../ui/link";
import type { WorkMetadata } from "@/_features/work/model";

const Component: React.FC<{
  post: WorkMetadata;
  nextPost: WorkMetadata;
  now: number;
  max: number;
}> = ({ post, nextPost, now, max }) => {
  return (
    <PageWrapper header={<Header current="single" />} namespace="single">
      <main data-component="Single">
        <Link className={Styles.back} data-ref="back" to="../">
          {[..."Back"].map((c, index) => (
            <span aria-hidden="true" className="inline-block relative overflow-hidden" key={index}>
              <span className="inline-block" data-ref="c">
                <span className="inline-block relative">{c}</span>
                <span className="inline-block absolute top-[100%] left-0">{c}</span>
              </span>
            </span>
          ))}
          <span className="sr-only">Back</span>
        </Link>
        <div className="mb-[8rem] pc:mb-[20rem]" data-scroll-item>
          <div className={Styles.intro}>
            <div className={Styles.intro__g}>
              <div className={Styles.intro__indexNumber}>
                <span className="inline-block tracking-[-0.02em]" data-ref="now">
                  {zeroPadding(now)}
                </span>
                <span className="relative inline-block mx-[.5em]" data-ref="dash">
                  ー
                </span>
                <span className="inline-block  tracking-[-0.02em]" data-ref="max">
                  {zeroPadding(max)}
                </span>
              </div>

              <div className={Styles.intro__hgroup}>
                <p className={cx(Styles.sub, "overflow-hidden")}>
                  <span className="block uppercase" data-ref="sub">
                    Projects/
                  </span>
                </p>
                <h1 className={cx(Styles.heading, "overflow-hidden mt-[-.1em]")} data-ref="h1">
                  {post.title}
                </h1>
              </div>

              <div className={Styles.intro__info}>
                <div className={Styles.info}>
                  <dl className={Styles.infoItem}>
                    <dt className={Styles.infoItem__heading}>
                      <span className="inline-block uppercase" data-ref="infoText">
                        (Category)
                      </span>
                    </dt>
                    <dd className={Styles.infoItem__label}>
                      <span className="inline-block" data-ref="infoText">
                        {post.category}
                      </span>
                    </dd>
                  </dl>
                  <dl className={Styles.infoItem}>
                    <dt className={Styles.infoItem__heading}>
                      <span className="inline-block uppercase" data-ref="infoText">
                        (Date)
                      </span>
                    </dt>
                    <dd className={cx(Styles.infoItem__label, "uppercase")}>
                      <time
                        className="inline-block"
                        data-ref="infoText"
                        dateTime={selectDatetime(post)}
                      >
                        {selectLaunch(post)}
                      </time>
                    </dd>
                  </dl>
                  {post.url && (
                    <dl className={Styles.infoItem}>
                      <dt className={Styles.infoItem__heading}>
                        <span className="inline-block uppercase" data-ref="infoText">
                          (Url)
                        </span>
                      </dt>
                      <dd className={Styles.infoItem__url}>
                        <a
                          className="inline-block"
                          data-ref="infoText"
                          href={post.url}
                          target="_blank"
                        >
                          {selectUrl(post)} <span className="text-[90%]">↗</span>
                        </a>
                      </dd>
                    </dl>
                  )}
                </div>
                {post.stacks.length > 0 && (
                  <div className={Styles.stacks}>
                    <ul className={Styles.stacksItems}>
                      {post.stacks.map((stack, i) => (
                        <li className="overflow-hidden" key={i}>
                          <span className="inline-block" data-ref="stack">
                            {stack}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <hr className={Styles.stacks__hr} data-ref="infoLine" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={cx(Styles.eyecatch, "pc:hidden")}>
            <img
              alt=""
              className={cx(Styles.eyecatchImg, "pointer-events-none invisible")}
              data-h={post.eyecatch.height}
              data-ref="eyecatch"
              data-src={post.eyecatch.src}
              data-w={post.eyecatch.width}
              height={post.eyecatch.height}
              width={post.eyecatch.width}
            />
          </div>
        </div>

        <div data-scroll-item>
          <ul className={Styles.screenshots} data-ref="screenshots">
            {post.screenshots.map((i, index) => {
              return (
                <li className="" key={index}>
                  <img
                    alt=""
                    className="pointer-events-none invisible w-full"
                    data-h={i.height}
                    data-ref="screenshotItem"
                    data-src={i.src}
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
          <div aria-hidden="true" className={Styles.dummy} data-ref="end" data-scroll-item />
          <div className={Styles.next} data-ref="nextProject">
            <div
              className={Styles.next__hgroup}
              data-href={`../${nextPost.id}/`}
              data-ref="nextLink"
            >
              <p className={cx(Styles.sub, "!pc:text-center")}>
                <span className="inline-block uppercase">Next</span>
              </p>
              <h2 className={cx(Styles.heading, "!pc:text-center mt-[-.05em]")}>
                {nextPost.title}
              </h2>
            </div>
          </div>
        </aside>
      </main>
    </PageWrapper>
  );
};

export default Component;
