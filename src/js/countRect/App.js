import CanvasSetup from "../utils/CanvasSetup";
import { PI2 } from "../constants";
import Grid from "../utils/Grid";
import Matrix from "../utils/Matrix";
import { random } from "../utils/utils";

const ROW = 8;
const COL = 8;

const getRndomValue = (range) => {
  let tmp = Array(range).fill(0);
  return tmp.map(() => (random(0, 5) > 0 ? 0 : 1));
};
class App extends CanvasSetup {
  constructor() {
    super();

    this.grid = new Grid(50, 50, {
      isDash: true,
    });

    this.matrixObject = new Matrix(ROW, COL, 0);
    this.matrixObject.setValues(col);

    console.log(this.matrixObject);
    this.resize();
  }
  resize() {
    if (!!this.grid) {
      this.grid.resize(this.stageW, this.stageH);
    }
  }
  draw(ctx) {
    this.grid.draw(ctx);

    for (let i = 0; i < this.matrixObject.matrix.length; i++) {
      let entity = this.matrixObject.matrix[i];
      if (entity.value === 1) {
        this.rect(entity.x, entity.y, 50, 50);
      }
    }

    this.noLoop();
  }
  rect(x, y, w, h) {
    this.ctx.fillStyle = "#FF0000";
    this.ctx.beginPath();
    let halfW = w / 2;
    let halfH = h / 2;
    let cx = x * w + halfW;
    let cy = y * h + halfH;
    this.ctx.moveTo(cx + halfW, cy + halfH);
    this.ctx.lineTo(cx + halfW, cy - halfH);
    this.ctx.lineTo(cx - halfW, cy - halfH);
    this.ctx.lineTo(cx - halfW, cy + halfH);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
}

export default App;

// let col =  [
//   0,0,0,0,0,0,0,0,
//   0,0,1,0,1,0,0,0,
//   0,1,0,1,0,1,0,0,
//   1,0,0,0,1,0,1,0,
//   0,1,0,1,0,1,0,0,
//   0,0,1,0,1,0,0,0,
//   0,0,0,0,0,0,0,0,
//   0,0,0,0,0,0,0,0,
// ]
let col = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  1,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  0,
  1,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
];
