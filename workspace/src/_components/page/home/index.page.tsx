import type { WorkDTO } from "../../../_models/work/dto";
import ContentLayout from "../../ui/layout";
// import { Header } from "../../ui/layout/header";
import Hero from "./hero";
import * as Layout from "./layout";
import HeroThumb from "./thumb";

export default function Component({ allPosts }: { allPosts: WorkDTO[] }) {
  return (
    <ContentLayout
      namespace="home"
      // header={<Header allPosts={allPosts} current={allPosts[0].id} />}
      header={<></>}
    >
      <main data-component="Home">
        <h1 className="sr-only">Sho Hayakawa Portfolio</h1>
        <Layout.Wrap>
          <Hero posts={allPosts} />
          <Layout.Content>
            <Layout.HeroThumb>
              <HeroThumb posts={allPosts} />
            </Layout.HeroThumb>
          </Layout.Content>
        </Layout.Wrap>
      </main>
    </ContentLayout>
  );
}
