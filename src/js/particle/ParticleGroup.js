import { random } from "../../utils/utils";
import Vector from "../../utils/Vector";
import Particle from "./Particle";

export default class ParticleGroup {
  constructor(x, y, color, forceList) {
    this.color = color;
    this.pos = new Vector(x, y);
    this.total = 100;
    this.particles = [];
    this.forces = forceList;
    for (let i = 0; i < this.total; i++) {
      let particle = new Particle(
        this.pos.x,
        this.pos.y,
        random(1, 2),
        this.color
      );
      this.particles[i] = particle;
    }
  }
  isDead() {
    let isDead = true;
    for (let i = 0; i < this.total; i++) {
      let particle = this.particles[i];
      isDead = isDead && particle.isDead();
    }
    return isDead;
  }
  draw(ctx) {
    for (let i = 0; i < this.total; i++) {
      let particle = this.particles[i];
      for (let j = 0; j < this.forces.length; j++) {
        particle.applyForce(this.forces[j]);
      }
      particle.update();
      particle.draw(ctx);
    }
  }
}
