import CanvasSetup from "../utils/CanvasSetup";
import { PI2 } from "../constants";
import Grid from "./line/Grid";
import StraightLine from "./line/StraightLine";
import InnerSects from "./line/InnerSects";

class App extends CanvasSetup {
  constructor() {
    super();
    this.lines = []


    this.lines.push(new StraightLine(-200, -50, 250, 50)); 
    this.lines.push(new StraightLine(300, -50, -178, 50));

    this.detector = new InnerSects()

    this.grid = new Grid(this.stageW/2, this.stageH /2, {
      isDash: true,
    });

    this.resize();

    this.crossPoints = [];
  }
  resize() {
    if (!!this.grid && this.lines) {
      this.grid.resize(this.stageW, this.stageH);
      for(let i =0; i < this.lines.length;i++) {
        this.lines[i].resize(this.stageW, this.stageH);
      }
    }
   
  }
  draw(ctx) {
    this.grid.draw(ctx);

    ctx.save();
    ctx.translate(this.stageW / 2, this.stageH / 2);

    for(let i =0; i < this.lines.length;i++) {
      this.lines[i].draw(ctx);
    }

    console.log(this.detector.compare(this.lines[0].points,this.lines[1].points))
    
    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.arc(0, 0, 2, PI2, false);
    ctx.fill();
    ctx.restore();
    this.noLoop();
  }
}

export default App;
