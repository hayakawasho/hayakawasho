export function WorkInfoTrigger() {
  return (
    <button
      className={`
      absolute z-10 top-[4rem] right-[--grid] overflow-hidden rounded-full w-[5.4rem] text-[1.2rem] h-[1.5em]
      | before:block before:absolute before:inset-0 before:rounded-full before:border-solid before:border-[1px] before:border-current
      | pc:hidden
    `}
    >
      <span className="relative block">
        <span className="block">
          <span aria-hidden="true" className="w-[.5em] inline-block">
            I
          </span>
          <span aria-hidden="true" className="tracking-[.08em]">
            N
          </span>
          <span aria-hidden="true" className="tracking-[.02em]">
            F
          </span>
          <span aria-hidden="true" className="">
            O
          </span>
          <span className="sr-only">Info</span>
        </span>
        <span className="absolute block w-full tracking-[.04em] uppercase">Close</span>
      </span>
    </button>
  );
}
