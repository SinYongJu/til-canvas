const OPTIONS = {
  color: "rgba(0,0,0,0.4)",
  isDash: false,
  dashDistance: [4, 2],
  translateX: 0,
  translateY: 0,
};

class Grid {
  constructor(gridX = 10, gridY = 10, options = OPTIONS) {
    this.gridX = gridX;
    this.gridY = gridY;

    this.opt = {
      ...OPTIONS,
      ...options,
    };
    this.setOption(this.opt);
  }
  setOption(opt) {
    this.translateX = opt.translateX;
    this.translateY = opt.translateY;
    this.isDash = opt.isDash;
    this.dashDistance = opt.dashDistance;
    this.color = opt.color;

    this.gridStartX = 0 - opt.translateX;
    this.gridEndX = this.stageW - opt.translateX;
    this.gridStartY = 0 - opt.translateY;
    this.gridEndY = this.stageH - opt.translateY;
    this.getGrid();
  }
  getGrid() {
    this.gridXList = this.getGridList(this.stageW, this.gridX);
    this.gridYList = this.getGridList(this.stageH, this.gridY);
  }
  getGridList(range, grid) {
    let gxList = [];
    for (let i = 0; i < range; i += grid) {
      gxList.push(i);
    }
    let reversed = gxList
      .slice(1)
      .map((g) => -g)
      .reverse();
    let result = reversed.concat(gxList);
    return result;
  }
  resize(stageW, stageH, gridX, gridY, opt) {
    this.stageW = stageW;
    this.stageH = stageH;
    if (gridX) {
      this.gridX = gridX;
    }
    if (gridY) {
      this.gridY = gridY;
    }
    this.opt = { ...this.opt, ...opt };
    this.setOption(this.opt);
  }
  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;

    if (this.isDash) {
      ctx.setLineDash(this.dashDistance);
      ctx.lineDashOffset = 0;
    }

    ctx.translate(this.translateX, this.translateY);
    for (let i = 0; i < this.gridYList.length; i++) {
      let gy = this.gridYList[i];
      ctx.beginPath();
      ctx.moveTo(this.gridStartX, gy);
      ctx.lineTo(this.gridEndX, gy);
      ctx.stroke();
    }
    for (let i = 0; i < this.gridXList.length; i++) {
      let gx = this.gridXList[i];
      ctx.beginPath();
      ctx.moveTo(gx, this.gridStartY);
      ctx.lineTo(gx, this.gridEndY);
      ctx.stroke();
    }
    ctx.restore();
  }
}

export default Grid;
