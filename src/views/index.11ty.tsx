import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Header } from "./_components/header";
import { Content } from "./_components/page-content";
import { PageWithHeader } from "./_components/page-with-header";
import type { WorkMetadata } from "@/_work/model";

export const data = {
  data: [
    {
      createdAt: "2023-06-28T08:38:58.561Z",
      eyecatch: {
        height: 1440,
        src: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/622a143e5b7a4bb5a1101a88ac26d321/7faf77c0-744d-43f7-af21-fc95b5067d2b_pksha.jpeg",
        width: 2560,
      },
      gallery: [],
      id: "8m_16_r1i",
      kinds: ["Corporate"],
      publishedAt: "2023-06-28T08:49:46.904Z",
      revisedAt: "2023-06-29T07:53:00.215Z",
      title: "PKSHA",
      updatedAt: "2023-06-29T07:53:00.215Z",
    },
    {
      createdAt: "2023-06-28T08:41:14.847Z",
      eyecatch: {
        height: 1600,
        src: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/5995cd9fb29847b2b010ced2ff564035/ea6acc92-e926-4a69-98a0-4e1ab6437ae5_6%C3%971.jpg",
        width: 2844,
      },
      gallery: [],
      id: "tc1hpsmfozzp",
      kinds: ["Brand"],
      publishedAt: "2023-06-28T08:48:59.985Z",
      revisedAt: "2023-06-29T07:53:07.151Z",
      title: "6x1 COPENHAGEN",
      updatedAt: "2023-06-29T07:53:07.151Z",
    },
    {
      createdAt: "2023-06-28T08:37:30.002Z",
      eyecatch: {
        height: 1080,
        src: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/4daa04beb9964307bbbb66b305e9ce1f/1ee2902e-4008-4b60-a48d-4bde441d0be8_another_eden.jpg",
        width: 1920,
      },
      gallery: [],
      id: "5yf98qb0p8",
      kinds: ["Corporate"],
      publishedAt: "2023-06-28T08:50:05.197Z",
      revisedAt: "2023-06-29T07:53:16.306Z",
      title: "ANOTHER EDEN",
      updatedAt: "2023-06-29T07:53:16.306Z",
    },
    {
      createdAt: "2023-06-28T08:39:13.943Z",
      eyecatch: {
        height: 1194,
        src: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/40f2b91e92d543b1b2ed6f5666f7f15d/15b25b8e-1286-4ab7-94c2-9888289d3a0c_sakayori.jpg",
        width: 2121,
      },
      gallery: [],
      id: "z5dydhvv47",
      kinds: ["Brand"],
      publishedAt: "2023-06-28T08:49:41.360Z",
      revisedAt: "2023-06-29T07:53:37.018Z",
      title: "g.sakayori.",
      updatedAt: "2023-06-29T07:53:37.018Z",
    },
    {
      createdAt: "2023-06-28T08:40:55.959Z",
      eyecatch: {
        height: 1440,
        src: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/8dfd3b6f333041cbb4f709fd86cc1bf6/d0e0d3fa-3d5d-4ab6-8a3b-32ba2d4cbe7f_keymusic.jpeg",
        width: 2560,
      },
      gallery: [],
      id: "3od5wag4ti",
      kinds: ["Campaign"],
      publishedAt: "2023-06-28T08:49:04.818Z",
      revisedAt: "2023-06-29T07:53:47.158Z",
      title: "MUSICLAND KEY",
      updatedAt: "2023-06-29T07:53:47.158Z",
    },
    {
      createdAt: "2023-06-28T08:38:27.887Z",
      eyecatch: {
        height: 1260,
        src: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/6d83196494eb48f3aad58bf1b924ed96/6be07dd8-49db-4fa5-8186-5e45104f4888_bigi.jpg",
        width: 2240,
      },
      gallery: [],
      id: "pgsk4rr0op",
      kinds: ["Corporate"],
      publishedAt: "2023-06-28T08:49:53.474Z",
      revisedAt: "2023-06-29T07:54:17.605Z",
      title: "BIGI",
      updatedAt: "2023-06-29T07:54:17.605Z",
    },
  ],
};

export const render = (props: any) => {
  const posts = props.data;

  return `<!DOCTYPE html>
  ${r(
    <PageWithHeader header={<Header />}>
      <Content>
        <main data-component="home">
          <div css={intro} data-ref="intro" data-scroll-item>
            <div css={intro__body}>
              <h1>Developer</h1>
            </div>
            <canvas
              className="inset-0 w-full h-full pointer-events-none absolute"
              data-ref="introCanvas"
            ></canvas>
          </div>
          <div className="mt-[8rem] | sm:mt-[12rem]" css={projects}>
            {posts.map((post: WorkMetadata, index: number) => {
              return (
                <div
                  className={`mb-[8rem] | sm:mb-[12rem] ${
                    (index + 1) % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                  css={project}
                  key={post.id}
                  data-scroll-item
                >
                  <div className="mb-[2rem] | sm:mb-0" css={project__eyecatch}>
                    <img
                      alt=""
                      data-pc-src={`${post.eyecatch.src}?auto=compress,format`}
                      data-ref="plane"
                      data-sp-src={`${post.eyecatch.src}?auto=compress,format&fit=crop&w=750&h=750`}
                      decoding="async"
                      src={`${post.eyecatch.src}?auto=compress,format`}
                      width={post.eyecatch.width}
                      height={post.eyecatch.height}
                    />
                  </div>
                  <div css={project__body}>
                    <h3 css={heading}>{post.title}</h3>
                    <p className="mt-[.5em] | sm:mt-0" css={text}>
                      {post.kinds[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </Content>
    </PageWithHeader>
  )}`;
};

const intro = css`
  height: calc(100vh - 3rem);
  height: calc(100svh - 3rem);
  overflow: hidden;
  border-radius: 1rem;
  margin: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;

  @media (min-width: 640px) {
    border-radius: 2rem;
    margin: 3rem 2rem;
  }
`;

const intro__body = css`
  position: absolute;
  left: var(--grid);
  bottom: calc(var(--grid) * 1.5);
  font-size: 4.8rem;
  font-weight: 100;
  line-height: 1;
  letter-spacing: -0.02em;
  position: absolute;
  z-index: 2;

  @media (min-width: 640px) {
    left: calc(var(--grid) + var(--gap) - 3rem);
    bottom: var(--grid);
  }
`;

const projects = css`
  padding: 0 calc(var(--grid) + var(--gap));

  @media (min-width: 640px) {
    // display: flex;
  }
`;

const project = css`
  @media (min-width: 640px) {
    display: flex;
    gap: var(--gap);
  }
`;

const project__eyecatch = css`
  aspect-ratio: 1 / 1;

  @media (min-width: 640px) {
    aspect-ratio: unset;
    width: calc(var(--grid) * 5);
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    visibility: hidden;
  }
`;

const project__body = css`
  text-align: center;

  @media (min-width: 640px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 1.5rem;
    text-align: left;
  }
`;

const heading = css`
  font-size: 2.4rem;
  font-weight: 200;
  letter-spacing: 0.1em;
  line-height: 1.05;

  @media (min-width: 640px) {
    font-size: 3.6rem;
    margin-bottom: -0.1em;
  }
`;

const text = css`
  font-size: 1.2rem;
  line-height: 1;
  opacity: 0.3;

  @media (min-width: 640px) {
    font-size: 1.4rem;
  }
`;
