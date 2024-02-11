import type { RouteName } from "@/_foundation/type";

export const Header = ({ current }: { current: RouteName }) => {
  return (
    <>
      <header data-component="NavMenu" data-current={current}>
        <div data-ref="menu"></div>
      </header>
    </>
  );
};
