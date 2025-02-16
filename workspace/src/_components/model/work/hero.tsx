import { Fragment } from "react";
import type { WorkDTO } from "../../../_models/work/dto";
import { Image } from "./image";

const MAX_W = 1675;

export function WorkHero({ posts }: { posts: WorkDTO[] }) {
  return (
    <div className="relative size-full">
      <ul className="">
        {posts.map((i) => (
          <li className="h-[var(--100vh)] overflow-hidden" key={i.id}>
            <a href={`/work/${i.id}/`}>
              <img
                className="h-full pc:h-fit pc:min-h-[var(--100vh)] w-full object-cover"
                src={`${i.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > i.thumb.width ? i.thumb.width : MAX_W}`}
                width={i.thumb.width}
                height={i.thumb.height}
                alt={i.name}
              />
            </a>
          </li>
        ))}
      </ul>
      <div className="fixed pc:top-1/2 bottom-[3.2rem] pc:bottom-auto left-1/2 pc:left-3/4">
        <ul className="-ml-[2.4rem] pc:-translate-x-1/2 pc:-translate-y-1/2 pc:ml-0 flex pc:grid pc:aspect-[4/5] pc:w-[calc(var(--grid)+var(--gap))] w-full pc:min-w-[12rem] gap-[.8rem]">
          {posts.map((i) => (
            <li
              key={i.id}
              className={`pc:absolute pc:w-fit w-[4.8rem] overflow-hidden pc:rounded-none rounded-[.2rem] ${i.id === posts[0].id ? "pc:z-10" : ""}`}
            >
              <div className="relative size-full">
                <img
                  src={`${i.thumb.src}?auto=compress,format&fm=avif&w=300`}
                  alt=""
                  className="h-full pc:h-fit w-full"
                  width={i.thumb.width}
                  height={i.thumb.height}
                  loading="lazy"
                />
                {i.screenshots.map((j, index) => (
                  <Fragment key={index}>
                    <img
                      src={`${j.src}?auto=compress,format&fm=avif&w=300`}
                      alt=""
                      className="absolute top-0 left-0 aspect-[4/5] h-full pc:h-fit w-full bg-[#000] object-contain px-[1.6rem] max-pc:hidden"
                      width={j.width}
                      height={j.height}
                      loading="lazy"
                    />
                  </Fragment>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
