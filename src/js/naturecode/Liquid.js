export default class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }
  isInside(moverObj) {
    let mover = moverObj.pos;
    return (
      mover.x > this.x &&
      mover.x < this.x + this.w &&
      mover.y > this.y &&
      mover.y < this.y + this.h
    );
  }
  getDragForce(mover) {
    let speed = mover.vel.mag();
    let dragMagnitude = this.c * speed * speed;
    let drag = mover.vel.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragMagnitude);
    return drag;
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(175,175,175,0.8)`;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}
