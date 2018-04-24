class Cell {
  constructor(x, y, i, j, field) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;

    this.closedColor = '#fff';
    this.mineColor = '#ff0000';
    this.emptyColor = '#808389';

    this.textColor = [
      '#0e00f9',
      '#00821d',
      '#ff0221',
      '#070080',
      '#870111',
      '#008182',
      '#870081',
      '#000000'
    ];

    this.field = field;
    this.isMine = random() > 0.9;
    this.isOpened = false;
  }

  open() {
    this.isOpened = true;

    if(this.isMine) {
      this.field.isGameOver = true;
    }

    if(this.minesAround === 0 && !this.isMine) {
      let neighbours = this.field.getCellNeighbours(this);

      for(let neighbourCell of neighbours.filter( cell => !cell.isOpened && !cell.isMine)) {
        neighbourCell.open()
      }
    }
  }

  setMinesAround(n) {
    this.minesAround = n;
  }

  draw() {
    textSize(32);
    if (this.isOpened) {
      if (this.isMine) {
        fill(this.mineColor);
        rect(this.x, this.y, Field.cellSize, Field.cellSize);
      } else {
        fill(this.emptyColor);
        rect(this.x, this.y, Field.cellSize, Field.cellSize);
        if(this.minesAround > 0) {
          fill(this.textColor[this.minesAround - 1]);
          textAlign(CENTER, CENTER);
          text(this.minesAround, this.x + Field.cellSize / 2, this.y + Field.cellSize / 2);
        }
      }
    } else {
      fill(this.closedColor);
      rect(this.x, this.y, Field.cellSize, Field.cellSize);
    }
  }
}