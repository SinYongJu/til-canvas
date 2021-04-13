import { DEG_TO_RADIAN, PI2, RADIAN_TO_DEG } from "../constants";
import CanvasSetup from "../utils/CanvasSetup";
import { random } from "../utils/utils";
import Vector from "../utils/Vector";
import Attactor from "./naturecode/Attractor";
import Liquid from "./naturecode/Liquid";
import Mover from "./naturecode/Mover";
import SpaceShip from "./naturecode/SpaceShip";
import Stuff from "./naturecode/Stuff";
import Vehicle from "./naturecode/Vehicle";
class App extends CanvasSetup {
  constructor() {
    super();

    // this.initForce();
    this.resize();
    // this.gravity = new Vector(0, 0.1); //중력 고정
    // this.wind = new Vector(0.01, 0);

    this.keypressed = false;

    this.angle = 0;
    this.angleVel = 0.2;
    window.addEventListener("keyup", (e) => {
      if (e.code === "Space") {
        this.keypressed = true;
      }
    });
  }
  resize() {
    if (this.mover) {
      for (let i = 0; i < this.total; i++) {
        this.mover[i].resize(this.stageW, this.stageH);
      }
    }
    if (this.solar) {
      for (let i = 0; i < this.solarTotal; i++) {
        this.solar[i].resize(this.stageW, this.stageH);
      }
    }
    if (this.ship) {
      this.ship.resize(this.stageW, this.stageH);
    }
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(0,0,0,0.8)`;
    ctx.fillRect(0, 0, this.stageW, this.stageH);
  }
  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  drawTrigonometry() {
    for (let x = 0; x <= this.stageW; x += 24) {
      let y =
        100 * Math.sin(this.angle * DEG_TO_RADIAN + (PI2 / this.stageW) * x);
      if (x === 0) {
        ctx.moveTo(x, this.stageH / 2 + y);
      }
      ctx.lineTo(x, this.stageH / 2 + y);
      this.angle = this.angle + this.angleVel;

      ctx.beginPath();
      ctx.arc(x, y + this.stageH / 2, 24, 0, PI2, false);
      ctx.stroke();
    }
  }
  drawSpiral() {
    ctx.save();
    ctx.translate(this.stageW / 2, this.stageH / 2);
    //
    // ctx.moveTo(0, 0);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 20;
    for (let i = 0; i < 360; ) {
      let r = i;
      let x = r * Math.cos(((PI2 * i) / 360) * 8);
      let y = r * Math.sin(((PI2 * i) / 360) * 8);

      // if (i === 0) ctx.moveTo(x, y);
      // ctx.lineTo(x, y);
      ctx.beginPath();

      ctx.arc(x, y, 10, 0, PI2, false);
      ctx.fill();
      i += 0.1;
    }
    // ctx.stroke();
    ctx.restore();
    this.noLoop();
  }
  initForce() {
    this.total = 20;
    this.mover = [];
    this.solarTotal = 9;
    this.solar = [];
    this.frictionC = 0.01;
    this.dragC = 0.01;
    for (let i = 0; i < this.total; i++) {
      this.mover[i] = new Mover(
        random(20, this.stageW / 2),
        random((this.stageH / 7) * 2, this.stageH / 7),
        random(0.1, 3)
      );
    }

    this.attactor = new Attactor(this.stageW / 2, this.stageW / 4);
    for (let i = 0; i < this.solarTotal; i++) {
      this.solar[i] = new Mover(
        random(20, this.stageW),
        random((this.stageH / 7) * 2, this.stageH / 7),
        random(0.1, 2)
      );
    }
    this.liquid = new Liquid(
      0,
      (this.stageH / 4) * 2,
      this.stageW,
      (this.stageH / 4) * 2,
      this.dragC
    );
  }
  forceMover(ctx) {
    this.liquid.draw(ctx);

    for (let i = 0; i < this.total; i++) {
      let mover = this.mover[i];
      let gravity = new Vector(0, 0.1 * mover.mass); // 정확 성을 위해 중력에 질량을 곱한다

      // let friction = mover.vel.copy();
      // friction.mult(-1);
      // friction.normalize();
      // friction.mult(this.frictionC);

      if (this.liquid.isInside(mover)) {
        let drag = this.liquid.getDragForce(mover);
        mover.applyForce(drag);
      }

      // mover.applyForce(this.wind);
      mover.applyForce(gravity);
      // mover.applyForce(friction);
      mover.draw(ctx);
      mover.checkEdges();
    }
    for (let j = 0; j < this.solarTotal; j++) {
      let solar = this.solar[j];
      let attract = this.attactor.attract(solar);
      solar.applyForce(attract);
      solar.draw(ctx);
    }
  }
  initOcsilian() {
    this.mousePos = new Vector(this.stageW / 2, this.stageH / 2);

    this.handlerVector = new Vector(this.stageW / 2, this.stageH / 2);
    this.total = 20;
    this.mover = [];
    this.stuff = new Stuff(random(0, this.stageW), random(0, this.stageH), 5);

    this.ship = new SpaceShip(this.stageW / 2, this.stageH / 2, 5);
    this.attactor = new Attactor(this.stageW / 2, this.stageH / 2);
    this.vehicle = new Vehicle(this.stageW / 2, this.stageH / 2, 2);

    for (let i = 0; i < this.total; i++) {
      this.mover[i] = new Mover(
        random(0, this.stageW),
        random(0, this.stageH),
        random(0.2, 1)
      );
    }
    this.resize();
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        // this.handlerVector.add(new Vector(-5, 0));
        this.ship.left();
      }
      if (e.key === "ArrowRight") {
        // this.handlerVector.add(new Vector(5, 0));
        this.ship.right();
      }
      if (e.key === "ArrowDown") {
        this.ship.break();
      }
      if (e.key === "z") {
        let f = this.ship.dir.copy();
        f.mult(10);
        this.ship.force(f);
      }
    });
  }
  drawOcsilian() {
    this.attactor.draw(ctx);
    let attract = this.attactor.attract(this.stuff);
    this.stuff.applyForce(attract);
    this.stuff.update();
    this.stuff.updateAngle();
    this.stuff.draw(ctx);

    for (let i = 0; i < this.total; i++) {
      let mover = this.mover[i];
      // for (let j = 0; j < this.total; j++) {
      //   if (i !== j) {
      //     // this.mover[j].applyForce(mover.getAttract(this.mover[j]));
      //   }
      // }

      let attract = this.attactor.attract(mover);
      mover.applyForce(attract);
      mover.update();
      mover.draw(ctx);
    }

    this.vehicle.update(this.mousePos);
    this.vehicle.draw(ctx);

    this.ship.update();
    this.ship.draw(ctx);
  }
  rect(x, y, w, h) {
    this.ctx.fillStyle = "#FF0000";
    this.ctx.beginPath();
    let halfW = w / 2;
    let halfH = h / 2;
    let cx = x * w + halfW;
    let cy = y * h + halfH;
    this.ctx.moveTo(cx + halfW, cy + halfH);
    this.ctx.lineTo(cx + halfW, cy - halfH);
    this.ctx.lineTo(cx - halfW, cy - halfH);
    this.ctx.lineTo(cx - halfW, cy + halfH);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
  }
}

export default App;
