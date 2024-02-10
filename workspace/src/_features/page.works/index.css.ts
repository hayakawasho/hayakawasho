import { style, globalStyle } from '@vanilla-extract/css';
import { mq } from '~/_foundation/const';

export const screen = style({
  height: '100%',
  position: 'fixed',
  width: '100%',
});

export const listItem = style({
  '@media': {
    [mq.pc]: {
      padding: 0,
      textAlign: 'center',
      willChange: 'transform',
    },
  },
  padding: '1rem 0',
  paddingLeft: 'var(--gap)',
});

export const item = style({
  '@media': {
    [mq.pc]: {
      display: 'inline-block',
      fontSize: '9.8rem',
      lineHeight: 1,
      paddingLeft: 0,
      paddingTop: '0.1em',
      width: 'auto',
    },
    '(hover: hover)': {
      ':hover': {
        opacity: 1,
      },
      opacity: 0.7,

      transition: 'opacity 0.65s cubic-bezier(0.32, 0.94, 0.6, 1)',
    },
  },
  display: 'grid',
  fontFamily: 'var(--font-en)',
  fontSize: '4.3rem',
  gap: '1.5rem',
  gridTemplateColumns: '0.8em 1fr',
  letterSpacing: '0.02em',

  width: '100%',
});

globalStyle(`${item} ._l`, {
  overflow: 'hidden',
});

globalStyle(`${item} ._l + ._l`, {
  marginTop: '-0.2em',
});

export const item__title = style({
  display: 'inline-block',
  lineHeight: 1.15,
  overflow: 'hidden',
  transform: 'translateZ(0)',
});

export const item__thumb = style({
  borderRadius: '50%',
  height: '0.85em',
  marginTop: '0.1em',
  overflow: 'hidden',
  width: '0.85em',
});
