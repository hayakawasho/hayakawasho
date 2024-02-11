import { Header } from "../header/view";
import { PageWrapper } from "../page-wrapper/view";

const Component = () => {
  return (
    <PageWrapper header={<Header current="home" />} namespace="">
      <div data-scroll-item className="flex items-center justify-center h-screen">
        <h1 className="text-[2.5rem]">Work In Progress 🙅</h1>
      </div>
    </PageWrapper>
  );
};

export default Component;
