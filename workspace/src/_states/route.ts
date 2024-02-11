import { useUnmount } from "lake";
import { map } from "nanostores";
import type { RouteName } from "@/_foundation/type";

type Route = {
  name: RouteName;
};

const route = map<Route>({
  name: "home",
});

export const useRoute = (callback: (payload: { name: RouteName }) => void) => {
  const unbind = route.listen(({ name }) => {
    callback({
      name,
    });
  });

  useUnmount(() => {
    unbind();
  });
};

export const routeMutators = (update: Route) => route.set(update);
