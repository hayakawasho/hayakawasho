import { Linkable } from "~/_components/ui/link";
import Styles from "./index.module.scss";
import { zeroPadding } from "~/_foundation/utils";
import type { WorkMetadata } from "~/(work)/model";

const Component: React.FC<{
  posts: WorkMetadata[];
  totalPost: number;
}> = ({ posts, totalPost }) => {
  return (
    <>
      <div
        className="fixed z-[2] bottom-[7rem] left-[8rem] text-[1.2rem] mix-blend-difference opacity-50 uppercase text-[--color-bg]
          | dark:text-[--color-text]
          | sp:hidden"
      >
        (Scroll)
      </div>
      <div className="w-full h-full fixed z-[2] mix-blend-difference" aria-hidden="true">
        <ul className={Styles.workItems} data-ref="workItems">
          {posts.map((post, index) => (
            <li className={Styles.workItem} data-ref="scrollItem" key={index}>
              <Linkable className={Styles.workItem__g} href={`/work/${post.id}/`} data-ref="workItem">
                <h2 className={Styles.workItem__title} data-ref="workTitle">
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
              <Linkable className={Styles.workItem__g} href={`/work/${post.id}/`} data-ref="workItem">
                <h2 className={Styles.workItem__title} data-ref="workTitle">
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
              <Linkable className={Styles.workItem__g} href={`/work/${post.id}/`} data-ref="workItem">
                <h2 className={Styles.workItem__title} data-ref="workTitle">
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
              <Linkable className={Styles.workItem__g} href={`/work/${post.id}/`} data-ref="workItem">
                <h2 className={Styles.workItem__title} data-ref="workTitle">
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
    </>
  );
};

export default Component;
