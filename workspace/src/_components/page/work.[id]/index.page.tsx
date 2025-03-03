import type { WorkDTO } from "../../../_models/work/dto";
import ContentLayout from "../../ui/layout";
// import { Header } from "../../ui/layout/header";
import Info from "./info";
import InfoDialog from "./info/dialog";
import InfoTrigger from "./info/trigger";
import * as WorkLayout from "./layout";
import Screenshot from "./screenshots";

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
      asChild
    >
      <main data-component="WorkSingle">
        <h1 className="sr-only">{currentPost.name}</h1>
        <WorkLayout.Wrap>
          <WorkLayout.Head>
            <WorkLayout.HGroup>
              <InfoTrigger />
            </WorkLayout.HGroup>
            <WorkLayout.Info>
              <Info metadata={currentPost} />
            </WorkLayout.Info>
          </WorkLayout.Head>
          <WorkLayout.Content>
            <Screenshot post={currentPost} />
          </WorkLayout.Content>
        </WorkLayout.Wrap>
        <InfoDialog post={currentPost} />
      </main>
    </ContentLayout>
  );
}
