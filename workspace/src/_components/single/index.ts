import { defineComponent, useDomRef, useSlot, useMount } from 'lake';
import { useMouseoverSplitText } from '@/_foundation/hooks';
import { splitTextNode2Words } from '@/_foundation/split-text';
import { Tween } from '@/_foundation/tween';
import { waitFrame } from '@/_foundation/utils';
import { useWindowSize } from '@/_states/window-size';
import Eyecatch from './eyecatch';
import NextProject from './next';
import Screenshot from './screenshot';
import type { AppContext } from '@/_foundation/type';

type Refs = {
  back: HTMLElement;
  c: HTMLElement[];
  now: HTMLElement;
  max: HTMLElement;
  dash: HTMLElement;
  sub: HTMLElement;
  h1: HTMLElement;
  screenshot: HTMLImageElement[];
  eyecatch: HTMLElement;
  infoText: HTMLElement[];
  infoLine: HTMLElement;
  stack: HTMLElement | HTMLElement[];
  next: HTMLElement;
};

export default defineComponent({
  name: 'Single',
  setup(_el, context: AppContext) {
    const { once, history, mq } = context;

    const { addChild } = useSlot();
    const { refs } = useDomRef<Refs>(
      'back',
      'c',
      'now',
      'max',
      'dash',
      'sub',
      'h1',
      'screenshot',
      'eyecatch',
      'infoText',
      'infoLine',
      'stack',
      'next'
    );

    addChild(refs.eyecatch, Eyecatch, context);
    addChild(refs.screenshot, Screenshot, context);
    addChild(refs.next, NextProject, context);

    const { split, onSplitUpdate } = splitTextNode2Words(refs.h1);

    useWindowSize(() => {
      onSplitUpdate();
    });

    useMouseoverSplitText(refs.back, {
      chars: refs.c,
      mq: mq.value,
    });

    useMount(() => {
      if (!once && history.value === 'push') {
        Tween.serial(
          Tween.prop(refs.now, {
            willChange: 'transform',
            x: '-110%',
          }),
          Tween.prop(refs.dash, {
            scaleX: 0,
            willChange: 'transform',
          }),
          Tween.prop(refs.max, {
            willChange: 'transform',
            x: '110%',
          }),
          Tween.prop([refs.infoText, refs.stack], {
            willChange: 'transform',
            y: '110%',
          }),
          Tween.prop(refs.infoLine, {
            opacity: 0,
            scaleY: 0,
            willChange: 'transform,opacity',
          }),
          Tween.prop([refs.sub, split.words], {
            willChange: 'transform',
            y: '1.2em',
          }),
          Tween.prop(refs.c, {
            willChange: 'transform',
            y: '100%',
          }),
          Tween.wait(0.1),
          Tween.parallel(
            Tween.tween([refs.now, refs.max], 0.85, 'power2.out', {
              x: '0%',
            }),
            Tween.tween(refs.dash, 1.2, 'expo.out', {
              scaleX: 1,
            }),
            Tween.tween(refs.infoText, 1.85, 'expo.out', {
              stagger: 0.05,
              y: '0%',
            }),
            Tween.tween(refs.stack, 1.85, 'expo.out', {
              stagger: 0.05,
              y: '0%',
            }),
            Tween.tween(refs.infoLine, 1.2, 'expo.out', {
              opacity: 1,
              scaleY: 1,
            }),
            Tween.tween(refs.sub, 2.2, 'expo.out', {
              y: '0em',
            }),
            Tween.tween(split.words, 2.2, 'expo.out', {
              delay: 0.05,
              stagger: 0.03,
              y: '0em',
            }),
            Tween.tween(refs.c, 1.85, 'expo.out', {
              y: '0%',
            })
          ),
          Tween.immediate(() => {
            Tween.prop(
              [
                refs.now,
                refs.max,
                refs.dash,
                refs.c,
                refs.infoText,
                refs.stack,
                refs.infoLine,
                refs.sub,
                split.words,
              ],
              {
                clearProps: 'will-change',
              }
            );
          })
        );
      }

      return async () => {
        if (history.value === 'pop') {
          return;
        }

        Tween.kill(refs.c);
        Tween.prop(refs.c, {
          willChange: 'transform',
          y: '-100%',
        });
        Tween.prop([refs.sub, split.words], {
          willChange: 'transform',
        });

        await waitFrame();

        Tween.parallel(
          Tween.tween(
            [
              refs.dash,
              refs.max,
              refs.now,
              refs.infoText,
              refs.infoLine,
              refs.eyecatch,
              refs.stack,
            ],
            0.55,
            'power3.inOut',
            {
              alpha: 0,
            }
          ),
          Tween.tween(refs.c, 0.45, 'custom.in', {
            y: '-240%',
          }),
          Tween.tween([refs.sub, split.words], 0.45, 'custom.in', {
            y: '-1.2em',
          })
        );
      };
    });
  },
});
