let fields = {}, playerId, roomId;
let socket = new WebSocket("ws://node.dev:81");

socket.onmessage = function (ev) {
    let data = JSON.parse(ev.data);

    if (data.fields !== undefined) {
        for (let id in data.fields) {
            if (fields[id] === undefined) {
                fields[id] = new Field(data.fields[id].field, id);
                fields[id].name = data.fields[id].name;
            } else {
                fields[id].updateField(data.fields[id].field);
            }
        }
        redraw();
    }

    if (data.playerId !== undefined) {
        playerId = data.playerId;
    }

    if (data.delete !== undefined) {
        delete fields[data.delete];
        redraw();
    }

    if (data.roomId !== undefined) {
        roomId = data.roomId;
    }

    if (data.nameChange !== undefined) {
        fields[data.nameChange.playerId].name = data.nameChange.name;
        redraw();
    }
};

function setup() {
    noLoop();
    createCanvas(1400, 500);
    button = createButton("Send");
    button.mousePressed(function () {
        socket.send(JSON.stringify({name: input.value()}))
    });
    input = createInput();
}

function draw() {
    background(51);

    for (let i in fields) {
        fields[i].draw();
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        socket.send(JSON.stringify({move: 'up'}))
    } else if (keyCode === DOWN_ARROW) {
        socket.send(JSON.stringify({move: 'down'}))
    } else if (keyCode === LEFT_ARROW) {
        socket.send(JSON.stringify({move: 'left'}))
    } else if (keyCode === RIGHT_ARROW) {
        socket.send(JSON.stringify({move: 'right'}))
    }
}

function Field(object, id) {
    this.field = [];
    this.id = id;
    this.fieldWidht = 400;
    this.fieldHeight = 400;
    this.score = object.score;
    this.name = '';

    for (let i = 0; i < object.field.length; i++) {
        this.field[i] = [];
        for (let j = 0; j < object.field[i].length; j++) {
            this.field[i][j] = new Cell(object.field[i][j]);
        }
    }
    let place;

    if (playerId == this.id) {
        place = 0;
    } else {
        place = 1;
        for (let id in fields) {
            if (fields[id].place === place) {
                place++;
            }
        }
    }

    this.place = place;

    this.cols = object.cols;
    this.rows = object.rows;

    this.cellWidth = this.fieldWidht / this.cols;
    this.cellHeight = this.fieldHeight / this.rows;

    this.draw = function () {
        let yOffset = this.place * 500;

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

        fill(255);

        text(this.name + " " + this.score, 0 + yOffset, this.fieldHeight, this.fieldWidht, this.cellHeight)
    };

    this.updateField = function (object) {
        console.log(object);

        this.score = object.score;
        for (let i = 0; i < object.field.length; i++) {
            this.field[i] = [];
            for (let j = 0; j < object.field[i].length; j++) {
                this.field[i][j] = new Cell(object.field[i][j]);
            }
        }
        console.log(this)
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