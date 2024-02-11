import cx from "clsx";
import React from "react";
import { IMAGIX_API } from "@/_foundation/const";
import Styles from "./index.module.scss";
import { Header } from "../header/view";
import { PageWrapper } from "../page-wrapper/view";
import { Link } from "../ui/link";
import { ResponsiveImage } from "../ui/responsive-image";
import type { WorkMetadata } from "@/_features/work/model";

const Component: React.FC<{
  posts: WorkMetadata[];
}> = ({ posts }) => {
  return (
    <PageWrapper header={<Header current="works" />} namespace="">
      <main className="h-full" data-component="Works">
        <div aria-hidden="true" data-scroll-item />
        <h1 className="sr-only">Works</h1>
        <div className={Styles.screen}>
          <ul data-ref="items">
            {posts.map(post => (
              <Item key={post.id} post={post} />
            ))}
            {posts.map(post => (
              <Item aria-hidden="true" key={post.id} post={post} />
            ))}
          </ul>
        </div>
      </main>
    </PageWrapper>
  );
};

const Item = ({ post, ...props }: { post: WorkMetadata }) => {
  return (
    <li
      {...props}
      className={Styles.listItem}
      data-h={post.eyecatch.height}
      data-ref="item"
      data-src={post.eyecatch.src + IMAGIX_API + "&w=1440"}
      data-w={post.eyecatch.width}
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
            spSrc={post.eyecatch.src + IMAGIX_API + "&fit=crop&w=100&h=100"}
          />
        </div>
        <h2 className={cx(Styles.item__title, "pl-[0.05em]")} data-ref="text">
          {post.title}
        </h2>
      </Link>
    </li>
  );
};

export default Component;
