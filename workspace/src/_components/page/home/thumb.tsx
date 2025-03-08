import type { WorkDTO } from "../../../_models/work/dto";

export default function Component({ posts }: { posts: WorkDTO[] }) {
  return (
    <ul className="relative flex pc:grid pc:aspect-[5/6] pc:w-[calc(var(--grid)+var(--gap))] w-full pc:min-w-[12rem] gap-[.8rem]">
      {posts.map((i) => (
        <li
          key={i.id}
          className={`pc:absolute aspect-[5/6] pc:w-full w-[4.8rem] ${i.id === posts[0].id ? "pc:z-10" : ""}`}
        >
          <div className="relative size-full">
            <div className="absolute inset-0 h-full overflow-hidden">
              <img
                src={`${i.thumb.src}?auto=compress,format&fm=avif&w=300`}
                alt=""
                className="h-full w-full object-cover"
                width={i.thumb.width}
                height={i.thumb.height}
                data-ref="heroThumb"
              />
            </div>
            {i.screenshots.map((j, index) => (
              <div
                key={index}
                className="absolute inset-0 h-full overflow-hidden max-pc:hidden"
              >
                <img
                  src={`${j.src}?auto=compress,format&fm=avif&w=300`}
                  alt=""
                  className="size-full bg-[#000] object-contain px-[1.6rem]"
                  width={j.width}
                  height={j.height}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
