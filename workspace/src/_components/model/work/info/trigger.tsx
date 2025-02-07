export function WorkInfoTrigger() {
  return (
    <button
      type="button"
      className={"relative w-[5rem] overflow-hidden rounded-full text-right font-[450] text-[1.4rem]"}
    >
      <span className="relative block">
        <span aria-hidden="true" className="inline-block w-[.4em] text-center">
          I
        </span>
        <span aria-hidden="true" className="tracking-[.04em]">
          N
        </span>
        <span aria-hidden="true" className="tracking-[.02em]">
          F
        </span>
        <span aria-hidden="true" className="">
          O
        </span>
        <span className="sr-only">Info</span>
        <span className="absolute block w-full uppercase tracking-[.04em]">Close</span>
      </span>
    </button>
  );
}
