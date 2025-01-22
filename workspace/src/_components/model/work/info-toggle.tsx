export function WorkInfoToggle() {
  return (
    <button className="overflow-hidden absolute z-10 top-[4rem] right-[--grid] border-solid border-[1px] border-current rounded-full w-[5.4rem] text-[1.2rem] leading-[1.3] text-center | pc:hidden">
      <span className="h-[1.3em] block">
        <span className="flex justify-center">
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
        <span className="tracking-[.04em] uppercase">Close</span>
      </span>
    </button>
  );
}
