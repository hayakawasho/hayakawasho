import type { WorkDTO } from "../../../_models/work/dto";

const MAX_W = 2400;

export default function Component({ metadata }: { metadata: WorkDTO }) {
  return (
    <div
      className="relative pc:flex h-full overflow-auto"
      data-ref="screenshots"
    >
      <div className="h-full w-full flex-shrink-0">
        <img
          className="h-full pc:h-[var(--100vh)] pc:w-[calc(var(--grid)*7)] object-cover object-top"
          src={`${metadata.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > metadata.thumb.width ? metadata.thumb.width : MAX_W}`}
          width={metadata.thumb.width}
          height={metadata.thumb.height}
          alt=""
          data-ref="screenshotItem"
        />
      </div>
      <div className="relative flex h-full pc:w-auto w-full flex-shrink-0 pc:flex-row flex-col overflow-hidden">
        {metadata.screenshots.map((i, index) => (
          <div
            key={index}
            className="pc:static absolute pc:my-0 flex h-full pc:w-auto w-full flex-shrink-0 items-center"
          >
            <img
              className="flex aspect-square pc:aspect-auto h-full pc:h-[var(--100vh)] pc:w-auto bg-[#000] object-contain pc:px-0 px-[var(--grid)]"
              src={`${i.src}?auto=compress,format&fm=avif&w=${MAX_W > i.width ? i.width : MAX_W}`}
              width={i.width}
              height={i.height}
              alt=""
              data-ref="screenshotItem"
            />
          </div>
        ))}
      </div>
      <div className="h-full w-full flex-shrink-0">
        <img
          className="h-full pc:h-[var(--100vh)] pc:w-[calc(var(--grid)*7)] object-cover object-top"
          src={`${metadata.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > metadata.thumb.width ? metadata.thumb.width : MAX_W}`}
          width={metadata.thumb.width}
          height={metadata.thumb.height}
          alt=""
          loading="lazy"
          data-ref="screenshotItem"
        />
      </div>
    </div>
  );
}
