import { atom, createStore } from "jotai";
import { useUnmount, ref, readonly } from "lake";
import type { RouteName } from "~/_foundation/types";

type Route = {
  name: RouteName;
};

const store = createStore();
const routeAtom = atom<Route>({
  name: "home",
});

export const useRoute = (callback: (payload: { name: RouteName }) => void) => {
  const route = ref<Route>(store.get(routeAtom));

  const unsub = store.sub(routeAtom, () => {
    const { name } = store.get(routeAtom);
    route.value.name = name;

    callback({
      name,
    });
  });

  useUnmount(() => {
    unsub();
  });

  return readonly(route);
};

export const routeMutators = (val: Route) => store.set(routeAtom, val);
