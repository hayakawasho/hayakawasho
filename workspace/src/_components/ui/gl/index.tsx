export function GlFront() {
  return <canvas className="ui-canvas" data-ref="glFront" />;
}

export function GlBack() {
  return (
    <canvas
      className="ui-canvas"
      data-ref="glBack"
      data-pc="/img/noise_550x550.webp"
      data-mob="/img/noise_1100x1100.webp"
    />
  );
}
