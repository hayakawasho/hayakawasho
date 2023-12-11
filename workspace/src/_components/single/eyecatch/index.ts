import { defineComponent, ref } from 'lake';
import { useScrollPosY } from '@/_states/scroll';
import { useWindowSize } from '@/_states/window-size';
import type { AppContext } from '@/_foundation/type';

export default defineComponent({
  name: 'eyecatch',
  setup(el, context: AppContext) {
    const imgSrc = el.dataset.src!;
    const imgW = Number(el.dataset.w);
    const imgH = Number(el.dataset.h);

    console.log(imgSrc);
    // const elImg = el.querySelector('img')!;
    // const isVisible = ref(false);
    // if (mq.value === 'sp') {
    //   return;
    // }
    // const [_] = useWindowSize(() => {
    //   //
    // });
    //
    // useScrollPosY(({ currentY, oldY }) => {
    //   if (!isVisible.value || currentY === oldY) {
    //     return;
    //   }
    //
    //   elImg.style.transform = `translateY(${currentY * 0.06}px) translateZ(0)`;
    // });
  },
});
