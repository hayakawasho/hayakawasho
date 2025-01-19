import { Slot } from "@radix-ui/react-slot";
import { WorkPresenter } from "../../../_models/work/presenter";
import type { WorkDTO } from "../../../_models/work/dto";

export function Layout({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-[1rem]">{children}</div>;
}

export function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <dl className="flex justify-between">
      <dt className="opacity-50 text-[1rem] pc:text-[1.1rem]">
        <span className="inline-block uppercase" data-ref="infoText">
          {label}
        </span>
      </dt>
      <dd className="text-[1.1rem] tracking-[.04em] | pc:text-[1.2rem]">{children}</dd>
    </dl>
  );
}

export function Content({ children, asChild, ...props }: { children: React.ReactNode; asChild?: true }) {
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
    <Layout>
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
            <a href={metadata.siteUrl} target="_blank">
              {siteUrl}
              <span className="text-[90%] ml-[.5em]">↗</span>
            </a>
          </Content>
        </Item>
      )}
    </Layout>
  );
}
