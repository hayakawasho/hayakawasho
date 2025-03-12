import type { WorkDTO } from "../../../_models/work/dto";

const MAX_W = 2400;

export default function Component({ metadata }: { metadata: WorkDTO }) {
  return (
    <div
      className="relative pc:flex h-full overflow-hidden"
      data-ref="screenshots"
    >
      <div className="h-full w-full flex-shrink-0 transform-gpu">
        <div
          className="h-full pc:h-[var(--100vh)] pc:w-[calc(var(--grid)*7)] "
          data-ref="screenshotItem"
        >
          <img
            className="backface-hidden pointer-events-none pc:invisible size-full object-cover object-top"
            data-src={`${metadata.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > metadata.thumb.width ? metadata.thumb.width : MAX_W}`}
            src={`${metadata.thumb.src}?auto=compress,format&fm=avif&w=750`}
            data-width={metadata.thumb.width}
            data-height={metadata.thumb.height}
            data-ref="plane"
            width={metadata.thumb.width}
            height={metadata.thumb.height}
            alt=""
          />
        </div>
      </div>
      <div className="relative flex h-full pc:w-auto w-full flex-shrink-0 pc:flex-row flex-col">
        {metadata.screenshots.map((i, index) => (
          <div
            key={index}
            className="pc:static absolute pc:my-0 flex h-full pc:w-auto w-full flex-shrink-0 transform-gpu items-center"
          >
            <div
              className="h-full pc:h-[var(--100vh)]"
              data-ref="screenshotItem"
            >
              <img
                className="backface-hidden pointer-events-none pc:invisible aspect-square pc:aspect-auto h-full pc:h-[var(--100vh)] pc:w-auto bg-[#000] object-contain pc:px-0 px-[var(--grid)]"
                data-src={`${i.src}?auto=compress,format&fm=avif&w=${MAX_W > i.width ? i.width : MAX_W}`}
                src={`${i.src}?auto=compress,format&fm=avif&w=750`}
                data-width={i.width}
                data-height={i.height}
                data-ref="plane"
                width={i.width}
                height={i.height}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
      <div className="h-full w-full flex-shrink-0 transform-gpu">
        <div
          data-ref="screenshotItem"
          className="h-full pc:h-[var(--100vh)] pc:w-[calc(var(--grid)*7)]"
        >
          <img
            className="backface-hidden pointer-events-none pc:invisible size-full object-cover object-top"
            data-src={`${metadata.thumb.src}?auto=compress,format&fm=avif&w=${MAX_W > metadata.thumb.width ? metadata.thumb.width : MAX_W}`}
            src={`${metadata.thumb.src}?auto=compress,format&fm=avif&w=750`}
            data-width={metadata.thumb.width}
            data-height={metadata.thumb.height}
            data-ref="plane"
            width={metadata.thumb.width}
            height={metadata.thumb.height}
            alt=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
