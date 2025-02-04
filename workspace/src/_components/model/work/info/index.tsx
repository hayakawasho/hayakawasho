import { Slot } from "@radix-ui/react-slot";
import { WorkPresenter } from "../../../../_models/work/presenter";
import type { WorkDTO } from "../../../../_models/work/dto";

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <dl className="flex justify-between">
      <dt className="text-[1rem] font-[350] opacity-50 | pc:text-[1.1rem]">
        <span className="inline-block uppercase" data-ref="infoText">
          {label}
        </span>
      </dt>
      <dd className="text-[1.1rem] tracking-[.02em] font-[350] | pc:text-[1.2rem]">{children}</dd>
    </dl>
  );
}

function Content({ children, asChild, ...props }: { children: React.ReactNode; asChild?: true }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp {...props} data-ref="infoText" className="inline-block">
      {children}
    </Comp>
  );
}

export function WorkInfo({ metadata }: { metadata: WorkDTO }) {
  const { launchDateTime, launch, siteUrl } = WorkPresenter.complete(metadata);

  return (
    <div className="grid gap-[1rem]">
      <Item label="(Category)">
        <Content>{metadata.category}</Content>
      </Item>
      <Item label="(Date)">
        <Content asChild>
          <time dateTime={launchDateTime}>{launch}</time>
        </Content>
      </Item>
      {metadata.siteUrl && (
        <Item label="(Url)">
          <Content asChild>
            <a href={metadata.siteUrl} target="_blank" className="">
              <span className="underline">{siteUrl}</span>
              <span className="text-[90%] ml-[.5em]">↗</span>
            </a>
          </Content>
        </Item>
      )}
    </div>
  );
}
