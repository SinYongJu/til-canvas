import { CANVAS_ID, CANVAS_CONTEXT } from "../constants";

/**
 * canvas setup class
 */

class CanvasSetup {
  constructor() {
    this.isLoop = true;
    this.canvas = document.getElementById(CANVAS_ID);
    this.ctx = this.canvas.getContext(CANVAS_CONTEXT);

    this.isTrailing = false;
    this.scale = 1;
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.resizeCanvas();
    window.requestAnimationFrame(this.animate.bind(this));
  }
  resizeCanvas() {
    this.stageW = document.body.clientWidth;
    this.stageH = document.body.clientHeight;
    this.canvas.width = this.stageW * this.scale;
    this.canvas.height = this.stageH * this.scale;
    this.ctx.scale(this.scale, this.scale);
    this.resize();
  }
  animate(t) {
    !this.isTrailing && this.ctx.clearRect(0, 0, this.stageW, this.stageH);
    this.draw(this.ctx, t);
    if (this.isLoop) window.requestAnimationFrame(this.animate.bind(this));
  }
  noLoop() {
    this.isLoop = false;
  }
  /**
   * Abstract function
   *
   * @param {Number} stageW
   * stage width
   * @param {Number} stageH
   * stage height
   */
  resize(stageW, stageH) {}
  /**
   * Abstract function
   *
   * @param {Object} ctx
   *
   * canvas context
   */
  draw(ctx, t) {}
}

export default CanvasSetup;
