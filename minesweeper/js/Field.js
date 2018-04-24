class Field {
  static get rows() { return 20 }
  static get cols() { return 20 }
  static get cellSize() { return 30 }
  static get width() { return this.cols * this.cellSize }
  static get height() { return this.rows * this.cellSize }

  constructor() {
    this.cells = [];
    this.isGameOver = false;
    this.mines = 0;
    this.gameMessage = 'GAME OVER';

    for(let i = 0; i < Field.rows; i++) {
      let row = [];
      for(let j = 0; j < Field.cols; j++) {
        row.push(new Cell(j * Field.cellSize, i * Field.cellSize, j, i, this))
      }

      this.cells.push(row);
    }

    this.cells.forEach( row => {
      row.forEach( cell => {
        if(cell.isMine) {
          this.mines++;
        }

        let neighbours = this.getCellNeighbours(cell), minesAround = 0;

        for (let neighborCell of neighbours) {
          if(neighborCell.isMine) {
            minesAround++;
          }
        }
        cell.setMinesAround(minesAround);
      })
    });
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
    this.cells.forEach( row => row.forEach( cell => cell.draw()));

    if(this.isGameOver) {
      textAlign(CENTER, CENTER);
      fill('#ff0000');
      textSize(32);
      text(this.gameMessage, Field.width / 2, Field.height / 2);
    }
  }
}