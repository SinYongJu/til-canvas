import Entity from "./Entity";

class Matrix {
  constructor(row, col, initialValue) {
    this.row = row;
    this.col = col;
    this.range = this.row * this.col;
    this.matrix = [];
    for (let i = 0; i < this.range; i++) {
      let col = i % this.col;
      let row = Math.floor(i / this.col);
      this.matrix[i] = new Entity(col, row, initialValue);
    }
  }
  getEntity(row, col) {
    let index = row * this.col + col;
    return this.matrix[index];
  }
  setValue(row, col, value) {
    let entity = this.getEntity(row, col);
    if (entity) {
      entity.value = value;
    }
  }
  /**
   *
   * @param {Array} matrix
   * ex) [
   *   0, 1, 0,
   *   1, 0, 1
   * ]
   */
  setValues(matrix) {
    if (matrix && matrix.length === this.range) {
      for (let i = 0; i < this.range; i++) {
        this.matrix[i].value = matrix[i];
      }
    }
  }
}

export default Matrix;
