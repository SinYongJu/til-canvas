const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let stageW = document.body.clientWidth;
let stageH = document.body.clientHeight;
canvas.width = stageW * 1;
canvas.height = stageH * 1;
ctx.scale(1, 1);
const grey = "#394244";

// ----------------------- Vector2D
function Vector2D(x, y) {
  this.x = x;
  this.y = y;
}

Vector2D.prototype.multiply = function (multiplier) {
  return {
    x: this.x * multiplier,
    y: this.y * multiplier,
  };
};

Vector2D.prototype.magnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2D.prototype.dotproduct = function (other) {
  return this.x * other.x + this.y * other.y;
};

Vector2D.prototype.normalize = function () {
  const magnitude = this.magnitude();
  this.x = this.x / magnitude;
  this.y = this.y / magnitude;
};

Vector2D.prototype.normal = function () {
  return new Vector2D(this.y, -this.x);
};

Vector2D.prototype.copy = function () {
  return new Vector2D(this.x, this.y);
};

// ----------------------- Polygon
function Polygon(polygonSpecifications) {
  this.x = polygonSpecifications.x;
  this.y = polygonSpecifications.y;
  this.verticesAmount = polygonSpecifications.verticesAmount;
  this.r = polygonSpecifications.radius;
  this.angle = polygonSpecifications.angle;
  this.overlapping = [];

  this.showAxes = false;
  this.hover = false;

  this.id = `Math.random().toString(36).substr(2, 9)}--${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

Polygon.prototype.calculateVerticesCoords = function () {
  let coords = [];
  for (let i = 0; i < this.verticesAmount; i++) {
    let theta = ((Math.PI * 2) / this.verticesAmount) * i;
    coords.push({
      x: Math.cos(theta + this.angle) * this.r + this.x,
      y: Math.sin(theta + this.angle) * this.r + this.y,
    });
  }

  this.verticesCoords = coords;
};

Polygon.prototype.getEdgeNormals = function () {
  this.calculateVerticesCoords();

  let edgeNormals = [];
  for (let i = 0; i < this.verticesCoords.length; i++) {
    let p1 = this.verticesCoords[i];
    let p2 = this.verticesCoords[i + 1] || this.verticesCoords[0];

    let edge = new Vector2D(p2.x - p1.x, p2.y - p1.y);

    let normal = edge.normal();
    normal.normalize();

    edgeNormals.push(normal);
  }

  return edgeNormals;
};

Polygon.prototype.draw = function () {
  this.calculateVerticesCoords();

  ctx.beginPath();
  ctx.lineWidth = 1;

  if (this.overlapping.length > 0) ctx.strokeStyle = "#FF3CFF";
  else if (this.hover) ctx.strokeStyle = "orange";
  else ctx.strokeStyle = "#A0FFFF";

  for (let i in this.verticesCoords) {
    if (i == 0)
      ctx.moveTo(
        this.verticesCoords[this.verticesCoords.length - 1].x,
        this.verticesCoords[this.verticesCoords.length - 1].y
      );
    ctx.lineTo(this.verticesCoords[i].x, this.verticesCoords[i].y);
    ctx.stroke();
  }
  ctx.closePath();

  if (this.showAxes) Visualize.axes(this.getEdgeNormals());
};

// ----------------------- Visualize
let Visualize = {};

Visualize.axes = function (normals) {
  normals.forEach((e) => {
    let lineP1 = {
      x: canvas.width / 2 + e.x * 1e4,
      y: canvas.height / 2 + e.y * 1e4,
    };

    let lineP2 = {
      x: canvas.width / 2 - e.x * 2e4,
      y: canvas.height / 2 - e.y * 2e4,
    };

    ctx.beginPath();
    ctx.strokeStyle = grey;
    ctx.moveTo(lineP1.x, lineP1.y);
    ctx.lineTo(lineP2.x, lineP2.y);
    ctx.stroke();
    ctx.closePath();
  });
};

Visualize.projections = function (polygon1, polygon2) {
  let axes = [...polygon1.getEdgeNormals(), ...polygon2.getEdgeNormals()];

  axes.forEach((e) => {
    let projection1 = SAT.projectOntoAxis(polygon1, e);
    let projection2 = SAT.projectOntoAxis(polygon2, e);

    let distance = SAT.projectionDistance(projection1, projection2);

    [projection1, projection2].forEach((p) => {
      let projectionP1 = {
        x: canvas.width / 2 + e.x * p.min,
        y: canvas.height / 2 + e.y * p.min,
      };

      let projectionP2 = {
        x: canvas.width / 2 + e.x * p.max,
        y: canvas.height / 2 + e.y * p.max,
      };

      ctx.beginPath();
      ctx.lineWidth = 3;

      distance = distance > 100 ? 100 : distance;

      if (distance > 0)
        ctx.strokeStyle = `rgba(0, 255, 180, ${1 - Math.abs(distance) / 120})`;
      else ctx.strokeStyle = "#FF3CFF";

      ctx.moveTo(projectionP1.x, projectionP1.y);
      ctx.lineTo(projectionP2.x, projectionP2.y);
      ctx.stroke();
      ctx.closePath();
    });
  });
};

Visualize.hypo = function (p1, p2) {
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;
  ctx.setLineDash([10, 10]);
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.closePath();
};

// ----------------------- SAT Core
let SAT = {};

SAT.projectOntoAxis = function (polygon, axis) {
  let ___v = polygon.verticesCoords.map((c) => {
    return {
      x: c.x - canvas.width / 2,
      y: c.y - canvas.height / 2,
    };
  });

  let min = axis.dotproduct(___v[0]);
  let max = min;

  for (let i = 1; i < ___v.length; i++) {
    let projection = axis.dotproduct(___v[i]);

    if (projection < min) min = projection;
    else if (projection > max) max = projection;
  }

  return { min: min, max: max };
};

SAT.projectionDistance = function (projection1, projection2) {
  if (projection1.max < projection2.min)
    return projection2.min - projection1.max;
  else return projection1.min - projection2.max;
};

SAT.collide = function (polygons) {
  let axes = [];
  polygons.forEach((e) => (axes = axes.concat(e.getEdgeNormals())));

  let i = 0;
  while (i < polygons.length - 1) {
    let polygon1 = polygons[i];

    for (let j = i + 1; j < polygons.length; j++) {
      let polygon2 = polygons[j];

      let overlappedAxisCount = 0;

      for (let k in axes) {
        let projection1 = this.projectOntoAxis(polygon1, axes[k]);
        let projection2 = this.projectOntoAxis(polygon2, axes[k]);

        let distance = this.projectionDistance(projection1, projection2);

        if (distance < 0) overlappedAxisCount++;
      }

      if (overlappedAxisCount == axes.length) {
        if (polygon1.overlapping.indexOf(polygon2.id) == -1)
          polygon1.overlapping.push(polygon2.id);
        if (polygon2.overlapping.indexOf(polygon1.id) == -1)
          polygon2.overlapping.push(polygon1.id);
      } else {
        if (polygon1.overlapping.indexOf(polygon2.id) != -1)
          polygon1.overlapping.splice(
            polygon1.overlapping.indexOf(polygon2.id),
            1
          );
        if (polygon2.overlapping.indexOf(polygon1.id) != -1)
          polygon2.overlapping.splice(
            polygon2.overlapping.indexOf(polygon1.id),
            1
          );
      }
    }

    i++;
  }
};

// ----------------------- Utility
let Utility = {};

Utility.generatePolygons = function () {
  let rnd = Math.floor(Math.random() * 2) + 3;
  let polyarr = [];

  for (let i = 0; i < rnd; i++) {
    polyarr.push(
      new Polygon({
        x: Math.floor(Math.random() * 380) + 20,
        y: Math.floor(Math.random() * 380) + 20,
        verticesAmount: Math.floor(Math.random() * 3) + 3,
        radius: Math.floor(Math.random() * 30) + 30,
        angle: Math.PI * 2,
        // Math.random() * Math.PI * 1.5,
      })
    );
  }

  return polyarr;
};

Utility.findNearestPolygonIndex = function (__polygons, selectedIndex) {
  let minDistance = null;
  let index = null;

  __polygons.forEach((e, i) => {
    e.showAxes = false;
    if (i != selectedIndex) {
      let d =
        Math.sqrt(
          (e.x - __polygons[selectedIndex].x) *
            (e.x - __polygons[selectedIndex].x) +
            (e.y - __polygons[selectedIndex].y) *
              (e.y - __polygons[selectedIndex].y)
        ) -
        (__polygons[selectedIndex].r + e.r);
      if (minDistance == null || d < minDistance) {
        minDistance = d;
        index = i;
      }
    }
  });

  return index;
};

let polygons;
let pointedPolygons;

let cursor;

let selectedPolygonIndex;
let nearestPolygonIndex;
let draggingPolygonIndex;
let firstCursorPos;
let firstPolygonPos;
let dragDistance;

// ----------------------- Init values & loop
function generate() {
  polygons = Utility.generatePolygons();
  pointedPolygons = [];

  cursor = { x: 0, y: 0 };

  selectedPolygonIndex = 0;
  nearestPolygonIndex = Utility.findNearestPolygonIndex(
    polygons,
    selectedPolygonIndex
  );
  draggingPolygonIndex = null;
  firstCursorPos = { x: 0, y: 0 };
  firstPolygonPos = { x: 0, y: 0 };
  dragDistance = { x: 0, y: 0 };

  polygons[selectedPolygonIndex].showAxes = true;
  polygons[nearestPolygonIndex].showAxes = true;
}

function loop() {
  requestAnimationFrame(loop);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  polygons.forEach((e) => e.draw());
  SAT.collide(polygons);
  Visualize.projections(
    polygons[selectedPolygonIndex],
    polygons[nearestPolygonIndex]
  );
  Visualize.hypo(polygons[selectedPolygonIndex], polygons[nearestPolygonIndex]);

  if (pointedPolygons.length > 0 && canvas.style.cursor != "pointer")
    canvas.style.cursor = "pointer";
  else if (canvas.style.cursor == "pointer" && pointedPolygons.length == 0)
    canvas.style.cursor = "default";

  if (draggingPolygonIndex != null) {
    polygons[draggingPolygonIndex].x =
      firstPolygonPos.x - (firstCursorPos.x - cursor.x);
    polygons[draggingPolygonIndex].y =
      firstPolygonPos.y - (firstCursorPos.y - cursor.y);
  }
}

function main() {
  generate();
  loop();
}

// ----------------------- Input
canvas.addEventListener("mousemove", (e) => {
  let canvasPos = canvas.getBoundingClientRect();

  cursor = {
    x: e.clientX - canvasPos.left,
    y: e.clientY - canvasPos.top,
  };

  polygons.forEach((e) => {
    let d = Math.sqrt(
      (e.x - cursor.x) * (e.x - cursor.x) + (e.y - cursor.y) * (e.y - cursor.y)
    );
    if (d - e.r < 0) {
      if (pointedPolygons.indexOf(e.id) == -1) pointedPolygons.push(e.id);
      e.hover = true;
    } else if (pointedPolygons.indexOf(e.id) != -1) {
      pointedPolygons.splice(pointedPolygons.indexOf(e.id), 1);
      e.hover = false;
    }
  });

  nearestPolygonIndex = Utility.findNearestPolygonIndex(
    polygons,
    selectedPolygonIndex
  );
  polygons[selectedPolygonIndex].showAxes = true;
  polygons[nearestPolygonIndex].showAxes = true;
});

canvas.addEventListener("mousedown", () => {
  if (pointedPolygons.length > 0) {
    draggingPolygonIndex = polygons.findIndex(
      (e) => e.id == pointedPolygons[0]
    );
    selectedPolygonIndex = draggingPolygonIndex;

    firstCursorPos.x = cursor.x;
    firstCursorPos.y = cursor.y;

    firstPolygonPos.x = polygons[draggingPolygonIndex].x;
    firstPolygonPos.y = polygons[draggingPolygonIndex].y;
  }
});

canvas.addEventListener("mouseup", () => {
  draggingPolygonIndex = null;
});

export default main;
