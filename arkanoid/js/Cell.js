/**
 * Created by gerassum on 5/14/17.
 */
class Cell {
    constructor(level, width, height, pos, scene) {
        this.maxLevel = 5;
        this.scene = scene;

        /*TODO create draw with padding to separate rectangles*/
        this.padding = 5;

        if (level === 0) {
            level = this.getRandomLevel();
        }
        this.level = level;

        this.width = width;
        this.height = height;

        this.pos = pos;

        this.colors = [
            '#333333',
            '#fdc22d',
            '#ff6620',
            '#f90f1b',
            '#5cc9c8',
            '#3075a3'
        ]
    }

    getRandomLevel() {
        return Math.floor(Math.random() * this.maxLevel + 1);
    }

    draw() {
        fill(this.colors[this.level]);
        noStroke();
        rectMode(CORNER);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    bottomEdge() {
        return this.pos.y + this.height;
    }

    leftEdge() {
        return this.pos.x;
    }

    rightEdge() {
        return this.pos.x + this.width;
    }

    topEdge() {
        return this.pos.y;
    }
}