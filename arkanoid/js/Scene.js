/**
 * Created by gerassum on 5/14/17.
 */
class Scene {
    constructor(width, height) {
        this.isGameOver = false;
        this.width = width;
        this.height = height;

        this.field = new Field(this);
        this.platform = new Platform(this);
        this.ball = new Ball(this)
    }

    draw() {
        if (!this.isGameOver) {
            this.field.draw();
            this.platform.draw();
            this.ball.draw();
        } else {
            this.field.draw();
            this.platform.draw();
            this.ball.draw();
            fill(255);
            rectMode(CENTER);
            textAlign(CENTER, CENTER);
            textSize(70);
            text('GAME OVER', this.width / 2, this.height / 2, 300, 200);
            noLoop();
        }
    }

    gameOver() {
        this.isGameOver = true;
    }
}