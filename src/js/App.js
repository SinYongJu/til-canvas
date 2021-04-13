import CanvasSetup from "../utils/CanvasSetup";
import { random } from "../utils/utils";
import Vector from "../utils/Vector";
import Firecracker from "./particle/Firecracker";
import Particle from "./particle/Particle";
import ParticleGroup from "./particle/ParticleGroup";

class App extends CanvasSetup {
  constructor() {
    super();
    this.total = 100;
    this.fireworks = [];
    // this.wind = new Vector(0.02, 0);

    for (let i = 0; i < this.total; i++) {
      this.fireworks[i] = new Firecracker(this.stageW, this.stageH);
    }
    this.resize();
  }
  resize() {
    if (this.fireworks && this.fireworks.length > 0) {
      for (let i = 0; i < this.total; i++) {
        this.fireworks[i].resize(this.stageW, this.stageH);
      }
    }
  }
  draw(ctx, t) {
    ctx.fillStyle = `rgba(0,0,0,0.8)`;
    ctx.fillRect(0, 0, this.stageW, this.stageH);
    ctx.rect(0, 0, this.stageW, this.stageH);
    ctx.fill();
    for (let i = 0; i < this.total; i++) {
      if (this.fireworks[i].isDead()) {
        this.fireworks[i].init();
      } else {
        this.fireworks[i].draw(ctx, t);
      }
    }
  }
}

export default App;
