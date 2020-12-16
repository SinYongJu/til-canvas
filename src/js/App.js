import CanvasSetup from "../utils/CanvasSetup";
import { PI2 } from "../constants";
import Grid from "./line/Grid";
import StraightLine from "./line/StraightLine";

class App extends CanvasSetup {
  constructor() {
    super();
    this.line = new StraightLine(-200, -50, 200, 50);
    this.grid = new Grid(25, 25, {
      isDash: true,
    });

    this.resize();

    this.crossPoints = [];
  }
  resize() {
    if (!!this.grid) {
      this.grid.resize(this.stageW, this.stageH);
    }
  }
  draw(ctx) {
    // ctx.save();
    // ctx.beginPath();
    // ctx.moveTo(-50, 50);
    // ctx.lineTo(50, -50);
    // ctx.stroke();
    // ctx.restore();
    this.grid.draw(ctx);

    ctx.save();
    ctx.translate(this.stageW / 2, this.stageH / 2);
    this.line.draw(ctx);
    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.arc(0, 0, 2, PI2, false);
    ctx.fill();
    ctx.restore();
    // this.noLoop();
  }
}

export default App;
