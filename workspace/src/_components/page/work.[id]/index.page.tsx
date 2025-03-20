import type { WorkDTO } from "../../../_models/work/dto";
import ContentLayout from "../../ui/layout";
import InfoDialog from "./info/dialog";
// import { Header } from "../../ui/layout/header";
import Info from "./info/info";
import InfoTrigger from "./info/trigger";
import * as Layout from "./layout";
import Screenshots from "./screenshots";

export default function Component({
  allPosts,
  currentIndex,
}: {
  allPosts: WorkDTO[];
  currentIndex: number;
}) {
  const currentPost = allPosts[currentIndex];

  return (
    <ContentLayout
      namespace="work-single"
      // header={<Header allPosts={allPosts} current={currentPost.id} />}
      header={<></>}
    >
      <main data-component="WorkSingle">
        <h1 className="sr-only">{currentPost.name}</h1>
        <Layout.Wrap>
          <Layout.Head>
            <Layout.HGroup>
              <InfoTrigger />
            </Layout.HGroup>
            <Layout.Info>
              <Info metadata={currentPost} />
            </Layout.Info>
          </Layout.Head>
          <Layout.Content>
            <canvas
              className="pointer-events-none absolute inset-0 h-full w-full"
              data-ref="glWorkSingle"
            ></canvas>
            <Screenshots metadata={currentPost} />
          </Layout.Content>
        </Layout.Wrap>
        <InfoDialog metadata={currentPost} />
      </main>
    </ContentLayout>
  );
}
