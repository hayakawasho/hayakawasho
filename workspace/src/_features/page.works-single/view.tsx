import cx from 'clsx';
import React from 'react';
import { zeroPadding } from '~/_foundation/utils';
import * as Styles from './index.css';
import { Header } from '../header/view';
import { PageWrapper } from '../page-wrapper';
import { Link } from '../ui/link';
import type { WorkMetadata } from '~/_features/work/model';

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
          {[...'Back'].map((c, index) => (
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
                <p className={cx(Styles.sub, 'overflow-hidden')}>
                  <span className="block uppercase" data-ref="sub">
                    Projects/
                  </span>
                </p>
                <h1 className={cx(Styles.heading, 'overflow-hidden mt-[-.1em]')} data-ref="h1">
                  {post.title}
                </h1>
              </div>

              <div className={Styles.intro__info}>
                <div className={Styles.info}>
                  {
                    //<InfoCategory post={post} />
                  }
                  {
                    //<InfoDate post={post} />
                  }
                  {
                    // post.url && <InfoUrl post={post} />
                  }
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

          <div className={cx(Styles.eyecatch, 'pc:hidden')}>
            <img
              alt=""
              className={cx(Styles.eyecatchImg, 'pointer-events-none invisible')}
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
                    className="pointer-events-none invisible"
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
              <p className={cx(Styles.sub, '!pc:text-center')}>
                <span className="inline-block uppercase">Next</span>
              </p>
              <h2 className={cx(Styles.heading, '!pc:text-center mt-[-.05em]')}>
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
