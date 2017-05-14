/**
 * Created by gerassum on 5/14/17.
 */
class Field {
    constructor(scene) {
        this.scene = scene;

        this.cols = 10;
        this.rows = 10;

        let cellWidth = this.scene.width / this.cols;
        let cellHeight = 300 / this.rows;

        this.field = [];
        for (let i = 0; i < this.rows; i++) {
            this.field[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.field[i][j] =
                    new Cell(
                        0,
                        cellWidth,
                        cellHeight,
                        createVector(j * cellWidth, i * cellHeight),
                        this.scene,
                    );
            }
        }
    }

    draw() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.field[i][j].draw();
            }
        }
    }
}