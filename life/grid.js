class Grid {
    constructor() {
        this.grid = [];
        this.newGrid;
        this.getEmptyNewGrid();

        this.width = 600;
        this.height = 600;
        this.gridSize = 10;
        this.itemWidth = this.width / this.gridSize;
        this.itemHeight = this.height / this.gridSize;
        this.initialFill = 0;
        this.process = false;

        for (let x = 0; x < this.width; x += this.gridSize) {
            let cellX = x / this.gridSize;
            this.grid[cellX] = [];
            for (let y = 0; y < this.height; y += this.gridSize) {
                this.grid[cellX].push(
                    new Cell(x, y, this.gridSize, (Math.random(1) > this.initialFill) ? 0 : 1, this, cellX, this.grid[cellX].length, true, true)
                )
            }
        }
    }

    getEmptyNewGrid() {
        this.newGrid = [];

        for (let x = 0; x < this.width; x += this.gridSize) {
            let cellX = x / this.gridSize;
            this.newGrid[cellX] = [];
            for (let y = 0; y < this.height; y += this.gridSize) {
                this.newGrid[cellX].push(
                    new Cell(x, y, this.gridSize, (Math.random(1) > this.initialFill) ? 0 : 1, this, cellX, this.newGrid[cellX].length)
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
        this.getEmptyNewGrid();

        for (let row of this.grid) {
            for (let cell of row) {
                let newCell = this.newGrid[cell.cellX][cell.cellY];
                let neighboursCount = cell.neighboursCount();
                newCell.alive = cell.alive;

                if (cell.alive) {
                    if (neighboursCount < 2 || neighboursCount > 3) {
                        newCell.alive = 0;
                        newCell.redraw = true;
                    }
                } else {
                    if (neighboursCount === 3) {
                        newCell.alive = 1;
                        newCell.redraw = true;
                    }
                }
            }
        }

        this.grid = this.newGrid;
    }

    invertCell(x, y) {
        if (!this.process) {
            let cellX = Math.floor(x / this.gridSize),
                cellY = Math.floor(y / this.gridSize),
                cell = this.grid[cellX][cellY];

            cell.redraw = true;

            if (cell.alive) {
                cell.alive = 0
            } else {
                cell.alive = 1;
            }
        }
    }
}   