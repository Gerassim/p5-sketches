let field;
let socket = new WebSocket("ws://node.dev:81");

socket.onmessage = function (ev) {
    field = new Field(JSON.parse(ev.data));
};

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(51);
    if(field !== undefined) {
        field.draw();
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        socket.send('up')
        // field.move(createVector(-1, 0));
    } else if (keyCode === DOWN_ARROW) {
        socket.send('down')
        // field.move(createVector(1, 0));
    } else if (keyCode === LEFT_ARROW) {
        socket.send('left')
        // field.move(createVector(0, -1));
    } else if (keyCode === RIGHT_ARROW) {
        socket.send('right')
        // field.move(createVector(0, 1));
    }
}

function Field(object) {
    this.field = [];

    this.fieldWidht = 400;
    this.fieldHeight = 400;

    for (let i = 0; i < object.length; i++) {
        this.field[i] = [];
        for (let j = 0; j < object[i].length; j++) {
            // console.log(object[i][j]);
            this.field[i][j] = new Cell(object[i][j]);
        }
    }
    this.cols = 4;
    this.rows = 4;

    this.cellWidth = 400 / this.cols;
    this.cellHeight = 400 / this.rows;

    this.draw = function () {
        for (let i = 0; i < object.length; i++) {
            for (let j = 0; j < object[i].length; j++) {
                fill(this.field[i][j].getColor());
                noStroke();
                rectMode(CORNER);
                rect(j * this.cellWidth, i * this.cellHeight,
                    this.cellWidth, this.cellHeight);
                fill(this.field[i][j].getTextColor());
                textSize(30);
                textAlign(CENTER, CENTER);
                rectMode(RADIUS);
                if (this.field[i][j].val > 0) {
                    text(this.field[i][j].getText(), j * this.cellWidth, i * this.cellHeight,
                        this.cellWidth, this.cellHeight)
                }
            }
        }
    }
}

function Cell(obj) {
    this.val = obj.val;

    this.colorPalette = [
        new Color('#000000', '#000000'),
        new Color('#1E90FF', '#000000'),
        new Color('#FF00FF', '#000000'),
        new Color('#FFD700', '#000000'),
        new Color('#008000', '#000000'),
        new Color('#98FB98', '#000000'),
        new Color('#FF8C00', '#000000'),
        new Color('#DC143C', '#000000'),
        new Color('#808000', '#000000'),
        new Color('#800080', '#000000'),
        new Color('#FF0000', '#000000'),
    ];

    this.getColor = function () {
        return this.colorPalette[this.val].cellColor;
    };

    this.getText = function () {
        return Math.pow(2, this.val);
    };

    this.isEmpty = function () {
        return !this.val > 0;
    };

    this.getTextColor = function () {
        return this.colorPalette[this.val].textColor;
    }
}

function Color(cellColor, textColor) {
    this.cellColor = cellColor;
    this.textColor = textColor;
}