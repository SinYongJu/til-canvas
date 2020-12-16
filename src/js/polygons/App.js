import { PI2 } from "../constants";
import CanvasSetup from "../utils/CanvasSetup";
import PolygonGroup from "./polygons/PolygonGroup";

class App extends CanvasSetup {
  constructor() {
    super();
    this.polygons = new PolygonGroup(this.stageW, this.stageH, 10);

    this.resize();
    this.crossPoints = [];
  }
  resize() {
    if (!!this.polygons) {
      this.polygons.resize(this.stageW, this.stageH);
    }
  }
  draw(ctx) {
    this.polygons.draw(ctx);
  }
}

export default App;
