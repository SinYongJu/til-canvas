import { PI2 } from "../../constants";
import Vector from "../../utils/Vector";

export default class Stuff {
  constructor(x, y, mass) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);

    this.mass = mass;
    this.angle = 0;
    this.aVel = 0;
    this.aAcc = 0.001;
  }
  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }
  updateAngle() {
    this.aVel = this.aVel + this.acc.x;
    // console.log(this.aVel, this.acc.x);
    this.angle += this.aVel;
    this.acc.mult(0);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    // this.angle += 0.1;
    ctx.rotate(this.angle);
    ctx.strokeStyle = "#FFF";
    ctx.beginPath();
    ctx.moveTo(-50, 0);
    ctx.lineTo(50, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.arc(-50, 0, 10, 0, PI2, false);
    ctx.arc(50, 0, 10, 0, PI2, false);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
}
