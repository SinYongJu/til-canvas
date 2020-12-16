import { PI2 } from "../../constants";
import { random } from "../../utils/utils";
import Vector from "../../utils/Vector";

const DIR = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const getRandomDir = () => DIR[random(0, 3)];
class Polygon {
  constructor(x, y, r, polygon) {
    this.pos = new Vector(x, y);
    let [dx, dy] = getRandomDir();
    this.dir = new Vector(dx, dy);
    this.vel = new Vector(0, 0);
    this.acc = this.dir;

    this.polygon = polygon;
    this.r = r;
    this.startDegree = PI2;

    this.correctionDegree = polygon !== 4 ? Math.PI / 2 : Math.PI / 4;

    this.vertexes = [];

    this.sides = [];

    for (let i = 0; i < this.polygon; i++) {
      let x = this.r * Math.cos(this.durationPIbyPolygon(i));
      let y = this.r * Math.sin(this.durationPIbyPolygon(i));

      this.vertexes.push(new Vector(x, y));
    }

    let curr = null;

    for (let j = 0; j < this.vertexes.length; j++) {
      if (j !== this.polygon - 1) {
        curr = Vector.sub(this.vertexes[j + 1], this.vertexes[j]);
      } else {
        curr = Vector.sub(this.vertexes[0], this.vertexes[j]);
      }
      curr.normalize();
      this.sides.push(curr);
    }
  }
  updatePos(x, y) {
    this.pos.x = x;
    this.pos.y = y;
  }
  resize(stageW, stageH) {
    this.stageW = stageW;
    this.stageH = stageH;
  }
  update() {
    this.acc = this.dir;
    this.vel.add(this.acc);
    this.vel.limit(3);
    this.pos.add(this.vel);
    if (this.pos.x > this.stageW - this.r) {
      this.dir.x = -1;
    }
    if (this.pos.x - this.r < 0) {
      this.dir.x = 1;
    }
    if (this.pos.y > this.stageH - this.r) {
      this.dir.y = -1;
    }
    if (this.pos.y - this.r < 0) {
      this.dir.y = 1;
    }
  }
  collide(bool) {
    this.color = bool ? "#ff0000" : "#000000";
  }
  draw(ctx, bool, x, y) {
    ctx.save();
    let px = x ? x : this.pos.x;
    let py = y ? y : this.pos.y;
    ctx.translate(px, py);
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    for (let i = 0; i < this.vertexes.length; i++) {
      let { x, y } = this.vertexes[i];
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    this.update();
  }
  durationPIbyPolygon(i) {
    return (this.startDegree / this.polygon) * i - this.correctionDegree;
  }
}

export default Polygon;
