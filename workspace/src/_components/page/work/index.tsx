import { Header } from "~/_components/ui/header";
import { PageLayout } from "~/_components/ui/layout";
import { Linkable } from "~/_components/ui/link";
import { IMG_API } from "~/_foundation/const";
import { cn } from "~/_foundation/libs/cn";
import { zeroPadding } from "~/_foundation/utils";
import Styles from "./index.module.scss";
import type { WorkMetadata } from "~/(work)/model";

const Component: React.FC<{
  posts: WorkMetadata[];
}> = ({ posts }) => {
  const totalPost = posts.length;

  return (
    <PageLayout header={<Header current="work" />} namespace="work">
      <main className="h-full" data-component="Work">
        <h1 className="sr-only">Works</h1>
        <div
          className="fixed z-[2] bottom-[7rem] left-[8rem] text-[1.2rem] tracking-[.04em] mix-blend-difference text-[--color-bg] overflow-hidden
          | dark:text-[--color-text]
          | sp:hidden"
        >
          <span className="inline-block" data-ref="counter">
            <span className="" data-ref="now">
              {zeroPadding(0)}
            </span>
            <span className="mx-[.5em] opacity-50">/</span>
            <span className="opacity-50">{zeroPadding(totalPost)}</span>
          </span>
        </div>
        <div
          className="fixed z-[2] bottom-[7rem] right-[8rem] text-[1.2rem] mix-blend-difference opacity-50 uppercase text-[--color-bg]
          | dark:text-[--color-text]
          | sp:hidden"
        >
          (Scroll)
        </div>
        <div className="w-full h-full fixed z-[2] mix-blend-difference" aria-hidden="true">
          {[posts[4]].map((post, index) => (
            <div
              aria-hidden="true"
              className="w-[28rem] aspect-[4/5] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              key={index}
              data-ref="workThumb"
              data-height={post.thumbnail.height}
              data-src={post.thumbnail.src + IMG_API + "&w=720"}
              data-width={post.thumbnail.width}
            />
          ))}
          <ul className={Styles.workItems} data-ref="workItems">
            {posts.map((post, index) => (
              <li className={Styles.workItem} data-ref="scrollItem" key={index}>
                <Linkable className={Styles.workItem__g} href={`./${post.id}/`} data-ref="workItem">
                  <h2 className={cn(Styles.workItem__title, "__pl-[0.05em]")} data-ref="workTitle">
                    <span className={Styles.workItem__index}>
                      <span className="inline-block" data-ref="workNo">
                        ({zeroPadding(totalPost - index)})
                      </span>
                    </span>
                    {post.title}
                  </h2>
                </Linkable>
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.workItem} data-ref="scrollItem" key={index}>
                <Linkable className={Styles.workItem__g} href={`./${post.id}/`} data-ref="workItem">
                  <h2 className={cn(Styles.workItem__title, "__pl-[0.05em]")} data-ref="workTitle">
                    <span className={Styles.workItem__index}>
                      <span className="inline-block" data-ref="workNo">
                        ({zeroPadding(totalPost - index)})
                      </span>
                    </span>
                    {post.title}
                  </h2>
                </Linkable>
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.workItem} data-ref="scrollItem" key={index}>
                <Linkable className={Styles.workItem__g} href={`./${post.id}/`} data-ref="workItem">
                  <h2 className={cn(Styles.workItem__title, "__pl-[0.05em]")} data-ref="workTitle">
                    <span className={Styles.workItem__index}>
                      <span className="inline-block" data-ref="workNo">
                        ({zeroPadding(totalPost - index)})
                      </span>
                    </span>
                    {post.title}
                  </h2>
                </Linkable>
              </li>
            ))}
            {posts.map((post, index) => (
              <li aria-hidden="true" className={Styles.workItem} data-ref="scrollItem" key={index}>
                <Linkable className={Styles.workItem__g} href={`./${post.id}/`} data-ref="workItem">
                  <h2 className={cn(Styles.workItem__title, "__pl-[0.05em]")} data-ref="workTitle">
                    <span className={Styles.workItem__index}>
                      <span className="inline-block" data-ref="workNo">
                        ({zeroPadding(totalPost - index)})
                      </span>
                    </span>
                    {post.title}
                  </h2>
                </Linkable>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </PageLayout>
  );
};

export default Component;
