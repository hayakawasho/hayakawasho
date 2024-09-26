import { cn } from "~/_foundation/libs/cn";
import type { WorkMetadata } from "~/(work)/model";

export const WorkScreenshots: React.FC<{
  screenshots: WorkMetadata["screenshots"];
  className?: string;
}> = ({ screenshots, className }) => {
  return (
    <ul
      className={cn(
        `backface-hidden flex flex-col gap-[2.4rem] mx-auto w-[calc(var(--grid)*10)]
        | pc:gap-[10rem] pc:max-w-[128rem] pc:w-[calc(var(--grid)*7)]`,
        className,
      )}
      data-ref="screenshots"
    >
      {screenshots.map((i, index) => {
        return (
          <li className="" key={index}>
            <img
              alt=""
              className="pointer-events-none invisible w-full"
              data-height={i.height}
              data-ref="screenshotItem"
              data-src={i.src}
              data-width={i.width}
              height={i.height}
              width={i.width}
            />
          </li>
        );
      })}
    </ul>
  );
};
