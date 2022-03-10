import { Point } from '../libs/point';
import { Update } from '../libs/update';

export class Scroll {
  public old = new Point()
  public val = new Point()
  public easeVal = new Point()
  public rate = new Point()
  public power = new Point()
  public dist = new Point()

  constructor() {

  }

   set(y: number) {
    window.scrollTo(0, y)
  }

  private _update() {
    this.old.copy(this.val);
    this.val.y = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);
    this.easeVal.y += (this.val.y - this.easeVal.y) * 0.1

    const ease = 0.1;
    let powerTg = this.old.y - this.val.y;
    this.power.y += (powerTg - this.power.y) * ease;

    this.dist.y += (this.old.y - this.val.y - this.dist.y) * ease;
  }
}
