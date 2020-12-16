import Subject from "./Subject";

class Subjects {
  constructor(w, h) {
    this.r = 20;
    this.startX = 50;
    this.startY = 50;
    this.gap = 20;

    this.matrix = [];
    this.subjects = [];

    this.resize(w, h);

    this.totalHeight =
      this.row * (this.r * 2) + this.startX * 2 + this.gap * (this.row - 1);
    this.totalWidth =
      this.column * (this.r * 2) +
      this.startY * 2 +
      this.gap * (this.column - 1);
  }
  init() {
    this.setMatrix();
    for (let i = 0; i < this.matrixSize; i++) {
      const { x, y, r, color } = this.matrix[i];
      this.subjects[i] = new Subject(x, y, r, color);
    }
  }
  setMatrix() {
    let matrix = Array.from(Array(this.row * this.column).fill(null));
    this.matrix = matrix.map(this.setEntity.bind(this));
  }
  setEntity(entry, index) {
    let row = Math.floor(index / this.column);
    let col = index % this.column;
    return {
      ...entry,
      x: this.startX + this.startX + this.r * 2 * col + this.gap * col,
      y: this.startY + this.startY + this.r * 2 * row + this.gap * row,
      r: this.r,
      color: this.getColorByMatrix(row, col),
    };
  }
  getColorByMatrix(row, col) {
    let r = 0;
    let g = Math.floor(255 - 12.5 * row);
    let b = Math.floor(255 - 12.5 * col);
    return `rgb(${r},${g},${b})`;
  }
  getSize(value) {
    return Math.floor((value - 2 * this.startX) / (2 * this.r + this.gap));
  }
  resize(stageW, stageH) {
    this.row = this.getSize(stageH);
    this.column = this.getSize(stageW);
    this.matrixSize = this.row * this.column;
    this.init();
  }
  draw(ctx) {
    ctx.save();
    for (let i = 0; i < this.matrixSize; i++) {
      this.subjects[i].draw(ctx);
    }
    ctx.restore();
  }
}

export default Subjects;
