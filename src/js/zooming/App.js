import CanvasSetup from "../../utils/CanvasSetup";
import Detector from "./Detector";
import Subjects from "./Subjects";
import Viewer from "./Viewer";

let DETECTOR_WIDTH = 200;
let DETECTOR_HEIGHT = 100;
let VIEWER_WIDTH = 2 * DETECTOR_WIDTH;
let VIEWER_HEIGHT = 2 * DETECTOR_HEIGHT;
class App extends CanvasSetup {
  constructor() {
    super();
    window.addEventListener("pointermove", this.move.bind(this));
    this.bgColor = "#000";
    this.mouseX = 150;
    this.mouseY = 100;
    this.subjects = new Subjects(this.stageW, this.stageH);
    this.detector = new Detector(
      DETECTOR_WIDTH,
      DETECTOR_HEIGHT,
      this.subjects.subjects
    );
    this.viewer = new Viewer(
      VIEWER_WIDTH,
      VIEWER_HEIGHT,
      this.subjects.subjects,
      this.bgColor
    );

    this.resize();
  }
  draw(ctx) {
    this.ctx.save();
    this.ctx.fillstyle = "#000";
    this.ctx.fillRect(0, 0, this.stageW, this.stageH);
    this.ctx.restore();

    this.subjects.draw(ctx);
    this.detector.draw(ctx, this.mouseX, this.mouseY, this.subjects.subjects);
    this.viewer.clear();
    this.viewer.draw(this.mouseX, this.mouseY);
    this.ctx.rect(0, 0, 100, 100);
    this.ctx.stroke();
  }
  resize() {
    if (!!this.viewer || !!this.subjects) {
      this.subjects.resize(this.stageW, this.stageH);
    }
  }
  move(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }
}

export default App;
