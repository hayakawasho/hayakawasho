import { Header } from '~/_features/header/view';
import { PageWrapper } from '~/_features/layout/page-wrapper';

const Component = () => {
  return (
    <PageWrapper header={<Header current="home" />} namespace="">
      <div></div>
    </PageWrapper>
  );
};

export default Component;
