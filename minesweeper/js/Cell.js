class Cell {
  constructor(x, y, i, j, field) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;

    this.closedColor = '#fff';
    this.mineColor = '#ff0000';
    this.emptyColor = '#808389';

    this.field = field;
    this.mine = random() > 0.9;
    this.isOpened = false;
  }

  open() {
    this.isOpened = true;
  }

  draw() {
    // if(this.mine) {
    //   fill('#ff0000')
    // } else {
    //   fill('#ffffff');
    // }
    noStroke();
    if (this.isOpened) {
      if (this.mine) {
        fill(this.mineColor)
      } else {
        fill(this.emptyColor)
      }
    } else {
      fill(this.closedColor);
    }

    rect(this.x, this.y, Field.cellSize, Field.cellSize);
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.j + ',' + this.i, this.x + Field.cellSize / 2, this.y + Field.cellSize / 2);
  }
}