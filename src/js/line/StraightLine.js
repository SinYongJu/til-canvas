import { PI2 } from "../../constants";

const { default: Vector } = require("../../utils/Vector");

class StraightLine {
  constructor(x, y, x2, y2) {
    this.start = new Vector(x, y);
    this.end = new Vector(x2, y2);
    this.points = [];
    this.gradient = this.getGradient();
    this.isInterceptX = x - x2 === 0;
    this.isInterceptY = y - y2 === 0;
    this.isIntercept = this.isInterceptX || this.isInterceptY;

    this.b = this.isIntercept ? 0 : this.start.y - this.gradient * this.start.x;
    this.getPoints();
  }

  resize(stageW, stageH) {
    this.stageW = stageW;
    this.stageH = stageH;
  }

  getGradient() {
    let start = this.start.copy();
    let end = this.end.copy();
    let { x, y } = Vector.sub(end, start);
    if (y === 0 || x === 0) {
      return 0;
    }
    if (x !== 0) {
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
    let { x, y } = this.start;
    let { x: x1, y: y1 } = this.end;
    let initI = Math.min(x, x1);
    let maxI = Math.max(x, x1);
    if (this.isIntercept) {
      if (x - x1 === 0) {
        for (let i = y; i <= y1; i++) {
          this.points.push(new Vector(x, i));
        }
      }
      if (y - y1 === 0) {
        initI = Math.min(x, x1);
        maxI = Math.max(x, x1);
        for (let i = initI; i <= maxI; i++) {
          this.points.push(new Vector(i, y));
        }
      }
    } else {
      for (let i = initI; i <= maxI; i++) {
        this.points.push(new Vector(i, this.linearFunction(i)));
      }
    }

    this.pointsLength = this.points.length;
  }
  draw(ctx) {
    ctx.save();

    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    for (let i = 0; i < this.points.length; i++) {
      let { x, y } = this.points[i];
      if (x === 0) {
        ctx.arc(x, y, 2, 0, PI2, false);
        ctx.fill();
      }
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.restore();

    if (!this.isIntercept) {
      this.drawSubLine(ctx);
      ctx.beginPath();
      ctx.arc(this.start.x, this.start.y, 2, 0, PI2, false);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.end.x, this.end.y, 2, 0, PI2, false);
      ctx.fill();
    }
  }

  drawSubLine(ctx) {
    ctx.strokeStyle = "#FF0000";
    if (!this.start.x - this.end.x < 0) {
      ctx.beginPath();
      ctx.moveTo(-this.stageW / 2, this.linearFunction(-this.stageW / 2));
      ctx.lineTo(this.start.x, this.start.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.end.x, this.end.y);
      ctx.lineTo(this.stageW, this.linearFunction(this.stageW));
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(-this.stageW / 2, this.linearFunction(-this.stageW / 2));
      ctx.lineTo(this.end.x, this.end.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(this.start.x, this.start.y);
      ctx.lineTo(this.stageW, this.linearFunction(this.stageW));
      ctx.stroke();
    }
  }
}

export default StraightLine;
