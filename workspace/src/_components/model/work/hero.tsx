import { Fragment } from "react";
import type { WorkDTO } from "../../../_models/work/dto";
import { Image } from "./image";

export function WorkHero({ posts }: { posts: WorkDTO[] }) {
  return (
    <div className="relative size-full">
      <ul className="">
        {posts.map((i) => (
          <li className="h-[var(--100vh)] overflow-hidden" key={i.id}>
            <a href={`/work/${i.id}/`}>
              <Image className="h-full pc:h-fit pc:min-h-[var(--100vh)] w-full object-cover" metadata={i.thumb} />
            </a>
          </li>
        ))}
      </ul>
      <div className="fixed pc:top-1/2 bottom-[3.2rem] pc:bottom-auto left-1/2 pc:left-3/4">
        <ul className="-ml-[2.4rem] pc:-translate-x-1/2 pc:-translate-y-1/2 pc:ml-0 flex pc:grid pc:aspect-[4/5] pc:w-[calc(var(--grid)+var(--gap))] w-full pc:min-w-[12rem] gap-[.6rem]">
          {posts.map((i, index) => (
            <li
              key={i.id}
              className={`pc:absolute pc:w-fit w-[4.8rem] overflow-hidden rounded-[.2rem] ${index === 0 ? "pc:z-10" : ""}`}
            >
              <div className="relative size-full">
                <Image className="h-full pc:h-fit w-full" metadata={i.thumb} width={300} />
                {i.screenshots.map((j, index) => (
                  <Fragment key={index}>
                    <img
                      src={`${j.src}?auto=compress,format&fm=avif&w=300`}
                      alt=""
                      className="absolute top-0 left-0 aspect-[4/5] h-full pc:h-fit w-full bg-[#000] object-contain px-[2.4rem] max-pc:hidden"
                      width={j.width}
                      height={j.height}
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
