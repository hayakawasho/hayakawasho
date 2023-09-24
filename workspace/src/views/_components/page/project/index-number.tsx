export const IndexNumber = ({ now, max }: { now: string; max: string }) => {
  return (
    <>
      <span className="inline-block" data-ref="now">
        {now}
      </span>
      <span
        className="relative top-[-1px] inline-block mx-[.4em]"
        data-ref="dash"
      >
        —
      </span>
      <span className="inline-block" data-ref="max">
        {max}
      </span>
    </>
  );
};
