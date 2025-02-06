export function WorkInfoTrigger() {
  return (
    <button
      type="button"
      className={"relative w-[5rem] overflow-hidden rounded-full text-right font-[450] text-[1.3rem]"}
    >
      <span className="relative block">
        <span className="block">
          <span aria-hidden="true" className="inline-block w-[.4em]">
            I
          </span>
          <span aria-hidden="true" className="tracking-[.02em]">
            N
          </span>
          <span aria-hidden="true" className="">
            F
          </span>
          <span aria-hidden="true" className="">
            O
          </span>
          <span className="sr-only">Info</span>
        </span>
        <span className="absolute block w-full uppercase tracking-[.02em]">Close</span>
      </span>
    </button>
  );
}
