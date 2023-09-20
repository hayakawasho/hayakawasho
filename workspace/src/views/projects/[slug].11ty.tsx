import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import {
  selectDatetime,
  selectLaunch,
  selectUrl,
} from "@/_work/model/selector";
import { Body } from "../_components/body";
import { Header } from "../_components/header";
import { PageWithHeader } from "../_components/page-with-header";
import { ResponsiveImage } from "../_components/responsive-image";
import { Seo } from "../_components/seo";
import type { WorkMetadata } from "@/_work/model";

export const data = {
  pagination: {
    addAllPagesToCollections: true,
    alias: "post",
    data: "cms.projects",
    size: 1,
  },
  permalink: (context: any) => `projects/${context.post.id}/index.html`,
};

export const render = (props: any) => {
  const post: WorkMetadata = props.post;

  const { page } = props.pagination;
  const { last, first, next } = page;

  const nextPost: WorkMetadata = last.id === post.id ? first : next;

  const max = props.pagination.links.length;
  const now = props.pagination.pageNumber + 1;

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader
      header={<Header />}
      seo={<Seo permalink={`/projects/${post.id}/`} title={post.title} />}
    >
      <Body namespace="project">
        <main data-component="project">
          <div css={intro} data-scroll-item>
            <div className="" css={intro__g}>
              <div css={intro__indexNumber}>
                <span className="inline-block" data-ref="now">
                  {now}
                </span>
                <span
                  className="relative top-[-1px] inline-block mx-[.4em]"
                  data-ref="dash"
                >
                  —
                </span>
                <span className="inline-block" data-ref="max">
                  {max}
                </span>
              </div>

              <h1 css={intro__heading} data-ref="h1">
                <span className="inline-block leading-[1]">
                  {post.title}/{post.title}/{post.title}
                </span>
              </h1>

              <div css={intro__infoWrap}>
                <div css={intro__info}>
                  <dl css={info}>
                    <dt className="overflow-hidden">
                      <span className="inline-block" data-ref="infoText">
                        (CATEGORY)
                      </span>
                    </dt>
                    <dd className="uppercase overflow-hidden">
                      <span className="inline-block" data-ref="infoText">
                        {post.category}
                      </span>
                    </dd>
                  </dl>
                  <dl css={info}>
                    <dt className="overflow-hidden">
                      <span className="inline-block" data-ref="infoText">
                        (DATE)
                      </span>
                    </dt>
                    <dd className="uppercase overflow-hidden">
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
                    <dl css={info}>
                      <dt className="overflow-hidden">
                        <span className="inline-block" data-ref="infoText">
                          (URL)
                        </span>
                      </dt>
                      <dd className="_url | overflow-hidden">
                        <a
                          className="inline-block"
                          data-ref="infoText"
                          href={post.url}
                          target="_blank"
                        >
                          {selectUrl(post)}{" "}
                          <span className="text-[90%]">↗</span>
                        </a>
                      </dd>
                    </dl>
                  )}
                </div>
                {post.stacks.length > 0 && (
                  <div css={intro__stacks}>
                    <ul css={intro__stacksItems}>
                      {post.stacks.map((stack, i) => (
                        <li className="overflow-hidden" key={i}>
                          <span className="inline-block" data-ref="stack">
                            {stack}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div
                      css={intro__stacks__hr}
                      data-ref="infoLine"
                      role="presentation"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div data-scroll-item>
            <div
              className="mb-[10rem] sm:mb-[20rem]"
              css={eyecatch}
              data-ref="eyecatch"
            >
              <ResponsiveImage
                alt=""
                css={eyecatch__img}
                pcH={post.eyecatch.height}
                pcSrc={`${post.eyecatch.src}?auto=compress,format`}
                pcW={post.eyecatch.width}
                spH={post.eyecatch.height}
                spSrc={`${post.eyecatch.src}?auto=compress,format&w=1200`}
                spW={post.eyecatch.width}
              />
            </div>

            <ul className="" css={screenshots}>
              {post.screenshots.map((i, index) => {
                return (
                  <li className="" key={index}>
                    <img
                      alt=""
                      className={`pointer-events-none invisible`}
                      data-h={i.height}
                      data-ref="screenshot"
                      data-src={`${i.src}?auto=compress,format`}
                      data-src-sp={`${i.src}?auto=compress,format&w=750`}
                      data-w={i.width}
                      height={i.height}
                      src={`${i.src}?auto=compress,format`}
                      width={i.width}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <aside data-ref="next">
            <div css={dummy} data-ref="end" data-scroll-item></div>
            <div css={nextProject} data-ref="nextProject">
              <a
                css={nextProject__hgroup}
                data-ref="nextHGroup"
                href={`../${nextPost.id}/`}
              >
                <h3 css={nextProject__heading}>
                  <span className="inline-block leading-[1]">Next Project</span>
                </h3>
                <h4 className="" css={nextProject__sub}>
                  ({nextPost.title})
                </h4>
              </a>
            </div>
          </aside>
        </main>
      </Body>
    </PageWithHeader>
  )}`;
};

const intro = css`
  position: relative;
`;

const intro__g = css`
  min-height: 125vw;
  position: relative;
  overflow: hidden;

  @media (min-width: 640px) {
    min-height: auto;
    height: 100vh;
    height: 100svh;
  }
`;

const intro__heading = css`
  width: 100%;
  font-size: 5.6rem;
  font-weight: 300;
  font-family: var(--font-en);
  letter-spacing: 0.08em;
  white-space: nowrap;
  padding-top: 10rem;
  overflow: hidden;

  @media (min-width: 640px) {
    font-size: 10.4rem;
    white-space: nowrap;
    position: absolute;
    top: 50%;
    padding: 0;
    margin-top: -1em;
  }
`;

const intro__infoWrap = css`
  padding: 0 var(--grid);
  padding-top: 4.8rem;
  padding-bottom: 6.6667vw;
  display: flex;
  align-items: flex-start;

  @media (min-width: 640px) {
    flex-direction: column;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 var(--grid) 7rem 0;
  }
`;

const intro__info = css`
  width: calc(var(--grid) * 5);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 2);
  }
`;

const info = css`
  font-size: 1.1rem;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }

  & > dt {
    opacity: 0.5;
    backface-visibility: hidden;
  }

  & > dd {
    backface-visibility: hidden;
  }

  ._url {
    font-size: 110%;
  }
`;

const intro__stacks = css`
  padding-left: 0.6em;
  padding-bottom: 0.6em;
  position: relative;
  margin-top: 0.2rem;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 2);
    padding-left: 0;
    padding-bottom: 0;
    padding-top: 3rem;
    margin-top: 2rem;
  }
`;

const intro__stacksItems = css`
  font-size: 1.1rem;
  line-height: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3em;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }

  > li {
    backface-visibility: hidden;
  }
`;

const intro__stacks__hr = css`
  width: 1px;
  height: 100%;
  background-color: currentColor;
  position: absolute;
  top: 0;
  left: 0;
  translate: -50%;
  transform-origin: top left;
  display: block;

  @media (min-width: 640px) {
    width: 1.5rem;
    height: 1px;
    translate: 0;
  }
`;

const intro__indexNumber = css`
  position: absolute;
  top: 3rem;
  right: var(--grid);
  font-size: 1.1rem;
  overflow: hidden;

  @media (min-width: 640px) {
    right: calc(var(--grid) - var(--gap) * 0.5);
    top: 6rem;
    font-size: 1.4rem;
  }
`;

//----------------------------------------------------------------

const eyecatch = css`
  overflow: hidden;
  backface-visibility: hidden;
`;

const eyecatch__img = css`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 3 / 2;

  @media (min-width: 640px) {
    aspect-ratio: auto;
  }
`;

const screenshots = css`
  width: calc((var(--grid) * 10));
  margin-left: auto;
  margin-right: auto;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-bottom: 5rem;

  @media (min-width: 640px) {
    width: calc(var(--grid) * 8);
    max-width: 1280px;
    gap: 14rem;
  }
`;

//----------------------------------------------------------------

const dummy = css`
  height: 101vh;
  height: 101svh;

  @media (min-width: 640px) {
    height: 125vh;
    height: 125svh;
  }
`;

const nextProject = css`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  background-color: #041f1e;
  z-index: 100;
  opacity: 0;
  perspective: 1000px;

  @media (min-width: 640px) {
    padding-top: 15rem;
    padding-bottom: 15rem;
  }
`;

const nextProject__hgroup = css`
  display: inline-block;
  pointer-events: auto;
  color: #fff;
`;

const nextProject__heading = css`
  font-size: 5.6rem;
  font-family: var(--font-en);
  letter-spacing: 0.04em;
  line-height: 1;

  @media (min-width: 640px) {
    font-size: 10.4rem;
  }
`;

const nextProject__sub = css`
  font-size: 1.1rem;
  letter-spacing: 0.04em;
  text-align: left;
  opacity: 0.5;
  margin-top: -0.6em;
  margin-left: 0.3em;

  @media (min-width: 640px) {
    font-size: 1.5rem;
    margin-top: -0.8em;
    margin-left: 0.4em;
  }
`;
