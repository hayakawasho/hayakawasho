import { css } from "@emotion/react";
import { renderToStaticMarkup as r } from "react-dom/server";
import { Header } from "./_components/header";
import { Content } from "./_components/page-content";
import { PageWithHeader } from "./_components/page-with-header";

const posts = [
  {
    createdAt: "2023-06-28T08:38:58.561Z",
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/9059c234fb8442b5ac4152c2c35f90ec/7faf77c0-744d-43f7-af21-fc95b5067d2b_pksha.avif",
    },
    gallery: [],
    id: "8m_16_r1i",
    product: "Corporate",
    publishedAt: "2023-06-28T08:49:46.904Z",
    revisedAt: "2023-06-28T08:49:46.904Z",
    title: "PKSHA",
    updatedAt: "2023-06-28T09:44:52.477Z",
  },
  {
    createdAt: "2023-06-28T08:41:14.847Z",
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/9b50202c9d3145c1a41f11395f2a9254/ea6acc92-e926-4a69-98a0-4e1ab6437ae5_6%C3%971.avif",
    },
    gallery: [],
    id: "tc1hpsmfozzp",
    product: "Brand",
    publishedAt: "2023-06-28T08:48:59.985Z",
    revisedAt: "2023-06-28T08:48:59.985Z",
    title: "6x1 COPENHAGEN",
    updatedAt: "2023-06-28T08:48:59.985Z",
  },
  {
    createdAt: "2023-06-28T08:38:27.887Z",
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/0dac7fbd94a942aaae79634d2fe6a221/6be07dd8-49db-4fa5-8186-5e45104f4888_bigi.avif",
    },
    gallery: [],
    id: "pgsk4rr0op",
    product: "Corporate",
    publishedAt: "2023-06-28T08:49:53.474Z",
    revisedAt: "2023-06-28T08:49:53.474Z",
    title: "BIGI",
    updatedAt: "2023-06-28T09:44:28.871Z",
  },
  {
    createdAt: "2023-06-28T08:39:13.943Z",
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/1e1e2e2e0d054cc9ba1262d11a79b570/15b25b8e-1286-4ab7-94c2-9888289d3a0c_sakayori.avif",
    },
    gallery: [],
    id: "z5dydhvv47",
    product: "Brand",
    publishedAt: "2023-06-28T08:49:41.360Z",
    revisedAt: "2023-06-28T09:42:20.710Z",
    title: "g.sakayori.",
    updatedAt: "2023-06-28T09:46:11.607Z",
  },
  {
    createdAt: "2023-06-28T08:37:30.002Z",
    eyecatch: {
      url: "https://images.microcms-assets.io/assets/e0f3807533bb432c98a4403ce317e6d6/5601e53d1f254f129f6b32f1bb3e5242/1ee2902e-4008-4b60-a48d-4bde441d0be8_another_eden.avif",
    },
    gallery: [],
    id: "5yf98qb0p8",
    product: "Campaign",
    publishedAt: "2023-06-28T08:50:05.197Z",
    revisedAt: "2023-06-28T08:50:05.197Z",
    title: "ANOTHER EDEN",
    updatedAt: "2023-06-28T09:45:06.467Z",
  },
];

module.exports = class {
  data() {
    return {
      //
    };
  }

  render(_props: any) {
    return `<!DOCTYPE html>
    ${r(
      <PageWithHeader header={<Header />}>
        <Content>
          <main data-component="Home">
            <div css={intro}>
              <div css={intro__body}>
                <p>Developer</p>
              </div>
              <canvas data-ref="introCanvas"></canvas>
            </div>
            <div className="mt-[8rem] | sm:mt-[12rem]" css={projects}>
              {posts.map((post, index) => {
                return (
                  <div
                    className={`mb-[8rem] | sm:mb-[12rem] ${
                      (index + 1) % 2 === 0 ? "flex-row-reverse" : ""
                    }`}
                    css={project}
                    key={post.id}
                  >
                    <div
                      className="mb-[2rem] | sm:mb-0"
                      css={project__eyecatch}
                    >
                      <img
                        alt=""
                        data-ref="plane"
                        decoding="async"
                        src={post.eyecatch.url}
                      />
                    </div>
                    <div css={project__body}>
                      <h3 css={heading}>{post.title}</h3>
                      <p className="mt-[.5em] | sm:mt-0" css={text}>
                        {post.product}
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
  }
};

const intro = css`
  height: calc(100vh - 3rem);
  height: calc(100svh - 3rem);
  overflow: hidden;
  border-radius: 1rem;
  margin: 1.5rem 1rem;
  position: relative;
  display: flex;
  align-items: center;
`;

const intro__body = css`
  position: absolute;
  left: var(--grid);
  bottom: calc(var(--grid) * 1.5);
  font-size: 4.5rem;
  font-weight: 100;
  line-height: 1;
  letter-spacing: -0.02em;

  @media (min-width: 640px) {
    left: calc(var(--grid) + var(--gap));
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
  }
`;

const project__body = css`
  text-align: center;

  @media (min-width: 640px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
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
