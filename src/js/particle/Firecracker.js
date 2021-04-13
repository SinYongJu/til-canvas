import { PI2 } from "../../constants";
import { random } from "../../utils/utils";
import Vector from "../../utils/Vector";
import Particle from "./Particle";
import ParticleGroup from "./ParticleGroup";

const getRandomColor = () =>
  `${random(0, 255)},${random(0, 255)},${random(0, 255)}`;
export default class Firecracker {
  constructor(w, h) {
    this.resize(w, h);
    this.init();
  }
  init() {
    this.pos = new Vector(random(0, this.stageW), random(0, this.stageH));

    this.color = getRandomColor();
    this.now = null;
    this.delay = random(50, 2000);
    this.gravity = new Vector(0, 0.01);
    let particleForceList = [this.gravity];
    this.fires = new ParticleGroup(
      this.pos.x,
      this.pos.y,
      this.color,
      particleForceList
    );

    this.lauchPos = this.pos.copy();
    this.lauchPos.y = this.stageH;
    this.lauchVel = new Vector(0, 0);
    this.lauchAcc = new Vector(0, -1);
    this.opacity = 1;
    this.velOpa = (1 / this.pos.dist(this.lauchPos)) * 5;

    this.tail = this.lauchPos.copy();
  }
  resize(w, h) {
    this.stageW = w;
    this.stageH = h;
  }
  isDead() {
    return this.fires.isDead();
  }
  delayFire(t) {
    if (this.now === null) {
      this.now = t;
    }
    if (this.delay < t - this.now) {
      return true;
    }
    return false;
  }
  isFire() {
    return this.lauchPos.y > this.pos.y;
  }
  update() {
    if (this.isFire()) {
      this.lauchAcc.mult(5);
      this.lauchVel.add(this.lauchAcc);
      this.lauchPos.add(this.lauchVel);
      this.lauchAcc.mult(0);
    }
    this.opacity -= this.velOpa;
  }
  draw(ctx, t) {
    if (this.delayFire(t)) {
      if (!this.isFire()) {
        this.fires.draw(ctx);
      }
      this.update();
      //   ctx.save();
      //   ctx.beginPath();
      //   ctx.lineWidth = 2;
      //   ctx.strokeStyle = `rgba(${this.color},${this.opacity})`;
      //   ctx.moveTo(this.tail.x, this.tail.y);
      //   ctx.lineTo(this.lauchPos.x, this.lauchPos.y);
      //   ctx.stroke();
      //   ctx.restore();
    }
  }
}
