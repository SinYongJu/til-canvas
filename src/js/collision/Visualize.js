import SAT from "./SAT";

class Visualize {
  constructor() {
    this.sat = new SAT();
  }
  resize(w, h) {
    this.stageW = w / 2;
    this.stageH = h / 2;
    this.sat.resize(w, h);
  }
  axes(ctx, normals) {
    normals.forEach((edges) => {
      let lineP1 = {
        x: this.stageW + edges.x * 1e4,
        y: this.stageH + edges.y * 1e4,
      };

      let lineP2 = {
        x: this.stageW - edges.x * 2e4,
        y: this.stageH - edges.y * 2e4,
      };

      ctx.beginPath();
      ctx.strokeStyle = "ref";
      ctx.moveTo(lineP1.x, lineP1.y);
      ctx.lineTo(lineP2.x, lineP2.y);
      ctx.stroke();
      ctx.closePath();
    });
  }
  projections(ctx, polygon1, polygon2) {
    let axes = [...polygon1.edges, ...polygon2.edges];

    axes.forEach((edges) => {
      let projection1 = this.sat.projectOntoAxis(polygon1, edges);
      let projection2 = this.sat.projectOntoAxis(polygon2, edges);
      let distance = this.sat.projectionDistance(projection1, projection2);

      [projection1, projection2].forEach((projection) => {
        let projectionP1 = {
          x: this.stageW + edges.x * projection.min,
          y: this.stageH + edges.y * projection.min,
        };

        let projectionP2 = {
          x: this.stageW + edges.x * projection.max,
          y: this.stageH + edges.y * projection.max,
        };

        ctx.beginPath();
        ctx.lineWidth = 3;

        distance = distance > 100 ? 100 : distance;

        if (distance > 0)
          ctx.strokeStyle = `rgba(0, 255, 180, ${
            1 - Math.abs(distance) / 120
          })`;
        else ctx.strokeStyle = "#FF3CFF";

        ctx.moveTo(projectionP1.x, projectionP1.y);
        ctx.lineTo(projectionP2.x, projectionP2.y);
        ctx.stroke();
        ctx.closePath();
      });
    });
  }
  hypo(ctx, p1, p2) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.setLineDash([10, 10]);
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.closePath();
  }
}
export default Visualize;
