import { PI2 } from "../../constants";
import { constrain } from "../../utils/utils";
import Vector from "../../utils/Vector";
import Attactor from "./Attractor";

export default class Mover {
  constructor(x, y, m) {
    this.pos = new Vector(x, y);
    this.acc = new Vector(0, 0);
    this.vel = new Vector(0, 0);
    this.mass = m;
    this.topSpeed = 5;

    this.angle = 0;
    this.aVel = 0;

    this.attract = new Attactor(x, y);
  }
  resize(w, h) {
    this.stageW = w;
    this.stageH = h;
  }
  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }
  getAttract(mover) {
    return this.attract.attract(mover);
  }
  checkEdges() {
    if (this.pos.x < 0) {
      this.vel.x *= -1;
      this.pos.x = 0;
    }

    if (this.pos.x > this.stageW) {
      this.pos.x = this.stageW;
      this.vel.x *= -1;
    }
    if (this.pos.y > this.stageH) {
      this.vel.y *= -1;
      this.pos.y = this.stageH;
    }
  }
  rotate() {
    this.aVel += this.acc.x;
    this.angle += constrain(this.aVel, -0.1, 0.1);
  }
  update() {
    this.rotate();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // To clean acc
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    this.centerRect(ctx, 0, 0, this.mass * 8, this.mass * 8);
    // this.update();

    ctx.restore();
  }
  ellipse(ctx, x, y, r) {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255, 0.2)`;
    ctx.strokeStyle = `rgba(255,255,255, 0.8)`;
    ctx.lineWidth = 4;
    ctx.arc(x, y, r, 0, PI2, false);
    ctx.fill();
    ctx.stroke();
  }
  centerRect(ctx, x, y, w, h) {
    ctx.fillStyle = `rgba(255,255,255, 0.2)`;
    ctx.strokeStyle = `rgba(255,255,255, 0.8)`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    let halfW = w / 2;
    let halfH = h / 2;
    ctx.moveTo(x + halfW, y + halfH);
    ctx.lineTo(x + halfW, y - halfH);
    ctx.lineTo(x - halfW, y - halfH);
    ctx.lineTo(x - halfW, y + halfH);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
