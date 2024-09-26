import { Linkable } from "~/_components/ui/link";

export const WorkBack: React.FC = () => {
  return (
    <Linkable
      className={`backface-hidden text-[1.1rem] leading-[1] overflow-hidden p-[2rem] tracking-[.04em]
      | fixed top-[1.2rem] z-[9] left-[calc(var(--grid)_-2rem)]
      | pc:text-[1.2rem] pc:left-[6rem] pc:top-[5rem]`}
      data-ref="back"
      href="../"
    >
      {[..."Back"].map((c, index) => (
        <span aria-hidden="true" className="inline-block relative overflow-hidden" key={index}>
          <span className="inline-block" data-ref="c">
            <span className="inline-block relative">{c}</span>
            <span className="inline-block absolute top-[100%] left-0">{c}</span>
          </span>
        </span>
      ))}
      <span className="sr-only">back</span>
    </Linkable>
  );
};
