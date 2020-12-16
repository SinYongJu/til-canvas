import { random } from "../../utils/utils";
import Polygon from "./Polygon";

class PolygonGroup {
  constructor(w, h, count) {
    this.stageW = w;
    this.stageH = h;
    this.polygons = [];
    this.total = count;
    for (let i = 0; i < this.total; i++) {
      this.polygons[i] = new Polygon(
        random(0, this.stageW),
        random(0, this.stageH),
        random(50, 100),
        random(3, 8)
      );
    }
  }

  resize(stageW, stageH) {
    this.stageW = stageW;
    this.stageH = stageH;
    for (let i = 0; i < this.total; i++) {
      this.polygons[i].resize(stageW, stageH);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.total; i++) {
      this.polygons[i].draw(ctx);
    }
  }
}
export default PolygonGroup;
