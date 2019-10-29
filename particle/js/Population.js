class Population {
  constructor(cells) {
    this.cells = cells;
  }

  addCell(cell) {
    this.cells.push(cell);
  }

  getOtherCells(index) {
    return this.cells.filter((otherCell, otherIndex) => index !== otherIndex)
  }
}