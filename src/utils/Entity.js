class Entity {
  constructor(x, y, value) {
    this.id = `${x},${y}`;
    this.x = x;
    this.y = y;
    this.value = value;
  }
}

export default Entity;
