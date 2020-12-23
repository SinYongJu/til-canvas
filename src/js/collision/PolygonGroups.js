import { random } from "../../utils";
import Polygons from "./Polygons";
import SAT from "./SAT";
import Visualize from "./Visualize";

class PolygonGroups {
  constructor(rangeX, rangeY, total) {
    this.polygon = [];
    this.sat = new SAT();
    this.visual = new Visualize();
    this.init(rangeX, rangeY, total);
  }
  // no overlap setup
  init(rangeX, rangeY, total) {
    let overlap = false;
    let protection = 0;
    while (this.polygon.length < total) {
      let pol = this.makePolygon(rangeX, rangeY);
      for (let i = 0; i < this.polygon.length; i++) {
        let other = this.polygon[i];
        let dist = pol.pos.dist(other.pos);
        if (dist < pol.r + other.r) {
          overlap = true;
        }
      }
      if (!overlap) {
        this.polygon.push(pol);
      }
      protection++;
      if (protection > 100) {
        break;
      }
    }

    if (this.polygon.length < total) {
      this.init(rangeX, rangeY, total);
    }
  }
  makePolygon(rangeX, rangeY) {
    return new Polygons(
      random(rangeX / 8, (rangeX / 8) * 7),
      random(rangeY / 8, (rangeY / 8) * 7),
      random(3, 10),
      random(10, 80),
      {
        color: `rgba(${random(20, 255)},255,${random(0, 255)},0.5)`,
      }
    );
  }
  resize(w, h) {
    // console.log(w, h);
    this.stageW = w;
    this.stageH = h;
    this.visual.resize(this.stageW, this.stageH);
    for (let i = 0; i < this.polygon.length; i++) {
      this.polygon[i].resize(this.stageW, this.stageH);
    }
    this.sat.resize(this.stageW, this.stageH);
  }
  draw(ctx, mouseX, mouseY) {
    this.sat.collide(this.polygon);
    for (let i = 0; i < this.polygon.length; i++) {
      this.polygon[i].draw(ctx, mouseX, mouseY);
      let pol1 = this.polygon[i];
      let pol2 = this.polygon[i + 1] || this.polygon[0];
      this.visual.projections(ctx, pol1, pol2);
      this.visual.hypo(ctx, pol1, pol2);
    }
  }
}

export default PolygonGroups;
