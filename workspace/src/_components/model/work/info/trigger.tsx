export function WorkInfoTrigger() {
  return (
    <button
      type="button"
      className={"my-[-1rem] mr-[-1rem] px-[1rem] py-[1rem] text-right font-[450] text-[1.4rem] leading-[1.2]"}
      data-ref="infoTrigger"
    >
      <span className="relative block w-[5rem] overflow-hidden">
        <span className="block transform-gpu" data-ref="infoTriggerLabel">
          <span aria-hidden="true" className="inline-block w-[.35em] text-center">
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
          <span className="absolute block w-full uppercase tracking-[.02em]">Close</span>
        </span>
      </span>
    </button>
  );
}
