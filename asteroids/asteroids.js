/**
 * Created by gerassum on 26.12.16.
 */
var canon;
var bullets = [];
function setup() {
    createCanvas(1200, 800);
    canon = new Canon()
}

function draw() {

    if (keyIsDown(UP_ARROW)) {
        canon.increaseSpeed();
    }

    if (keyIsDown(DOWN_ARROW)) {
        canon.decreaseSpeed();
    }

    if (keyIsDown(LEFT_ARROW)) {
        canon.increaseAngle();
    }

    if (keyIsDown(RIGHT_ARROW)) {
        canon.decreaseAngle();
    }

    if (keyIsDown(CONTROL)) {
        canon.shoot();
    }

    background(51);

    canon.render();

    for (var i = 0; i < bullets.length; i++) {
        bullets[i].render();
    }
}

function keyPressed() {
    // if (keyCode === UP_ARROW) {
    //     canon.increaseSpeed();
    // } else if (keyCode === DOWN_ARROW) {
    //     canon.decreaseSpeed();
    // } else if (keyCode === LEFT_ARROW) {
    //     canon.increaseAngle();
    // } else if (keyCode === RIGHT_ARROW) {
    //     canon.decreaseAngle();
    // } else if (keyCode === CONTROL) {
    //     canon.shoot();
    // }
}

function Canon() {
    this.pos = createVector(width / 2, height / 2);
    this.angle = 0;
    this.angleAcceleration = 0.1;

    this.speed = 0;
    this.maxSpeed = 3;
    this.minSpeed = 0;


    this.acceleration = 0.1;
    this.size = 10 * sqrt(3) / 3;

    this.render = function () {
        stroke(255);
        noFill();
        // point(this.pos.x, this.pos.y);

        // line(this.pos.x, this.pos.y, this.pos.x + this.size * cos(this.angle), this.pos.y - this.size * sin(this.angle));
        // line(this.pos.x, this.pos.y, this.pos.x + this.size * cos(this.angle + TWO_PI/3), this.pos.y - this.size * sin(this.angle + TWO_PI/3));
        // line(this.pos.x, this.pos.y, this.pos.x + this.size * cos(this.angle - TWO_PI/3), this.pos.y - this.size * sin(this.angle - TWO_PI/3));

        triangle(
            this.pos.x + this.size * cos(this.angle), this.pos.y - this.size * sin(this.angle),
            this.pos.x + this.size * cos(this.angle + TWO_PI / 3), this.pos.y - this.size * sin(this.angle + TWO_PI / 3),
            this.pos.x + this.size * cos(this.angle - TWO_PI / 3), this.pos.y - this.size * sin(this.angle - TWO_PI / 3)
        );

        this.move();
    };

    this.increaseSpeed = function () {
        if(this.speed + this.acceleration <= this.maxSpeed) {
            this.speed += this.acceleration;
        }
    };

    this.decreaseSpeed = function () {
        if(this.speed - this.acceleration >= this.minSpeed) {
            this.speed -= this.acceleration;
        }
    };

    this.increaseAngle = function () {
        this.angle += this.angleAcceleration;
    };

    this.decreaseAngle = function () {
        this.angle -= this.angleAcceleration;
    };

    this.shoot = function () {
        bullets.push(new Bullet(
            this.pos.x + this.size * cos(this.angle),
            this.pos.y - this.size * sin(this.angle),
            this.angle,
            this.speed
        ))
    };

    this.move = function () {
        this.pos.x += this.speed * cos(this.angle);
        this.pos.y -= this.speed * sin(this.angle);
    };
}

function Bullet(x, y, angle, initialSpeed) {
    this.pos = createVector(x, y);
    this.speed = initialSpeed + 5;
    this.angle = angle;
    this.r = 4;

    this.render = function () {
        // point(this.pos.x, this.pos.y);\
        noStroke();
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
        this.move();
    };

    this.move = function () {
        this.pos.x += this.speed * cos(this.angle);
        this.pos.y -= this.speed * sin(this.angle);
    }
}