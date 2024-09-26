import { cn } from "~/_foundation/libs";
import Styles from "./style.module.scss";
import type { WorkMetadata } from "~/(work)/model";

export const WorkNext: React.FC<{
  nextPost: WorkMetadata;
}> = ({ nextPost }) => {
  return (
    <>
      <aside data-ref="next" className="">
        <div className={Styles.next} data-ref="nextProject"></div>
      </aside>

      {
        // <aside data-ref="next" className="">
        //   <div className={Styles.next} data-ref="nextProject">
        //     <Link className={Styles.next__hgroup} to={`../${nextPost.id}/`} data-ref="nextLink">
        //       <h2 className={cx(Styles.next__heading, "!pc:text-center mt-[-.05em] mb-[10rem]")}>
        //         {nextPost.title}
        //       </h2>
        //     </Link>
        //   </div>
        // </aside>
      }
    </>
  );
};
