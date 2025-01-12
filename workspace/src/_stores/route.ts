import { atom, createStore } from "jotai";
import { useUnmount } from "lake";
import { noop } from "../_utils/noop";

type RouteProps = {
  name: "home" | "work" | "work-single" | "error";
};

const store = createStore();
const routeAtom = atom<RouteProps>({
  name: "home",
});

export const useRoute = (callback: (payload: RouteProps) => void = noop) => {
  const getState = () => store.get(routeAtom);

  const setState = (newValue: RouteProps) => {
    store.set(routeAtom, newValue);
  };

  const unsub = store.sub(routeAtom, () => {
    const { name } = store.get(routeAtom);

    callback({
      name,
    });
  });

  useUnmount(() => {
    unsub();
  });

  return [getState, setState] as const;
};
