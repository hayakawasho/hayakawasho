export function WorkInfoToggle() {
  return (
    <button className="overflow-hidden absolute bottom-[4rem] left-[--gap] border-solid border-[1px] border-current rounded-full my-[--leading-trim] w-[5.4rem] text-[1.2rem] leading-[1.2] text-center | pc:hidden">
      <span className="h-[1.2em] block">
        <span className="flex justify-center">
          <span aria-hidden="true" className="w-[.5em] inline-block">
            I
          </span>
          <span aria-hidden="true" className="tracking-[.08em]">
            N
          </span>
          <span aria-hidden="true">F</span>
          <span aria-hidden="true" className="tracking-[.04em]">
            O
          </span>
          <span className="sr-only">Info</span>
        </span>
        <span className="tracking-[.04em] uppercase">Close</span>
      </span>
    </button>
  );
}
