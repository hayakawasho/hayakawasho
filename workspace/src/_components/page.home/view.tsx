import { Header } from '~/_components/layout/header';
import { PageWithHeader } from '~/_components/layout/page-with-header';

const Component = () => {
  return (
    <PageWithHeader header={<Header current="home" />} namespace="">
      <div></div>
    </PageWithHeader>
  );
};

export default Component;
