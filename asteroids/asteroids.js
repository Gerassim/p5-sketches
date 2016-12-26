/**
 * Created by gerassum on 26.12.16.
 */
var canon;
var bullets = [];
var bulletsBuffer = [];
var asteroids = [];
var asteroidsBuffer = [];
var asteroidsInitialCount = 6;
var asteroidSizes = [200, 150, 130, 50];

function setup() {
    createCanvas(1200, 800);
    canon = new Canon();

    for (var j = 0; j < asteroidsInitialCount; j++) {
        asteroids.push(new Asteroid(
            random(0, width),
            random(0, height),
            floor(random(asteroidSizes.length))
        ));
    }
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

    // if (keyIsDown(CONTROL)) {
    //     canon.shoot();
    // }

    background(51);

    asteroidsBuffer = [];

    for (var j = 0; j < asteroids.length; j++) {
        if (asteroids[j].valid) {
            asteroidsBuffer.push(asteroids[j]);
        }

        if (asteroids[j].split) {
            asteroidsBuffer.push(new Asteroid(
                asteroids[j].pos.x,
                asteroids[j].pos.y,
                asteroids[j].size + 1
            ));
            asteroidsBuffer.push(new Asteroid(
                asteroids[j].pos.x,
                asteroids[j].pos.y,
                asteroids[j].size + 1
            ));
        }
    }

    asteroids = asteroidsBuffer;

    bulletsBuffer = [];

    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].valid) {
            bulletsBuffer.push(bullets[i]);
        }
    }

    bullets = bulletsBuffer;

    for (i = 0; i < bullets.length; i++) {
        bullets[i].render();
    }

    for (j = 0; j < asteroids.length; j++) {
        asteroids[j].render();
    }

    for (i = 0; i < bullets.length; i++) {
        for (j = 0; j < asteroids.length; j++) {
            if (
                dist(bullets[i].pos.x, bullets[i].pos.y, asteroids[j].pos.x, asteroids[j].pos.y) < asteroids[j].getRadius() &&
                bullets[i].valid
            ) {
                bullets[i].valid = false;
                asteroids[j].valid = false;
                asteroids[j].split = true;
            }
        }
    }

    canon.render();
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
    if (keyCode === CONTROL) {
        canon.shoot();
    }
}

function Canon() {
    this.pos = createVector(width / 2, height / 2);
    this.angle = 0;
    this.angleAcceleration = 0.05;

    this.speed = 0;
    this.maxSpeed = 5;
    this.minSpeed = 0;
    this.acceleration = 0.05;

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
        if (this.speed + this.acceleration <= this.maxSpeed) {
            this.speed += this.acceleration;
        }
    };

    this.decreaseSpeed = function () {
        if (this.speed - this.acceleration >= this.minSpeed) {
            this.speed -= this.acceleration;
        }
    };

    this.increaseAngle = function () {
        this.angle += this.angleAcceleration;
        if (this.angle > TWO_PI) {
            this.angle -= TWO_PI
        }
    };

    this.decreaseAngle = function () {
        if (this.angle < 0) {
            this.angle += TWO_PI;
        }
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
    this.speed = initialSpeed + 10;
    this.angle = angle;
    this.r = 4;
    this.valid = true;

    this.render = function () {
        // point(this.pos.x, this.pos.y);\
        if (this.valid) {
            noStroke();
            fill(255, 0, 0);
            ellipse(this.pos.x, this.pos.y, this.r, this.r);
            this.move();
        }
    };

    this.move = function () {
        this.pos.x += this.speed * cos(this.angle);
        this.pos.y -= this.speed * sin(this.angle);

        if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
            this.valid = false;
        }
    }
}

function Asteroid(x, y, size) {
    this.size = size;

    this.pos = createVector(x, y);
    this.speed = random(2, 3);
    this.angle = random(0, TWO_PI);
    this.valid = true;
    this.split = false;
    console.log('Create new asteroid');

    if (asteroidSizes[this.size] == undefined) {
        this.valid = false;
    }

    this.render = function () {
        noFill();
        stroke(255);

        ellipse(this.pos.x, this.pos.y, asteroidSizes[this.size]);

        // rect(
        //     this.pos.x - asteroidSizes[this.size][0] / 2,
        //     this.pos.y - asteroidSizes[this.size][1] / 2,
        //     asteroidSizes[this.size][0],
        //     asteroidSizes[this.size][1]
        // );

        this.move();
    };

    this.move = function () {
        var dx = this.speed * cos(this.angle);
        var dy = this.speed * sin(this.angle);

        if (this.pos.x + dx > width || this.pos.x + dx < 0) {
            this.angle = PI - this.angle;
        }

        if (this.pos.y - dy < 0 || this.pos.y - dy > height) {
            this.angle = TWO_PI - this.angle;
        }

        this.pos.x += this.speed * cos(this.angle);
        this.pos.y -= this.speed * sin(this.angle);
    };

    this.getRadius = function () {
        return asteroidSizes[this.size] / 2;
    };
}