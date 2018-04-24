class Cell {
  constructor(x, y, i, j, field) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    
    this.isFlagged = false;
    this.isMine = random() > 0.9;
    this.isOpened = false;

    this.bgColor = {
      'closed': '#fff',
      'mine' : '#ff0000',
      'empty' : '#808389',
      'flagged' : '#ed4eda',
    };

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
  }

  flag() {
    this.isFlagged = !this.isFlagged;
  }

  open() {
    if(this.isFlagged) {
      return;
    }

    this.isOpened = true;

    if(this.isMine) {
      this.field.isGameOver = true;
      return;
    }

    let placesToOpen = 0;

    this.field.cells.forEach( row => {
      row.forEach( cell => {
        if(!cell.isOpened) {
          placesToOpen++;
        }
      })
    });

    if(placesToOpen === this.field.mines) {
      this.field.isGameOver = true;
      this.field.gameMessage = 'YOU WIN';
      return;
    }

    if(this.minesAround === 0 && !this.isMine) {
      let neighbours = this.field.getCellNeighbours(this);
      neighbours.filter( cell => !cell.isOpened && !cell.isMine).forEach( cell => cell.open() )
    }
  }

  setMinesAround(n) {
    this.minesAround = n;
  }

  draw() {
    textSize(18);
    if (this.isOpened) {
      if (this.isMine) {
        fill(this.bgColor.mine);
        rect(this.x, this.y, Field.cellSize, Field.cellSize);
      } else {
        fill(this.bgColor.empty);
        rect(this.x, this.y, Field.cellSize, Field.cellSize);
        if(this.minesAround > 0) {
          fill(this.textColor[this.minesAround - 1]);
          textAlign(CENTER, CENTER);
          text(this.minesAround, this.x + Field.cellSize / 2, this.y + Field.cellSize / 2);
        }
      }
    } else {
      if(this.isFlagged) {
        fill(this.bgColor.flagged);
      } else {
        fill(this.bgColor.closed);
      }
      rect(this.x, this.y, Field.cellSize, Field.cellSize);
    }
  }
}