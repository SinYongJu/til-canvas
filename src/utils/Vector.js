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
  sub() {
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
    let x = Math.round(this.x);
    let y = Math.round(this.y);
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
}

export default Vector;
