import { PI2 } from "../../constants";
import { random } from "../../utils/utils";
import Vector from "../../utils/Vector";

export default class Particle {
  constructor(x, y, m, color) {
    this.pos = new Vector(x, y);
    this.color = color;
    this.start = this.pos.copy();
    this.acc = new Vector(0, -0.05);
    this.vel = new Vector(
      random(-3, 3) * Math.random(),
      random(-4, 1) * Math.random()
    );
    this.lifeSpan = 1;
    this.mass = m;
    this.lifeVel = 0.02;
  }
  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.lifeSpan += -this.lifeVel;
  }
  isDead() {
    return this.lifeSpan < 0;
  }
  resize(w, h) {
    this.stageW = w;
    this.stageH = h;
  }
  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.fillStyle = `rgba(${this.color},${this.lifeSpan})`;
    ctx.arc(this.pos.x, this.pos.y, 2, 0, PI2, false);
    // ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
}
