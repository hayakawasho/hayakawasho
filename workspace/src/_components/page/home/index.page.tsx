import type { WorkDTO } from "../../../_models/work/dto";
import ContentLayout from "../../ui/layout";
// import { Header } from "../../ui/layout/header";
import Hero from "./hero";
import HeroThumb from "./hero/thumb";
import * as HomeLayout from "./layout";

export default function Component({ allPosts }: { allPosts: WorkDTO[] }) {
  return (
    <ContentLayout
      namespace="home"
      // header={<Header allPosts={allPosts} current={allPosts[0].id} />}
      header={<></>}
      asChild
    >
      <main data-component="Home">
        <h1 className="sr-only">Sho Hayakawa Portfolio</h1>
        <HomeLayout.Wrap>
          <Hero posts={allPosts} />
          <HomeLayout.Content>
            <HomeLayout.HeroThumb>
              <HeroThumb posts={allPosts} />
            </HomeLayout.HeroThumb>
          </HomeLayout.Content>
        </HomeLayout.Wrap>
      </main>
    </ContentLayout>
  );
}
