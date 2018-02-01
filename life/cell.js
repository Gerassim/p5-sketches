class Cell {
    deadColor() {
        return 50;
    };
    aliveColor() {
        return 200;
    };
    getColor() {
        if (this.alive) {
            return this.aliveColor()
        } else {
            return this.deadColor()
        }
    }

    getNeighboursSum() {
        let neighboursGrid = [
            [-1,-1], [0,-1], [1,-1],
            [-1,0], [1,0],
            [-1,1], [0,1], [1,1]
        ];
        let aliveCount = 0;
        
        for (let delta of neighboursGrid) {
            // console.log(this.grid.grid[this.cellX + delta[0]][this.cellY + delta[1]])
            if(this.grid.grid[this.cellX + delta[0]] !== undefined) {
                if(this.grid.grid[this.cellX + delta[0]][this.cellY + delta[1]] !== undefined){
                    // console.log(this.cellX + delta[0], this.cellY + delta[1],this.grid.grid[this.cellX + delta[0]][this.cellY + delta[1]].alive)
                    aliveCount += this.grid.grid[this.cellX + delta[0]][this.cellY + delta[1]].alive;  
                }
            }
        }

        return aliveCount;
    }

    constructor(x, y, w, alive = 0, grid, cellX, cellY) {
        this.x = x;
        this.y = y;
        this.alive = alive;
        this.w = w;
        this.grid = grid;
        this.cellX = cellX;
        this.cellY = cellY;
    }

    render() {
        noStroke();
        fill(this.getColor());
        rect(this.x, this.y, this.w, this.w);
        fill(0); textAlign(CENTER, CENTER)
        // text(this.cellX.toString() + ', ' + this.cellY.toString(), this.x, this.y, this.w, this.w)
    }
}