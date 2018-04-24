class Field {
  static get rows() { return 10 }
  static get cols() { return 10 }
  static get cellSize() { return 70 }
  static get width() { return this.cols * this.cellSize }
  static get height() { return this.rows * this.cellSize }

  constructor() {
    this.cells = [];

    for(let i = 0; i < Field.rows; i++) {
      let row = [];
      for(let j = 0; j < Field.cols; j++) {
        row.push(new Cell(j * Field.cellSize, i * Field.cellSize, j, i, this))
      }

      this.cells.push(row);
    }
  }

  getCellByCoordinates(x, y) {
    let i = Math.floor(x / Field.cellSize);
    let j = Math.floor(y / Field.cellSize);
    if(this.cells[j] && this.cells[j][i]) {
      return this.cells[j][i];
    } else {
      return undefined;
    }
  }

  draw() {
    for (let row of this.cells) {
      for(let cell of row) {
        cell.draw();
      }
    }
  }
}