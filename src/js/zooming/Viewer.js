import { map } from "../../utils/utils";
import { CANVAS_CONTEXT } from "../../constants";

class Viewer {
  constructor(width, height, matrix, color) {
    this.width = width;
    this.height = height;
    this.matrixSize = matrix.length;
    this.scale = 2;
    this.matrix = matrix;
    this.color = color;
    this.createViewer();
  }
  createViewer() {
    let canvas = document.createElement("canvas");
    this.ctx = canvas.getContext(CANVAS_CONTEXT);
    canvas.id = "canvas2";
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.position = "absolute";
    canvas.style.right = "20px";
    canvas.style.bottom = "20px";
    canvas.style.border = "1px solid #fff";
    document.body.appendChild(canvas);
  }
  resize(stageW, stageH) {
    this.stageW = stageW;
    this.stageH = stageH;
  }
  draw(mouseX, mouseY) {
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.width, this.height);
    let x = -mouseX * this.scale + this.width / 2;
    let y = -mouseY * this.scale + this.height / 2;
    this.ctx.translate(x, y);
    this.ctx.scale(this.scale, this.scale);
    for (let i = 0; i < this.matrixSize; i++) {
      this.matrix[i].draw(this.ctx);
    }
    this.ctx.restore();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

export default Viewer;
