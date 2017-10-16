let tr;

function setup() {
    tr = new Triangle(new p5.Vector(450, 450), 300);
    createCanvas(900, 900);
    frameRate(60)
};

function draw() {
    background(51);
    tr.draw();
    tr.rotationAngle += 0.001;
}

function keyPressed()
{
    if (keyCode === UP_ARROW) {
        tr.increaseSide(10);
    } else if (keyCode === DOWN_ARROW) {
        tr.increaseSide(-10);
    }
}

class Triangle {
    constructor (centerPoint, sideSize) {
        this.centerPoint = centerPoint;
        this.sideSize = sideSize;
        this.outerRadius = Math.sqrt(3) * this.sideSize / 3;
        this.rotationAngle = 0;
    }

    draw() {
        stroke(255);
        noFill();
        strokeWeight(1);

        // triangle(
        //     this.centerPoint.x + this.outerRadius * Math.sin(this.rotationAngle), this.centerPoint.y - this.outerRadius * Math.cos(this.rotationAngle),
        //     this.centerPoint.x + this.outerRadius * Math.sin(this.rotationAngle + 2 * PI/3), this.centerPoint.y - this.outerRadius * Math.cos(this.rotationAngle + 2*PI/3),
        //     this.centerPoint.x + this.outerRadius * Math.sin(this.rotationAngle + 4 * PI/3), this.centerPoint.y - this.outerRadius * Math.cos(this.rotationAngle + 4*PI/3)
        // );

        strokeWeight(4);

        stroke(255, 0, 0);
        point(this.centerPoint.x, this.centerPoint.y);

        stroke(255, 0, 0);
        noFill();

        point(this.centerPoint.x + this.outerRadius * Math.sin(this.rotationAngle), this.centerPoint.y - this.outerRadius * Math.cos(this.rotationAngle));
        point(this.centerPoint.x + this.outerRadius * Math.sin(this.rotationAngle + 2 * PI/3), this.centerPoint.y - this.outerRadius * Math.cos(this.rotationAngle + 2*PI/3));
        point(this.centerPoint.x + this.outerRadius * Math.sin(this.rotationAngle + 4 * PI/3), this.centerPoint.y - this.outerRadius * Math.cos(this.rotationAngle + 4*PI/3));

        stroke(255);
        noFill();
        strokeWeight(1);

        arc(
            this.centerPoint.x + this.outerRadius * Math.sin(this.rotationAngle), this.centerPoint.y - this.outerRadius * Math.cos(this.rotationAngle),
            this.sideSize * 2,
            this.sideSize * 2,
            this.rotationAngle + PI/3,
            this.rotationAngle + 2*PI/3
        );
        arc(
            this.centerPoint.x + this.outerRadius * Math.sin(this.rotationAngle + 2 * PI/3), this.centerPoint.y - this.outerRadius * Math.cos(this.rotationAngle + 2*PI/3),
            this.sideSize * 2,
            this.sideSize * 2,
            this.rotationAngle + PI,
            this.rotationAngle + 4*PI/3
        );

        arc(
            this.centerPoint.x + this.outerRadius * Math.sin(this.rotationAngle + 4 * PI/3), this.centerPoint.y - this.outerRadius * Math.cos(this.rotationAngle + 4*PI/3),
            this.sideSize * 2,
            this.sideSize * 2,
            this.rotationAngle + 5 * PI/3,
            this.rotationAngle + 2 * PI
        );
    }

    increaseSide(ds) {
        this.sideSize += ds;
        this.outerRadius = Math.sqrt(3) * this.sideSize / 3;
    }
}