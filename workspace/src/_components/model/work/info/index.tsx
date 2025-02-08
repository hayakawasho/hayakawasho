import { Slot } from "@radix-ui/react-slot";
import type { WorkDTO } from "../../../../_models/work/dto";
import { WorkPresenter } from "../../../../_models/work/presenter";

function Item({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <dl className="flex pc:flex-row flex-col pc:justify-between">
      <dt className="font-[400] pc:text-[1.1rem] text-[1.1rem] pc:opacity-50">
        <span className="inline-block uppercase" data-ref="infoText">
          {label}
        </span>
      </dt>
      <dd className="font-[400] pc:text-[1.2rem] text-[1.3rem]">{children}</dd>
    </dl>
  );
}

function Content({
  children,
  asChild,
  ...props
}: {
  children: React.ReactNode;
  asChild?: true;
}) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp {...props} data-ref="infoText" className="inline-block">
      {children}
    </Comp>
  );
}

export function WorkInfo({ metadata }: { metadata: WorkDTO }) {
  const { launchDateTime, launch, siteUrl } = WorkPresenter.toWorkSingle(metadata);

  return (
    <div className="grid gap-[1.2rem] pc:gap-[1rem] pc:text-left text-center">
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
            <a href={metadata.siteUrl} target="_blank" className="" rel="noreferrer">
              <span className="underline">{siteUrl}</span>
            </a>
          </Content>
        </Item>
      )}
      <Item label="(Stack)">
        <Content>{metadata.stacks.join(",")}</Content>
      </Item>
    </div>
  );
}
