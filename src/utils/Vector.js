import { RADIAN_TO_DEG } from "../constants";
import { random } from "./utils";

class Vector {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z || 0;
  }
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
  }
  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
  }
  mult(n) {
    this.x = this.x * n;
    this.y = this.y * n;
    this.z = this.z * n;
  }
  div(n) {
    this.x = this.x / n;
    this.y = this.y / n;
    this.z = this.z / n;
  }
  mag() {
    return Math.sqrt(this.magSq());
  }
  magSq() {
    let x = this.x;
    let y = this.y;
    return x * x + y * y;
  }
  dist(vector) {
    let dx = this.x - vector.x;
    let dy = this.y - vector.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  normalize() {
    let mass = this.mag();
    if (mass !== 0) {
      this.div(mass);
    }
  }
  limit(max) {
    const mSq = this.magSq();
    if (mSq > max * max) {
      this.div(this.mag()); //normalize it
      this.mult(max);
    }
  }
  copy() {
    return new Vector(this.x, this.y);
  }
  // vertical
  normal() {
    return new Vector(this.y, -this.x);
  }
  dot(vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * radians = 2 * PI * (degrees / 360)
   * 이므로
   */

  /**
   * return radian
   */
  getAngle() {
    return Math.atan2(this.y, this.x);
    //  * RADIAN_TO_DEG;
  }
  /**
   *
   * @param {Vector} a
   * @param {Vector} b
   *
   * return radian
   */
  betweenAtoBAngle(a, b) {
    let dx = b.x - b.x;
    let dy = b.y - b.y;
    return Math.atan2(dy / dx);
  }
  // 외적
  static cross(v1, v2) {
    // vector1 x vector2

    /**
     * |a||b|sin()
     * 
     *  [       ]
          [a,b,],  => ad - bc 
          [c, d]
        [       ]

        vertical
    */
    return new Vector(v1.x * v2.y, v1.y * v2.x);
  }
  // 내적
  static dot(v1, v2) {
    // vector1 . vector2
    // v1, v2;

    return v1.x * v2.x + v1.y * v2.y;
  }
  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }
  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }
  // length 1 , random vector
  static random2d() {
    let x = random(-1, 1);
    let y = random(-1, 1);
    if (x === 0 && y === 0) {
      return Vector.random2d();
    }
    return new Vector(x, y);
  }
}

export default Vector;
