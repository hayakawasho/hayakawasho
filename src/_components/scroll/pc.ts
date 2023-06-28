import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { defineComponent, useUnmount } from "lake";
import { Tween, useTick } from "@/_foundation";
// import { scrollPositionMutators } from "@/states/scroll";

gsap.registerPlugin(ScrollToPlugin);

export default defineComponent({
  setup(_el) {
    const lenis = new Lenis();

    lenis.on("scroll", (_e: any) => {
      // scrollPositionMutators({
      //   y: e.scroll,
      // });
    });

    useTick(({ timestamp, timeRatio }) => {
      lenis.raf(timestamp * timeRatio);
    });

    useUnmount(() => {
      lenis.destroy();
    });

    //----------------------------------------------------------------

    const resume = () => lenis.start();

    const pause = () => lenis.stop();

    const scrollTo = (href: string) => {
      if (href === "#top") {
        Tween.tween(window, 1.3, "power2.inOut", {
          scrollTo: {
            autoKill: false,
            y: 0,
          },
        });

        return;
      }

      Tween.tween(window, 1.3, "power2.inOut", {
        scrollTo: {
          autoKill: false,
          y: href,
        },
      });
    };

    return {
      pause,
      resume,
      scrollTo,
      update() {
        //
      },
    };
  },
  tagName: "PcScroll",
});
