/**
 * Created by gerassum on 21.12.16.
 */
var d = 40;
var cols, rows;
var snake, food;
var fr = 10;

function setup() {
    createCanvas(800, 800);
    cols = width / d;
    rows = height / d;
    frameRate(fr);
    snake = new Snake();
    food = new Food();
}

function draw() {
    background(0);
    noStroke();
    snake.move();
    snake.draw();
    food.draw();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.setDirection({x: 0, y: -1});
    } else if (keyCode === DOWN_ARROW) {
        snake.setDirection({x: 0, y: 1})
    } else if (keyCode === LEFT_ARROW) {
        snake.setDirection({x: -1, y: 0})
    } else if (keyCode === RIGHT_ARROW) {
        snake.setDirection({x: 1, y: 0})
    }
}

function Snake() {
    this.direction = {x: 1, y: 0};
    this.body = [];
    this.color = 200;
    this.eatenFood = [];

    this.body.push({x: floor(rows / 2), y: floor(cols / 2)});

    this.setDirection = function (direction) {
        if (this.direction.x + direction.x == 0 || this.direction.y + direction.y == 0) {
            return;
        } else {
            this.direction = direction;
        }
    };


    this.draw = function () {
        fill(this.color);
        // stroke(255, 0, 0);
        for (var i = 0; i < this.body.length; i++) {
            rect(this.body[i].x * d, this.body[i].y * d, d, d);
        }
    };

    this.checkSelfCollision = function (newHead) {
        for(var i = 0; i<this.body.length; i++) {
            if(newHead.x == this.body[i].x && newHead.y == this.body[i].y) {
                noLoop();
            }
        }
    };

    this.move = function () {

        var head = this.body[0];

        if (this.eatenFood[0] && this.body[this.body.length - 1].x == this.eatenFood[0].x && this.body[this.body.length - 1].y == this.eatenFood[0].y) {
            this.eatenFood.shift();
        } else {
            this.body.pop();
            console.log('Not grow');
        }

        var newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };

        if(newHead.x >= cols) {
            newHead.x -= cols;
        }

        if(newHead.x < 0) {
            newHead.x += cols;
        }

        if(newHead.y >= rows) {
            newHead.y -= rows;
        }

        if(newHead.y < 0) {
            newHead.y += rows;
        }

        this.checkSelfCollision(newHead);

        this.body.unshift(newHead);

        if (this.body[0].x == food.x && this.body[0].y == food.y) {
            this.eatenFood.push(food);
            food = new Food();
            frameRate(fr++);
        }
    }
}

function Food() {
    this.x = floor(random(cols));
    this.y = floor(random(rows));
    this.color = 255;

    this.draw = function () {
        fill(this.color, 0, 0);
        rect(this.x * d, this.y * d, d, d);
    }
}