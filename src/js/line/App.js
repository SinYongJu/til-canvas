import CanvasSetup from "../utils/CanvasSetup";
import { PI2 } from "../constants";
import Grid from "../utils/Grid";
import StraightLine from "./line/StraightLine";
import InnerSects from "./line/InnerSects";

class App extends CanvasSetup {
  constructor() {
    super();
    this.crossPoint = [];
    this.lines = [];
    this.lines.push(new StraightLine(-200, -50, 250, 50));
    this.lines.push(new StraightLine(300, -50, -178, 50));
    // this.lines.push(new StraightLine(100, -50, 200, 50));
    // this.lines.push(new StraightLine(200, 10, -178, 50));
    // this.lines.push(new StraightLine(0, 50, 400, 50));
    // this.lines.push(new StraightLine(0, -50, 0, 50));
    // this.lines.push(new StraightLine(50, 50, -50, 50));

    this.detector = new InnerSects();

    this.grid = new Grid(this.stageW / 2, this.stageH / 2, {
      isDash: true,
    });

    this.resize();

    this.crossLines = [];
    this.crossPoints = [];
  }
  resize() {
    if (!!this.grid && !!this.lines) {
      this.grid.updateGrid(this.stageW / 2, this.stageH / 2);
      this.grid.resize(this.stageW, this.stageH);
      for (let i = 0; i < this.lines.length; i++) {
        this.lines[i].resize(this.stageW, this.stageH);
      }
    }
  }
  draw(ctx) {
    this.grid.draw(ctx);
    ctx.save();
    ctx.translate(this.stageW / 2, this.stageH / 2);

    this.crossPoints = [];
    for (let i = 0; i < this.lines.length; i++) {
      for (let j = 0; j < this.lines.length; j++) {
        if (i !== j) {
          this.crossPoints.push(
            this.detector.compare(this.lines[i], this.lines[j])
          );
        }
      }
      this.lines[i].draw(ctx);
    }

    for (let k = 0; k < this.crossPoints.length; k++) {
      let point = this.crossPoints[k];
      ctx.beginPath();
      ctx.fillStyle = "#FF0000";
      ctx.arc(point.x, point.y, 2, PI2, false);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.arc(0, 0, 2, PI2, false);
    ctx.fill();
    ctx.restore();

    this.noLoop();
  }
}

export default App;
