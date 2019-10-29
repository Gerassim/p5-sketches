class Scene {

  constructor(width, height) {
    const cellIds = [1,2,3,4,5,6,7,8,9,10];
    const force = 0.05;
    this.width = width;
    this.height = height;
    this.population = new Population([]);
    this.variants = new Variants(cellIds.map((id) => {
      return new Genome(id, this.getRandomColor(), cellIds.map((relationId) => new Relation(relationId, _.random(-1,1, true) * force)));
    }));
  }

  addCell(cell) {
    this.population.addCell(cell);
  }

  draw() {
    this.population.cells.forEach((cell, index) => {
      cell.draw();
      this.population.getOtherCells(index).forEach((otherCell) => {
        cell.addForceFromOtherCell(otherCell)
      });
    })
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}