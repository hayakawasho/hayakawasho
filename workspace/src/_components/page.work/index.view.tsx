import cx from "clsx";
import React from "react";
import { IMG_API } from "~/_foundation/const";
import { zeroPadding } from "~/_foundation/utils";
import Styles from "./index.module.scss";
import { Header } from "../header/view";
import { PageWrapper } from "../page-wrapper/index.view";
import { Link } from "../ui/link";
import { ResponsiveImage } from "../ui/responsive-image";
import type { WorkMetadata } from "~/_components/work/model";

const Component: React.FC<{
  posts: WorkMetadata[];
}> = ({ posts }) => {
  const totalPost = posts.length;

  return (
    <PageWrapper header={<Header current="work" />} namespace="work">
      <main className="h-full" data-component="Work">
        <div aria-hidden="true" data-scroll-item />
        <h1 className="sr-only">Works</h1>
        <div className={Styles.screen}>
          <ul data-ref="items">
            {posts.map((post, index) => (
              <Item key={post.id} post={post} index={totalPost - index} />
            ))}
            {posts.map((post, index) => (
              <Item aria-hidden="true" key={post.id} post={post} index={totalPost - index} />
            ))}
          </ul>
        </div>
      </main>
    </PageWrapper>
  );
};

const Item = ({ post, index, ...props }: { post: WorkMetadata; index: number }) => {
  return (
    <li
      {...props}
      className={Styles.listItem}
      data-height={post.eyecatch.height}
      data-ref="item"
      data-src={post.eyecatch.src + IMG_API + "&w=1440"}
      data-width={post.eyecatch.width}
    >
      <Link className={Styles.item} to={`./${post.id}/`}>
        <div className={cx(Styles.item__thumb, "pc:hidden")}>
          <ResponsiveImage
            alt=""
            className="w-full h-full rounded-[50%]"
            data-ref="img"
            pcSize={[1, 1]}
            pcSrc="data:image/gif;base64,R0lGODlhAQABAGAAACH5BAEKAP8ALAAAAAABAAEAAAgEAP8FBAA7"
            spSize={[100, 100]}
            spSrc={post.eyecatch.src + IMG_API + "&fit=crop&w=100&h=100"}
          />
        </div>
        <p className={Styles.item__index}>
          <span className="inline-block" data-ref="index">
            ({zeroPadding(index + 1)})
          </span>
        </p>
        <h2 className={cx(Styles.item__title, "pl-[0.05em]")} data-ref="text">
          {post.title}
        </h2>
      </Link>
    </li>
  );
};

export default Component;
