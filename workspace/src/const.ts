export type RouteName = "home" | "work-single";

export type DefineComponentContext = {
  history: { value: "push" | "pop" };
  once: boolean;
  prevRouteName: RouteName;
};
