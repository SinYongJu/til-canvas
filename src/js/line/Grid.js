const OPTIONS = {
  color: "rgba(0,0,0,0.4)",
  isDash: false,
  dashDistance: [4, 2],
};

class Grid {
  constructor(gridX = 10, gridY = 10, options = OPTIONS) {
    this.gridX = gridX;
    this.gridY = gridY;

    let opt = {
      ...OPTIONS,
      ...options,
    };

    this.isDash = opt.isDash;
    this.dashDistance = opt.dashDistance;
    this.color = opt.color;

    this.getGrid();
  }

  getGrid() {
    this.gridXList = this.getGridList(this.stageW / 2, this.gridX);
    this.gridYList = this.getGridList(this.stageH / 2, this.gridY);
  }
  getGridList(transLated, grid) {
    if (transLated) {
      let gxList = [];
      for (let i = -transLated; i < transLated; i += grid) {
        gxList.push(i);
      }
      if (gxList.length > 1) {
        gxList.shift();
      }
      if (gxList[gxList.length - 1] > transLated) {
        gxList.pop();
      }
      return gxList;
    }
    return [];
  }
  resize(stageW, stageH) {
    this.stageW = stageW;
    this.stageH = stageH;
    this.getGrid();
  }
  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;

    if (this.isDash) {
      ctx.setLineDash(this.dashDistance);
      ctx.lineDashOffset = 0;
    }

    ctx.translate(this.stageW / 2, this.stageH / 2);
    for (let i = 0; i < this.gridYList.length; i++) {
      let gy = this.gridYList[i];
      ctx.beginPath();
      ctx.moveTo(-this.stageW / 2, gy);
      ctx.lineTo(this.stageW / 2, gy);
      ctx.stroke();
    }
    for (let i = 0; i < this.gridXList.length; i++) {
      let gx = this.gridXList[i];
      ctx.beginPath();
      ctx.moveTo(gx, -this.stageH / 2);
      ctx.lineTo(gx, this.stageH / 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

export default Grid;
