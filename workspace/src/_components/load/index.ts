import htmx from "htmx.org";
import {
  defineComponent,
  useDomRef,
  useSlot,
  useMount,
  ref,
  readonly,
} from "lake";
import { wideQuery } from "@/_foundation/env";
import { debounce } from "@/_foundation/utils";
import { windowSizeMutators } from "@/_states/window-size";
import GlWorld from "../glworld";
import ScrollTweenContainer from "../scroll-tween-container";
import type { AppContext } from "@/_foundation/type";

type Props = {
  onCreated: (props?: Omit<AppContext, "once">) => void;
  onUpdated: (scope: HTMLElement, props?: Omit<AppContext, "once">) => void;
  onCleanup: (scope: HTMLElement) => void;
};

type Refs = {
  main: HTMLElement;
  glWorld: HTMLElement;
  windowSizeWatcher: HTMLElement;
};

export default defineComponent({
  name: "Load",
  setup(_el, { onCreated, onUpdated, onCleanup }: Props) {
    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>("glWorld", "main", "windowSizeWatcher");

    const history = ref<"pushstate" | "popstate">("pushstate");
    const mq = readonly(ref<"pc" | "sp">(wideQuery.matches ? "pc" : "sp"));

    const [scrollContext] = addChild(refs.main, ScrollTweenContainer, {
      mq,
    });
    const [glWorldContext] = addChild(refs.glWorld, GlWorld, {
      mq,
    });

    const ro = new ResizeObserver(
      debounce(([entry]) => {
        const { width, height } = entry.contentRect;
        windowSizeMutators({
          height,
          width,
        });
      }, 200)
    );

    const provides = {
      glContext: glWorldContext.current,
      history: readonly(history),
      mq,
      scrollContext: scrollContext.current,
    } as AppContext;

    useMount(() => {
      ro.observe(refs.windowSizeWatcher);
      onCreated(provides);
    });

    //----------------------------------------------------------------

    htmx.config.historyCacheSize = 1;

    const fromContainer = ref<HTMLElement>(
      htmx.find(refs.main, "[data-xhr]") as HTMLElement
    );

    const onLeave = (from: HTMLElement) => {
      scrollContext.current.pause();
      onCleanup(from);
    };

    const onEnter = (to: HTMLElement) => {
      const namespace = to.dataset.xhr;
      document.body.dataset.page = namespace;

      scrollContext.current.reInit(to);
      scrollContext.current.set(0);
      scrollContext.current.resume();

      onUpdated(to, provides);
    };

    htmx.on("htmx:historyRestore", (e) => {
      history.value = "popstate";

      onLeave(fromContainer.value);

      const { detail } = e as CustomEvent;
      const toContainer = htmx.find(detail.elt, "[data-xhr]") as HTMLElement;
      onEnter(toContainer);
    });

    htmx.on("htmx:beforeHistorySave", (e) => {
      const { detail } = e as CustomEvent;
      const old = htmx.find(detail.historyElt, "[data-xhr]") as HTMLElement;
      onLeave(old);
      fromContainer.value = old;
    });

    htmx.on("htmx:beforeSwap", () => {
      history.value = "pushstate";
    });

    htmx.on("htmx:afterSwap", (e) => {
      const { detail } = e as CustomEvent;
      const toContainer = htmx.find(detail.target, "[data-xhr]") as HTMLElement;
      onEnter(toContainer);
    });

    htmx.on("htmx:xhr:progress", (e) => {
      const { detail } = e as CustomEvent;
      const progress = Math.floor((detail.loaded / detail.total) * 1000) / 1000;
      console.log(progress);
    });
  },
});
