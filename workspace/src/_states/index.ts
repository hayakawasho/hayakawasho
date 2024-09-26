const ww = window.innerWidth;
const wh = window.innerHeight;

export default {
  scrolling: false,
  offsetY: window.scrollY,
  bounds: {
    ww,
    wh,
    centerX: ww * 0.5,
    centerY: wh * 0.5,
  },
  coordinate: {
    x: 0,
    y: 0,
  },
};
