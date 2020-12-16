class Detector {
  constructor(width, height, matrix) {
    this.width = width;
    this.height = height;
    this.halfWidth = this.width / 2;
    this.halfHeight = this.height / 2;
    this.matrixSize = matrix.length;
    this.matrix = matrix;
    this.greedPx = 10;
  }
  resize(stageW, stageH) {
    this.stageW = stageW;
    this.stageH = stageH;
  }
  draw(ctx, mouseX, mouseY) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    this.v1 = [mouseX + this.halfWidth, mouseY + this.halfHeight];
    this.v2 = [mouseX + this.halfWidth, mouseY - this.halfHeight];
    this.v3 = [mouseX - this.halfWidth, mouseY - this.halfHeight];
    this.v4 = [mouseX - this.halfWidth, mouseY + this.halfHeight];

    let [x1, y1] = this.v1;
    let [x2, y2] = this.v2;
    let [x3, y3] = this.v3;
    let [x4, y4] = this.v4;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}

export default Detector;
