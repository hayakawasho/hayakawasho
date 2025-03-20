import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({ posts }: { posts: WorkDTO[] }) {
  return (
    <ul
      className="relative flex pc:grid pc:aspect-[5/6] pc:w-[calc(var(--grid)+var(--gap))] w-full pc:min-w-[12rem] gap-[.8rem]"
      data-ref="heroThumbItems"
    >
      {posts.map((i) => (
        <li key={i.id} className={`pc:absolute aspect-[5/6] pc:w-full w-[4.8rem]`}>
          <div className="relative size-full" data-ref="heroThumbItem">
            <div className="absolute inset-0 h-full overflow-hidden" data-ref="heroThumbImageWrap">
              <img
                src={`${i.thumb.src}?auto=compress,format&fm=avif&w=300`}
                alt=""
                className="h-full w-full object-cover"
                width={i.thumb.width}
                height={i.thumb.height}
                data-ref="heroThumbImage"
              />
            </div>
            {i.screenshots.map((j, index) => (
              <div
                key={index}
                className="absolute inset-0 h-full overflow-hidden max-pc:hidden"
                data-ref="heroThumbImageWrap"
              >
                <img
                  src={`${j.src}?auto=compress,format&fm=avif&w=300`}
                  alt=""
                  className="size-full bg-[#000] object-contain px-[1.6rem]"
                  width={j.width}
                  height={j.height}
                  loading="lazy"
                  data-ref="heroThumbImage"
                />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
