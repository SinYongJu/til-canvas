import { DEG_TO_RADIAN, PI2 } from "../../constants";
import Vector from "../../utils/Vector";

export default class SpaceShip {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.cAngle = 10;
    this.angle = -90;
    this.dir = this.getDirVector(this.angle);
  }
  getDirVector(angle) {
    let x = Math.cos(angle * DEG_TO_RADIAN);
    let y = Math.sin(angle * DEG_TO_RADIAN);
    return new Vector(x, y);
  }
  left() {
    this.angle -= this.cAngle;
    this.dir = this.getDirVector(this.angle);
  }
  right() {
    this.angle += this.cAngle;
    this.dir = this.getDirVector(this.angle);
  }
  break() {
    let friction = this.vel.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.1);
    this.applyForce(friction);
  }
  applyForce(force) {
    let f = force.copy();
    this.acc.add(f);
  }
  force(force) {
    let f = force.copy();
    this.acc.add(f);
    this.acc.add(this.dir);
  }
  resize(w, h) {
    this.stageW = w;
    this.stageH = h;
  }
  update() {
    if (this.pos.y < 0) {
      this.pos.y = this.stageH;
    }
    if (this.pos.y > this.stageH) {
      this.pos.y = 0;
    }
    if (this.pos.x < 0) {
      this.pos.x = this.stageW;
    }
    if (this.pos.x > this.stageW) {
      this.pos.x = 0;
    }

    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.dir.getAngle());
    ctx.beginPath();
    this.centerRect(ctx, 20, 0, 10, 10);
    this.centerRect(ctx, 0, 0, 50, 10);
    ctx.restore();
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
