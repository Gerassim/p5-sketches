class Cell {

    constructor(x, y, w, alive = 0, grid, cellX, cellY, redraw = false, recalculate = false) {
        this.x = x;
        this.y = y;
        this.alive = alive;
        this.w = w;
        this.grid = grid;
        this.cellX = cellX;
        this.cellY = cellY;
        this.redraw = redraw;
        this.recalculate = recalculate;

        this.neighboursGrid = [
            [-1, -1], [0, -1], [1, -1],
            [-1, 0], [1, 0],
            [-1, 1], [0, 1], [1, 1]
        ];
    }

    deadColor() {
        return 230;
    };
    aliveColor() {
        return 0;
    };
    getColor() {
        if (this.alive) {
            return this.aliveColor()
        } else {
            return this.deadColor()
        }
    }

    neighboursCount() {
        let aliveCount = 0;
            // console.log(this.cellX, this.cellY);

        for (let delta of this.neighboursGrid) {
            if (this.grid.grid[this.cellX + delta[0]] !== undefined) {
                if (this.grid.grid[this.cellX + delta[0]][this.cellY + delta[1]] !== undefined) {
                    aliveCount += this.grid.grid[this.cellX + delta[0]][this.cellY + delta[1]].alive;
                }
            }
        }

        return aliveCount;
    }

    render() {
        if (this.redraw) {
            noStroke();
            fill(this.getColor());
            rect(this.x, this.y, this.w, this.w);
            fill(0); textAlign(CENTER, CENTER);
            this.changed = false;
            // text(this.cellX.toString() + ', ' + this.cellY.toString(), this.x, this.y, this.w, this.w)
        }
    }
}