class Field {
  static get rows() { return 20 }
  static get cols() { return 20 }
  static get cellSize() { return 30 }
  static get width() { return this.cols * this.cellSize }
  static get height() { return this.rows * this.cellSize }

  constructor() {
    this.cells = [];
    this.isGameOver = false;

    for(let i = 0; i < Field.rows; i++) {
      let row = [];
      for(let j = 0; j < Field.cols; j++) {
        row.push(new Cell(j * Field.cellSize, i * Field.cellSize, j, i, this))
      }

      this.cells.push(row);
    }

    for(let i = 0; i < Field.rows; i++) {
      for (let j = 0; j < Field.cols; j++) {
        let cell = this.cells[j][i], neighbours = this.getCellNeighbours(cell), minesAround = 0;

        for (let neighborCell of neighbours) {
          if(neighborCell.isMine) {
            minesAround++;
          }
        }
        cell.setMinesAround(minesAround);
      }
    }
  }

  getCellNeighbours(cell) {
    let res = [], i = cell.i, j = cell.j;
    if(this.cells[j - 1]) {
      res.push(this.cells[j - 1][i - 1]);
      res.push(this.cells[j - 1][i]);
      res.push(this.cells[j - 1][i + 1]);
    }

    res.push(this.cells[j][i + 1]);
    res.push(this.cells[j][i - 1]);

    if(this.cells[j + 1]) {
      res.push(this.cells[j + 1][i - 1]);
      res.push(this.cells[j + 1][i]);
      res.push(this.cells[j + 1][i + 1]);
    }

    return res.filter(cell => cell !== undefined);
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

    if(this.isGameOver) {
      textAlign(CENTER, CENTER);
      fill('#ff0000');
      textSize(32);
      text('GAME OVER', Field.width / 2, Field.height / 2);
    }
  }
}