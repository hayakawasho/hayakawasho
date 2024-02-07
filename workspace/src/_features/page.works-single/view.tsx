import { Header } from '../header/view';
import { PageWrapper } from '../page-wrapper';

const Component = () => {
  return (
    <PageWrapper header={<Header current="works" />} namespace="">
      <div className=""></div>
    </PageWrapper>
  );
};

export default Component;
