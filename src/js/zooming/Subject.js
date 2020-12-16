import { PI2 } from "../../constants";
import { random } from "../../utils/utils";

class Subject {
  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.lineWidth = random(1, 5);
    this.color = color;
  }
  resize(stageW, stageH) {
    this.stageW = stageW;
    this.stageH = stageH;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.arc(this.x, this.y, this.r, 0, PI2, false);
    ctx.stroke();
  }
}

export default Subject;
