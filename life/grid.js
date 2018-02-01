class Grid {
    constructor() {
        this.grid = [];
        this.width = 600;
        this.height = 600;
        this.gridSize = 5;
        this.itemWidth = this.width / this.gridSize;
        this.itemHeight = this.height / this.gridSize;
        this.initialFill = 0.04;

        for (let x = 0; x < this.width; x += this.gridSize) {
            let cellX = x / this.gridSize;
            this.grid[cellX] = [];
            for (let y = 0; y < this.height; y += this.gridSize) {
                this.grid[cellX].push(
                    new Cell(x, y, this.gridSize, (Math.random(1) > this.initialFill) ? 0:1, this, cellX, this.grid[cellX].length)
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
        let recalculates = 0;

        for (let row of this.grid) {
            for(let cell of row) {
                if(cell.recalculate) {
                    recalculates++;
                    let neighboursCount = cell.getNeighboursSum();
                    if(cell.alive) {
                        if(neighboursCount < 2 || neighboursCount > 3) {
                            cell.alive = 0;
                            cell.redraw = true;
                            cell.recalculate = true;
                            cell.setNeighboursRecalculate();
                        } else {
                            cell.recalculate = false;
                        }
                    } else {
                        if(neighboursCount == 3) {
                            cell.alive = 1;
                            cell.redraw = true;
                            cell.recalculate = true;
                            cell.setNeighboursRecalculate();
                        } else {
                            cell.recalculate = false;
                        }
                    }   
                }              
            }
        }
        // console.log(recalculates);
    }
}   