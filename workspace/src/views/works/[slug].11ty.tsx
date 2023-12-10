import { renderToStaticMarkup as r } from 'react-dom/server';
import { mq } from '@/_foundation/mq';
import { zeroPadding } from '@/_foundation/utils';
import * as styles from './[slug].css';
import { Header } from '../_components/layout/header';
import { PageWithHeader } from '../_components/layout/page-with-header';
import { Seo } from '../_components/layout/seo';
import { InfoCategory, InfoUrl, InfoDate } from '../_components/page/works/info';
import { Link } from '../_components/ui/link';
import type { WorkMetadata } from '@/_work/model';

class Component {
  data() {
    return {
      pagination: {
        addAllPagesToCollections: true,
        alias: 'post',
        data: 'cms.works',
        size: 1,
      },
      permalink: (context: any) => `works/${context.post.id}/index.html`,
    };
  }

  render(props: any) {
    const post: WorkMetadata = props.post;
    const eyecatch = post.eyecatch.src + '?auto=compress,format';

    const { page } = props.pagination;
    const { last, first, next } = page;

    const nextPost: WorkMetadata = last.id === post.id ? first : next;

    const max = props.pagination.links.length;
    const now = props.pagination.pageNumber + 1;

    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader
        header={<Header current="single" />}
        namespace="single"
        seo={
          <Seo
            permalink={`/works/${post.id}/`}
            prepend={
              <>
                <link
                  as="image"
                  crossOrigin="anonymous"
                  href={eyecatch + '&w=750'}
                  media={mq.sp}
                  rel="preload"
                />
                <link
                  as="image"
                  crossOrigin="anonymous"
                  href={eyecatch + '&w=1440'}
                  media={mq.pc}
                  rel="preload"
                />
              </>
            }
            title={post.title}
          />
        }
      >
        <main data-component="Single">
          <Link css={styles.back} data-ref="back" to="../">
            {[...'Back'].map((c, index) => (
              <span
                aria-hidden="true"
                className="inline-block relative overflow-hidden"
                key={index}
              >
                <span className="inline-block" data-ref="c">
                  <span className="inline-block relative">{c}</span>
                  <span className="inline-block absolute top-[100%] left-0">{c}</span>
                </span>
              </span>
            ))}
            <span className="sr-only">Back</span>
          </Link>
          <div className="mb-[10rem] pc:mb-[20rem]" data-scroll-item>
            <div css={styles.intro}>
              <div css={styles.intro__g}>
                <div css={styles.intro__indexNumber}>
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

                <div css={styles.intro__hgroup}>
                  <p className="overflow-hidden" css={styles.sub}>
                    <span className="block uppercase" data-ref="sub">
                      Projects/
                    </span>
                  </p>
                  <h1 className="overflow-hidden mt-[-.1em]" css={styles.heading} data-ref="h1">
                    {post.title}
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

            <div
              className="pc:hidden"
              css={styles.eyecatch}
              data-h={post.eyecatch.height}
              data-ref="eyecatch"
              data-src={eyecatch + '&w=1440'}
              data-w={post.eyecatch.width}
            >
              <img
                alt=""
                className="pointer-events-none"
                css={styles.eyecatchImg}
                height={post.eyecatch.height}
                src={eyecatch + '&w=750'}
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
                      data-src={`${i.src}?auto=compress,format&w=1200`}
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
            <div aria-hidden="true" css={styles.dummy} data-ref="end" data-scroll-item />
            <div css={styles.next} data-ref="nextProject">
              <div css={styles.next__hgroup} data-href={`../${nextPost.id}/`} data-ref="nextLink">
                <p className="!pc:text-center" css={styles.sub}>
                  <span className="inline-block uppercase">Next</span>
                </p>
                <h2 className="!pc:text-center mt-[-.05em]" css={styles.heading}>
                  {nextPost.title}
                </h2>
              </div>
            </div>
          </aside>
        </main>
      </PageWithHeader>
    )}`;
  }
}

module.exports = Component;
