import CanvasSetup from "../utils/CanvasSetup";
import PolygonGroups from "./collision/PolygonGroups";
const POLYGON_COUNT = 30;
class App extends CanvasSetup {
  constructor() {
    super();

    /**
     *
     * 두개까지 는 가능
     */
    this.polygonGroups = new PolygonGroups(
      this.stageW,
      this.stageH,
      POLYGON_COUNT
    );

    this.mouseX = 0;
    this.mouseY = 0;

    window.addEventListener("mousemove", this.mouseMove.bind(this));

    this.resize();
  }
  resize() {
    if (this.polygonGroups) {
      this.polygonGroups.resize(this.stageW, this.stageH);
    }
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, this.stageW, this.stageH);
    this.polygonGroups.draw(ctx, this.mouseX, this.mouseY);
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
  mouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }
}

export default App;
