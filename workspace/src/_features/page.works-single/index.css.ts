import { style, globalStyle } from '@vanilla-extract/css';
import { mq } from '~/_foundation/const';

export const screen = style({
  height: '100%',
  position: 'fixed',
  width: '100%',
});

export const back = style({
  '@media': {
    [mq.pc]: {
      fontSize: '1.3rem',
      left: 'calc(var(--grid) - var(--gap) * 0.5 - 2rem)',
      top: '5rem',
    },
  },
  backfaceVisibility: 'hidden',
  fontSize: '1.1rem',
  left: 'calc(var(--grid) - 2rem)',
  letterSpacing: '0.04em',
  lineHeight: 1,
  overflow: 'hidden',
  padding: '2rem',
  position: 'fixed',
  top: '1.2rem',
  zIndex: 9,
});

export const sub = style({
  '@media': {
    [mq.pc]: {
      fontSize: '9.8rem',
    },
  },
  backfaceVisibility: 'hidden',
  fontFamily: 'var(--font-en)',
  fontSize: '4.3rem',
  letterSpacing: '0.02em',
  lineHeight: 1,
  textAlign: 'center',
  textTransform: 'uppercase',
});

export const heading = style({
  '@media': {
    [mq.pc]: {
      fontSize: '9.4rem',
    },
  },
  backfaceVisibility: 'hidden',
  fontFamily: 'var(--font-heading)',
  fontSize: '4.1rem',
  fontWeight: 500,
  letterSpacing: '-0.02em',
  lineHeight: 1,
  textAlign: 'center',
  width: '100%',
});

globalStyle(`${heading} ._l`, {
  lineHeight: '1.25',
  overflow: 'hidden',
});

globalStyle(`${heading} ._l + ._l`, {
  marginTop: '-0.2em',
});

export const intro = style({
  position: 'relative',
});

export const intro__g = style({
  '@media': {
    [mq.pc]: {
      // height: '100vh',
      height: '100svh',
    },
  },
  alignItems: 'center',
  display: 'flex',
  // height: '90vh',
  height: '90svh',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
});

export const intro__hgroup = style({
  '@media': {
    [mq.pc]: {
      marginTop: '-15rem',
      padding: 0,
      position: 'absolute',
      top: '50%',
    },
  },
  marginTop: '-12rem',
});

export const intro__info = style({
  '@media': {
    [mq.pc]: {
      bottom: '7rem',
      left: 'calc(var(--grid) * 3)',
      padding: 0,
      position: 'absolute',
    },
  },
  alignItems: 'flex-start',
  bottom: '6rem',
  display: 'flex',
  left: 0,
  padding: '0 var(--grid)',
  position: 'absolute',
});

export const intro__indexNumber = style({
  '@media': {
    [mq.pc]: {
      fontSize: '1.3rem',
      right: 'calc(var(--grid) - var(--gap) * 0.5)',
      top: '7rem',
    },
  },
  fontSize: '1.1rem',
  overflow: 'hidden',
  position: 'absolute',
  right: 'var(--grid)',

  top: '3.2rem',
});

export const info = style({
  '@media': {
    [mq.pc]: {
      gap: '1.4rem',
      width: 'calc(var(--grid) * 2)',
    },
  },
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  width: 'calc(var(--grid) * 5)',
});

export const infoItem = style({
  '@media': {
    [mq.pc]: {
      fontSize: '1.3rem',
    },
  },
  fontSize: '1.1rem',
});

export const infoItem__heading = style({
  backfaceVisibility: 'hidden',
  opacity: 0.5,
  overflow: 'hidden',
});

export const infoItem__label = style({
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
});

export const infoItem__url = style({
  backfaceVisibility: 'hidden',
  fontSize: '110%',
  overflow: 'hidden',
});

export const stacks = style({
  marginTop: '0.2rem',
  paddingBottom: '0.5em',
  paddingLeft: '0.6em',
  position: 'relative',
});

export const stacksItems = style({
  '@media': {
    [mq.pc]: {
      fontSize: '1.3rem',
      gap: '0.3rem',
    },
  },
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1.1rem',
  gap: '0.2em',
  lineHeight: '1.15',
});

globalStyle(`${stacksItems} > li`, {
  backfaceVisibility: 'hidden',
});

export const stacks__hr = style({
  backgroundColor: 'currentColor',
  border: 0,
  display: 'block',
  height: '100%',
  left: 0,
  position: 'absolute',
  top: 0,
  transformOrigin: 'top left',
  translate: '-50%',
  width: '1px',
});

export const eyecatch = style({
  ':before': {
    aspectRatio: '16 / 9',
    content: '',
    display: 'block',
  },
  backfaceVisibility: 'hidden',
  overflow: 'hidden',
  position: 'relative',
});

export const eyecatchImg = style({
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  width: '100%',
});

export const screenshots = style({
  '@media': {
    [mq.pc]: {
      gap: '14rem',
      maxWidth: '1200px',
      width: 'calc(var(--grid) * 9)',
    },
  },
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--grid)',
  marginBottom: '5rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 'calc((var(--grid) * 10))',
});

export const dummy = style({
  '@media': {
    [mq.pc]: {
      // height: '125vh',
      height: '125svh',
    },
  },
  // height: '101vh',
  height: '101svh',
  position: 'relative',
});

export const next = style({
  '@media': {
    [mq.pc]: {
      paddingBottom: '15rem',
      paddingTop: '15rem',
    },
  },
  alignItems: 'center',
  backgroundColor: 'var(--color-text)',
  display: 'flex',
  flexDirection: 'column',
  inset: 0,
  justifyContent: 'center',
  opacity: 0,
  perspective: '1000px',
  pointerEvents: 'none',
  position: 'fixed',
  zIndex: 100,
});

export const next__hgroup = style({
  color: 'var(--color-bg)',
  display: 'inline-block',
});
