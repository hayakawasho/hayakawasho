export default function Component({ name }: { name: string }) {
  return (
    <h1 className="overflow-hidden font-[450] text-[1.4rem] leading-[1.2] tracking-[.04em]">
      <span className="block transform-gpu" data-ref="title">
        {name}
      </span>
    </h1>
  );
}
