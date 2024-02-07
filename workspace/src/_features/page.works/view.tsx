import { Header } from '~/_features/header/view';
import { PageWrapper } from '~/_features/layout/page-wrapper';

const Component = () => {
  return (
    <PageWrapper header={<Header current="works" />} namespace="">
      <div className=""></div>
    </PageWrapper>
  );
};

export default Component;
