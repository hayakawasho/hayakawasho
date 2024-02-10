import { Header } from '../header/view';
import { PageWrapper } from '../page-wrapper';

const Component = () => {
  return (
    <PageWrapper header={<Header current="home" />} namespace="">
      <div data-scroll-item></div>
    </PageWrapper>
  );
};

export default Component;
