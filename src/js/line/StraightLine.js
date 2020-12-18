import { PI2 } from "../../constants";

const { default: Vector } = require("../../utils/Vector");

class StraightLine {
  constructor(x, y, x2, y2) {
    this.start = new Vector(x, y);
    this.end = new Vector(x2, y2);
    this.points = [];
    this.gradient = this.dir();
    // y = ax + b <= constants b
    this.b = this.start.y - this.gradient * this.start.x;
    this.getPoints();
  }

  resize(stageW, stageH) {
    this.stageW = stageW
    this.stageH = stageH
  }

  dir() {
    let start = this.start.copy();
    let end = this.end.copy();
    start.normalize();
    end.normalize();
    let { x, y } = Vector.sub(this.end, this.start);
    if (x !== 0 && y !== 0) {
      return y / x;
    }
    return 0;
  }

  linearFunction(x) {
    let result = this.gradient * x + this.b;
    return result;
  }
  getPoints() {
    this.points = [];
    let { x } = this.start;
    let { x: x1 } = this.end;

    let initI = Math.min(x, x1);
    let maxI = Math.max(x, x1);
    for (let i = initI; i <= maxI; i++) {
      this.points.push(new Vector(i, this.linearFunction(i)));
    }
    this.pointsLength = this.points.length
  }
  draw(ctx) {

    ctx.beginPath();

    ctx.moveTo(-this.stageW/2 , this.linearFunction(-this.stageW/2));
    ctx.lineTo(this.start.x,this.start.y)
    ctx.stroke()

    ctx.beginPath();
    for (let i = 0; i < this.points.length; i++) {
      let { x, y } = this.points[i];
      if(x === 0) {
        ctx.arc(x, y, 4, 0, PI2, false);
        ctx.fill();
      }
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();


    ctx.moveTo(this.stageW/2 , this.linearFunction(this.stageW/2));
    ctx.lineTo(this.end.x,this.end.y)
    ctx.stroke()


    ctx.beginPath();
    ctx.arc(this.start.x, this.start.y, 2, 0, PI2, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.end.x, this.end.y, 2, 0, PI2, false);
    ctx.fill();
  }
}

export default StraightLine;
