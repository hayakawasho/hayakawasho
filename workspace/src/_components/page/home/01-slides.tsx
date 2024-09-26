import { Linkable } from "~/_components/ui/link";
import { IMG_API } from "~/_foundation/const";
import type { WorkMetadata } from "~/(work)/model";

const Component: React.FC<{
  posts: WorkMetadata[];
}> = ({ posts }) => {
  return (
    <>
      <div className="fixed top-1/2 left-[--gap] mt-[calc(5rem*1.25/2*-1)] | sp:hidden" data-ref="workThumbs">
        {posts.map((post, index) => (
          <img
            className="w-[5rem] aspect-[4/5]"
            key={index}
            data-ref="workThumb"
            data-height={post.thumbnail.height}
            data-src={post.thumbnail.src + IMG_API + "&w=720"}
            data-width={post.thumbnail.width}
            src={post.thumbnail.src + IMG_API + "&w=720"}
          />
        ))}
      </div>
      <div className="w-full h-full z-[2] relative">
        <ul
          className={`grid justify-center py-[calc(var(--grid)*9*1.25/2)]
          | pc:py-[calc(50svh-min(var(--grid)*4,540px)*1.25/2)]`}
          data-ref="workItems"
        >
          {posts.map((post, index) => (
            <li className="" key={index}>
              <Linkable className="" href={`/work/${post.id}/`}>
                <div
                  className="w-[calc(var(--grid)*9)] aspect-[4/5] object-cover
                  | pc:w-[calc(var(--grid)*4)] pc:max-w-[540px]"
                  data-ref="workItem"
                  data-height={post.thumbnail.height}
                  data-src={post.thumbnail.src + IMG_API + "&w=720"}
                  data-width={post.thumbnail.width}
                />
              </Linkable>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Component;
