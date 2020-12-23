import { PI2 } from "../../constants";
import { random } from "../../utils/utils";
import Vector from "../../utils/Vector";

const generateId = (r) =>
  `${r}__polygon__${random(0, 255)}__${random(0, 255)}__${random(0, 255)}`;
class Polygons {
  constructor(x, y, vertexCount, r, opt = {}) {
    this.id = generateId(vertexCount);
    this.pos = new Vector(x, y);
    this.color = opt.color || `rgba(255,0,0,0.5)`;
    this.strokeColor = opt.strokeColor || `rgba(255,0,0,0.8)`;
    this.r = r;
    this.vertexes = [];
    this.edges = [];
    this.vertexCount = vertexCount;
    this.overlapping = [];
    this.isPermissionMouseEvent = false;

    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);

    this.dir = new Vector(random(-1, 1), random(-1, 1));

    this.head = this.dir.copy();
    this.head.mult(this.r);

    this.angle = 25;

    this.topAxis = new Vector(this.stageW, 0);
    this.topAxis.normalize();
    this.topAxis = this.topAxis.normal();
    this.rightAxis = new Vector(0, this.stageH);
    this.rightAxis.normalize();
    this.rightAxis = this.rightAxis.normal();
    this.bottomAxis = new Vector(this.stageW, 0);
    this.bottomAxis.normalize();
    this.bottomAxis = this.bottomAxis.normal();
    this.leftAxis = new Vector(0, this.stageH);
    this.leftAxis.normalize();
    this.leftAxis = this.leftAxis.normal();

    this.generateVertex();
  }
  get isOverlap() {
    return this.overlapping.length > 0;
  }
  generateVertex() {
    for (let i = 0; i < this.vertexCount; i++) {
      let x =
        this.r * Math.cos((PI2 / this.vertexCount) * i + this.angle) +
        this.pos.x;
      let y =
        this.r * Math.sin((PI2 / this.vertexCount) * i + this.angle) +
        this.pos.y;
      let vetex = new Vector(x, y);
      this.vertexes[i] = vetex;
    }
    this.getEdges();
  }
  getEdges() {
    for (let i = 0; i < this.vertexCount; i++) {
      let p1 = this.vertexes[i].copy();
      let p2 = this.vertexes[i + 1] || this.vertexes[0];
      p2 = p2.copy();
      let edge = new Vector(p2.x - p1.x, p2.y - p1.y);
      let normal = edge.normal();
      normal.normalize();
      this.edges[i] = normal;
    }
    return this.edges;
  }
  resize(w, h) {
    this.stageW = w;
    this.stageH = h;
  }
  sideLeanearF(point1, point2, x) {
    return (
      ((point2.y - point1.y) / (point2.x - point1.x)) * (x - point1.x) +
      point1.y
    );
  }
  update() {
    if (this.pos.x - this.r < 0) {
      this.dir.x = 1;
    }
    if (this.pos.x + this.r > this.stageW) {
      this.dir.x = -1;
    }
    if (this.pos.y - this.r < 0) {
      this.dir.y = 1;
    }
    if (this.pos.y + this.r > this.stageH) {
      this.dir.y = -1;
    }

    this.generateVertex();
    this.dir.normalize();
    this.acc = this.dir;
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
  }
  draw(ctx, x, y) {
    if (this.isPermissionMouseEvent) {
      this.pos.x = x;
      this.pos.y = y;
    }
    ctx.save();
    this.angle += 0.06;
    this.update();

    if (this.isOverlap) {
      ctx.fillStyle = "#A0FFFF";
    } else {
      ctx.fillStyle = this.color;
    }
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();

    for (let i = 0; i < this.vertexCount; i++) {
      let vertex = this.vertexes[i].copy();
      let { x, y } = vertex;
      if (i === 0) {
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(x, y);
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    // this.update();

    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    let dir = Vector.add(this.pos, this.head);
    ctx.lineTo(dir.x, dir.y);

    ctx.stroke();
    ctx.restore();
  }
}

export default Polygons;
