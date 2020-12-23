import Vector from "../../utils/Vector";

class SAT {
  constructor() {}
  resize(w, h) {
    this.stageW = w;
    this.stageH = h;
  }
  projectOntoAxis(polygon, axis) {
    let _v = polygon.vertexes.map((vertex) => ({
      x: vertex.x - this.stageW / 2,
      y: vertex.y - this.stageH / 2,
    }));
    let min = axis.dot(_v[0]);
    let max = min;
    for (let i = 1; i < _v.length; i++) {
      let projection = axis.dot(_v[i]);
      if (projection < min) {
        min = projection;
      } else if (projection > max) {
        max = projection;
      }
    }
    return { min, max };
  }
  projectionDistance(projection1, projection2) {
    if (projection1.max < projection2.min) {
      return projection2.min - projection1.max;
    } else {
      return projection1.min - projection2.max;
    }
  }

  collide(polygons) {
    let axes = [];
    polygons.forEach((polygon) => (axes = axes.concat(polygon.edges)));

    let i = 0;
    let polygon1;
    let polygon2;
    let projection1;
    let projection2;
    let distance;
    let overlappedAxisCount;
    while (i < polygons.length - 1) {
      polygon1 = polygons[i];

      for (let j = i + 1; j < polygons.length; j++) {
        polygon2 = polygons[j];
        overlappedAxisCount = 0;

        for (let k in axes) {
          projection1 = this.projectOntoAxis(polygon1, axes[k]);
          projection2 = this.projectOntoAxis(polygon2, axes[k]);

          distance = this.projectionDistance(projection1, projection2);

          if (distance < 0) {
            overlappedAxisCount++;
          }
        }

        if (overlappedAxisCount == axes.length) {
          if (polygon1.overlapping.indexOf(polygon2.id) == -1) {
            polygon1.overlapping.push(polygon2.id);
          }
          if (polygon2.overlapping.indexOf(polygon1.id) == -1) {
            polygon2.overlapping.push(polygon1.id);
          }
        } else {
          if (polygon1.overlapping.indexOf(polygon2.id) != -1) {
            polygon1.overlapping.splice(
              polygon1.overlapping.indexOf(polygon2.id),
              1
            );
          }

          if (polygon2.overlapping.indexOf(polygon1.id) != -1) {
            polygon2.overlapping.splice(
              polygon2.overlapping.indexOf(polygon1.id),
              1
            );
          }
        } // if
      } // for
      i++;
    } //while
  }
}

export default SAT;
