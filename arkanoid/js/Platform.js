/**
 * Created by gerassum on 5/14/17.
 */
class Platform {
    constructor(scene) {
        this.color = '#00ff00';
        this.scene = scene;

        this.height = 16;
        this.width = 80;
        this.pos = createVector(this.scene.width / 2, this.scene.height - 25);
        this.speed = 5;
        this.directions ={
            left: createVector(-this.speed, 0),
            right: createVector(this.speed, 0)
        };
    }

    draw() {
        fill(this.color);
        noStroke();
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }

    move(direction) {
        this.pos.add(this.directions[direction]);

        if(
            this.pos.x - this.width/2 < 0 ||
            this.pos.x + this.width/2 > this.scene.width
        ) {
            this.pos.sub(this.directions[direction]);
        }
    }

    moveLeft() {
        this.move('left');
    }

    moveRight() {
        this.move('right');
    }

    leftBorder() {
        return this.pos.x - this.width/2;
    }

    rightBorder() {
        return this.pos.x + this.width/2;
    }

    topBorder() {
        return this.pos.y - this.height/2;
    }
}