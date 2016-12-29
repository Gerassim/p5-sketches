/**
 * Created by gerassum on 28.12.16.
 */
var fireworks = [];

function setup() {
    createCanvas(1200, 600);
    colorMode(HSB);
    // for (var i = 1; i <= 30; i++) {
    //     fireworks.push(new Firework());
    // }
}

function draw() {
    background(0);
    // if (random(1) < 0.03) {
    //     fireworks.push(new Firework());
    // }
    if (fireworks.length < 1) {
        fireworks.push(new Firework());
    }
        for (var i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].draw();
            fireworks[i].update();

            if (!fireworks[i].hasSomethingToShow()) {
                fireworks.splice(i, 1);
            }
        }
}

function Firework() {
    this.bodyD = 5;
    this.maxBodySpeed = 7;
    this.minBodySpeed = 4;
    this.color = floor(random(255));
    this.body = new Particle(
        random(30, width - 30), height - 1, 0,
        random(-this.maxBodySpeed, -this.minBodySpeed)
    );
    this.body.setColor(this.color);
    this.body.draw = function (bodyD) {
        noStroke();
        fill(this.color, 255, 255);
        ellipse(this.p.x, this.p.y, bodyD, bodyD);
    };


    this.particles = [];
    this.particlesLimit = 500;
    // in frames
    this.particleMaxLifetime = 30;
    this.particleMaxSpeed = 7;
    this.g = createVector(0, 0.05);

    this.update = function () {
        if (this.body) {
            this.body.applyForce(this.g);
            this.body.update();
            if (this.body.v.y > 0) {
                for (var i = 0; i < this.particlesLimit; i++) {
                    var randomSpeed = p5.Vector.random2D().mult(random(this.particleMaxSpeed));
                    this.particles.push(new Particle(this.body.p.x, this.body.p.y, randomSpeed.x, randomSpeed.y));
                    this.particles[i].setLifetime(floor(random(this.particleMaxLifetime * 0.1, this.particleMaxLifetime)));
                    this.particles[i].setColor(this.color);
                    this.particles[i].draw = function () {
                        var b = map(this.lifeTime, 0, this.initialLifetime, 0, 255);
                        stroke(this.color, 255, b);
                        point(this.p.x, this.p.y);
                    }
                }
                this.body = null;
            }
        } else if (this.particles.length > 0) {
            for (var i = this.particles.length - 1; i >= 0; i--) {
                if (this.particles[i].isAlive()) {
                    this.particles[i].applyForce(this.g);
                    this.particles[i].update();
                    this.particles[i].lifeGoesOn();
                } else {
                    this.particles.splice(i, 1);
                }
            }
        }
    };

    this.draw = function () {
        if (this.body) {
            this.body.draw(this.bodyD);
        } else {
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        }
    };

    this.hasSomethingToShow = function () {
        return (this.body !== null || this.particles.length > 0);
    }
}

function Particle(x, y, vx, vy) {
    this.p = createVector(x, y);
    this.v = createVector(vx, vy);
    this.a = createVector(0, 0);

    this.applyForce = function (vector) {
        this.a.add(vector);
    };

    this.update = function () {
        this.v.add(this.a);
        this.p.add(this.v);
        this.a.mult(0);
    };

    // this.draw = function () {
    //     var b = map(this.lifeTime, 0, this.initialLifetime, 0, 255);
    //     stroke(this.color, 255, 255);
    //     point(this.p.x, this.p.y);
    // };

    this.setLifetime = function (lifeTime) {
        this.initialLifetime = lifeTime;
        this.lifeTime = lifeTime;
    };

    this.lifeGoesOn = function () {
        this.lifeTime--;
    };

    this.isAlive = function () {
        return this.lifeTime > 0;
    };

    this.setColor = function (color) {
        this.color = color;
    }
}