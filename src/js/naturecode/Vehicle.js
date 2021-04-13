import Vector from "../../utils/Vector";

export default class Vehicle {
  constructor(x, y, m) {
    this.pos = new Vector(x, y);

    this.mass = m;
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);

    this.angle = 0;
    this.aVel = 0;
  }
  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }
  update(mouse) {
    // console.log(mouse);
    this.acc = Vector.sub(mouse, this.pos);
    this.acc.normalize();
    if (this.pos.dist(mouse) > 10) {
      this.vel.add(this.acc);
      this.vel.limit(5);
      this.angle = this.vel.getAngle();
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    // .getAngle();
    // console.log(this.angle);
  }
  draw(ctx) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);

    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.moveTo(25, 0);
    ctx.lineTo(40, 0);
    ctx.stroke();
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
