class Grid {
    constructor() {
        this.grid = [];
        this.width = 600;
        this.height = 600;
        this.gridSize = 10;
        this.itemWidth = this.width / this.gridSize;
        this.itemHeight = this.height / this.gridSize;

        console.log(this.itemWidth, this.itemHeight)
        for (let x = 0; x < this.width; x += this.gridSize) {
            let cellX = x / this.gridSize;
            this.grid[cellX] = [];
            for (let y = 0; y < this.height; y += this.gridSize) {
                this.grid[cellX].push(
                    new Cell(x, y, this.gridSize, (Math.random(1) < 0.9) ? 0:1, this, cellX, this.grid[cellX].length)
                )
            }
        }
    }

    addCell(cell) {
        this.grid.push(cell);
    }

    render() {
        for (let row of this.grid) {
            for (let cell of row) {
                cell.render();
            }
        }
    }

    recalculate() {
        for (let row of this.grid) {
            for(let cell of row) {                
                let neighboursCount = cell.getNeighboursSum();
                // console.log(cell.cellX, cell.cellY, cell.getNeighboursSum());
                if(cell.alive) {
                    if(neighboursCount < 2 || neighboursCount > 3) {
                        cell.alive = 0;
                    }
                } else {
                    if(neighboursCount == 3) {
                        cell.alive = 1;
                    }
                }   
            }
        }
    }
}   