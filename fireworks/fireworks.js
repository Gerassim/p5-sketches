/**
 * Created by gerassum on 28.12.16.
 */
var fireworks = [];
var fireworksLimit = 10;
var particlesLimit = 100;
var particlesMaxLifetime = 70;

function setup() {
    createCanvas(600, 600);
    // for (var i = 1; i < fireworksLimit; i++) {
    //     fireworks.push(new Firework());
    // }
}

function draw() {
    background(0);
    colorMode(HSB);
    if(random(1) < 0.1) {
        fireworks.push(new Firework());
    }
    for (var i = 0; i < fireworks.length; i++) {
        fireworks[i].applyForce(fireworks[i].g);
        fireworks[i].render();
    }
}

function Firework() {
    this.particles = [];
    this.g = createVector(0, 0.05);
    this.p = createVector(random(0, width), height - 1);
    this.v = createVector(0, -random(3, 7));
    this.dv = createVector(0, 0);
    this.r = 4;
    this.isFired = false;
    this.hu = floor(random(0, 255));

    this.applyForce = function (force) {
        this.dv.add(force);
    };

    this.render = function () {
        if(!this.isFired) {
            fill(this.hu, 255, 255);
            ellipse(this.p.x, this.p.y, this.r, this.r);
            this.update();
        } else {
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].render();
                this.particles[i].applyForce(this.g);
                this.particles[i].applyForce(this.particles[i].force);
                this.particles[i].update();
            }
        }
    };

    this.update = function () {
        this.v.add(this.dv);
        this.p.add(this.v);
        this.dv.mult(0);
        if(this.v.y >= 0) {
            this.isFired = true;

            for (var i = 1; i < particlesLimit; i++) {
                this.particles.push(new Particle(this.p.x, this.p.y, this.hu));
            }
        }
    }
}

function Particle(x, y, hu) {
    this.hu = hu;
    this.force = createVector(0, 0);
    this.p = createVector(x, y);
    // this.v = createVector(random(-0.5,0.5), -random(1,2));
    this.v = p5.Vector.random2D().mult(random(0.5, 1));
    this.dv = createVector(0, 0);
    this.life = 0;
    this.lifeTime = random(particlesMaxLifetime * 0.4, particlesMaxLifetime);

    this.applyForce = function (force) {
        this.dv.add(force);
    };

    this.render = function () {
        if(this.life < this.lifeTime) {
            stroke(this.hu, 255, map(this.life, 0, this.lifeTime, 255, 0));
            point(this.p.x, this.p.y);
            noStroke();
            this.update();
            this.life++;
        }
    };

    this.update = function () {
        this.v.add(this.dv);
        this.p.add(this.v);
        this.dv.mult(0);
    }
}