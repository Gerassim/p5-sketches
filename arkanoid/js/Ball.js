/**
 * Created by gerassum on 5/14/17.
 */
class Ball {
    constructor(scene) {
        this.scene = scene;

        this.pos = createVector(
            this.scene.width / 2,
            2 * this.scene.height / 3
        );

        this.scene = scene;

        this.radius = 10;
        this.color = '#ff80ff';

        this.speed = createVector(random(-5, 5), random(-5, 0));
    }

    draw() {
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.radius);
        this.move();
    }

    move() {
        this.pos.add(this.speed);

        // Reflect from scene edges
        if (this.pos.x > scene.width || this.pos.x < 0) {
            this.speed.x = -this.speed.x;
        } else if (this.pos.y < 0) {
            this.speed.y = -this.speed.y;
        }

        if (this.pos.y > scene.height) {
            this.scene.gameOver();
        }

        //Reflect from platform
        if (
            this.pos.x > this.scene.platform.leftBorder() &&
            this.pos.x < this.scene.platform.rightBorder() &&
            this.pos.y > this.scene.platform.topBorder() &&
            this.pos.y < this.scene.platform.topBorder() + 5
        ) {
            this.speed.y = -this.speed.y;
        }

        //Reflect from field
        for (let i = 0; i < this.scene.field.rows; i++) {
            for (let j = 0; j < this.scene.field.cols; j++) {
                let cell = this.scene.field.field[i][j];
                if(cell.level > 0) {
                    if (
                        this.pos.x > cell.leftEdge() &&
                        this.pos.x < cell.rightEdge() &&
                        this.pos.y < cell.bottomEdge() &&
                        this.pos.y > cell.topEdge()
                    ) {
                        this.speed.y = -this.speed.y;
                        cell.level--;
                    }
                }
            }
        }
    }
}