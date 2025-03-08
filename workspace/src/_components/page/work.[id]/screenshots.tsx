import type { WorkDTO } from "../../../_models/work/dto";

const MAX_W = 2560;

export default function Component({ post }: { post: WorkDTO }) {
  return (
    <div className="relative pc:flex h-full overflow-auto">
      <div className="h-full w-full flex-shrink-0">
        <img
          className="h-full pc:h-[var(--100vh)] pc:w-[calc(var(--grid)*7)] object-cover object-top"
          src={`${post.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > post.thumb.width ? post.thumb.width : MAX_W}`}
          width={post.thumb.width}
          height={post.thumb.height}
          alt=""
        />
      </div>
      <div className="flex flex-shrink-0 pc:flex-row flex-col h-full w-full pc:w-auto overflow-hidden relative">
        {post.screenshots.map((i, index) => (
          <div
            key={index}
            className="pc:my-0 flex h-full pc:w-auto w-full flex-shrink-0 items-center absolute pc:static"
          >
            <img
              className="flex aspect-square pc:aspect-auto h-full pc:h-[var(--100vh)] pc:w-auto bg-[#000] object-contain pc:px-0 px-[var(--grid)]"
              src={`${i.src}?auto=compress,format&fm=avif&w=${MAX_W > i.width ? i.width : MAX_W}`}
              width={i.width}
              height={i.height}
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="h-full w-full flex-shrink-0">
        <img
          className="h-full pc:h-[var(--100vh)] pc:w-[calc(var(--grid)*7)] object-cover object-top"
          src={`${post.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > post.thumb.width ? post.thumb.width : MAX_W}`}
          width={post.thumb.width}
          height={post.thumb.height}
          alt=""
          loading="lazy"
        />
      </div>
    </div>
  );
}
