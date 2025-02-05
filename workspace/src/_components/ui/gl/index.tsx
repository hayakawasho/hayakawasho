import noiseSpImg from "../../../assets/noise_550x550.webp";
import noiseImg from "../../../assets/noise_1100x1100.webp";

export function GlFront() {
  return <canvas className="ui-canvas" data-ref="glFront" />;
}

export function GlBack() {
  return (
    <canvas
      className="ui-canvas"
      data-ref="glBack"
      data-pc={(noiseImg as any).src}
      data-mob={(noiseSpImg as any).src}
    />
  );
}
