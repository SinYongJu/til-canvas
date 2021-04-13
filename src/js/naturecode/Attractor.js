import { PI2 } from "../../constants";
import { constrain } from "../../utils/utils";
import Vector from "../../utils/Vector";

export default class Attactor {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.m = 20;
    this.G = 0.4;
  }

  resize(w, h) {
    this.stageW = w;
    this.stageH = h;
  }

  attract(mover) {
    let force = Vector.sub(this.pos, mover.pos);
    let dist = force.mag();
    dist = constrain(dist, 5, 25);

    force.normalize();
    let strength = (this.G * this.m * mover.mass) / (dist * dist);
    force.mult(strength);
    return force;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.m * 2, 0, PI2, false);
    ctx.fill();
  }
}
