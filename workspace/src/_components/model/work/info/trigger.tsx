export function WorkInfoTrigger() {
  return (
    <button
      className={`
        overflow-hidden rounded-full w-[5rem] text-[1.1rem] leading-[1.4] font-[450] my-[--leading-trim]
        | before:block before:absolute before:inset-0 before:rounded-full before:border-solid before:border-[1px] before:border-current
    `}
    >
      <span className="relative block">
        <span className="block">
          <span aria-hidden="true" className="w-[.4em] inline-block">
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
        <span className="absolute block w-full tracking-[.02em] uppercase">Close</span>
      </span>
    </button>
  );
}
