import { Header } from "../header/view";
import { PageWrapper } from "../page-wrapper/view";
import { Link } from "../ui/link";

const Component = () => {
  return (
    <PageWrapper header={<Header current="home" />} namespace="">
      <div data-scroll-item className="flex items-center justify-center h-full fixed w-full">
        <h1 className="text-[2.5rem]">
          <Link to="./works/" swap="swap:0s">
            Work In Progress 🙅
          </Link>
        </h1>
      </div>
    </PageWrapper>
  );
};

export default Component;
