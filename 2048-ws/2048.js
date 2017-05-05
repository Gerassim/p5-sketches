let fields = {}, playerId, roomId;
let socket = new WebSocket("ws://node.dev:81");

socket.onmessage = function (ev) {
    let data = JSON.parse(ev.data);

    if(data.fields !== undefined) {
        for (let id in data.fields) {
            if(fields[id] === undefined) {
                fields[id] = new Field(data.fields[id]);
            } else {
                fields[id].updateField(data.fields[id]);
            }
        }
        redraw();
    }

    if(data.playerId !== undefined) {
        playerId = data.playerId;
    }

    if(data.delete !== undefined) {
        delete fields[data.delete];
    }

    if(data.roomId !== undefined) {
        roomId = data.roomId;
    }
};

function setup() {
    noLoop();
    createCanvas(900, 400);
}

function draw() {
    background(51);

    for(let i in fields) {
        if(i == playerId) {
            fields[i].draw();
        } else {
            fields[i].draw(500);
        }
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
    console.log('Field create');
    this.fieldWidht = 400;
    this.fieldHeight = 400;

    for (let i = 0; i < object.field.length; i++) {
        this.field[i] = [];
        for (let j = 0; j < object.field[i].length; j++) {
            this.field[i][j] = new Cell(object.field[i][j]);
        }
    }

    this.cols = object.cols;
    this.rows = object.rows;

    this.cellWidth = this.fieldWidht / this.cols;
    this.cellHeight = this.fieldHeight / this.rows;

    this.draw = function (yOffset) {

        if(yOffset === undefined) {
            yOffset = 0;
        }

        for (let i = 0; i < this.field.length; i++) {
            for (let j = 0; j < this.field[i].length; j++) {
                fill(this.field[i][j].getColor());
                noStroke();
                rectMode(CORNER);
                rect(j * this.cellWidth + yOffset, i * this.cellHeight,
                    this.cellWidth, this.cellHeight);
                fill(this.field[i][j].getTextColor());
                textSize(30);
                textAlign(CENTER, CENTER);
                rectMode(RADIUS);
                if (this.field[i][j].val > 0) {
                    text(this.field[i][j].getText(), j * this.cellWidth + yOffset, i * this.cellHeight,
                        this.cellWidth, this.cellHeight)
                }
            }
        }
    }

    this.updateField = function(object) {
        for (let i = 0; i < object.field.length; i++) {
            this.field[i] = [];
            for (let j = 0; j < object.field[i].length; j++) {
                this.field[i][j] = new Cell(object.field[i][j]);
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