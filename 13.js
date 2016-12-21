var dots = new Dots(200, 200);

function setup() {
    createCanvas(dots.width, dots.height);
    dots.initiate();
}

function draw() {
    background(51);
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var pix = (x + y * width) * 4;
            // pixels[pix] = dots.currentDots[x][y].getRedColor();
            // pixels[pix + 1] = 0;
            // pixels[pix + 2] = dots.currentDots[x][y].getBlueColor();
            // pixels[pix + 3] = 255;

            var c = floor((dots.currentDots[x][y].a - dots.currentDots[x][y].b) * 255);
            c = constrain(c, 0, 255);

            pixels[pix] = c;
            pixels[pix + 1] = c;
            pixels[pix + 2] = c;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
    dots.generateNextState();
}

function Dot(a, b) {
    this.a = a;
    this.b = b;

    this.getRedColor = function () {
        return floor(this.a * 255);
    };

    this.getBlueColor = function () {
        return floor(this.b * 255);
    }
}

function Dots(width, height) {
    this.dA = 1.0;
    this.dB = 0.5;
    this.f = 0.055;
    this.k = 0.062;

    this.nearestCoeficient = 0.2;
    this.diaconalCoefitient = 0.05;
    this.selfCoefitient = -1;

    this.width = width;
    this.height = height;
    this.currentDots = [];
    this.nextDots = this.currentDots;

    this.initiate = function () {
        for (var x = 0; x < this.width; x++) {
            dots.currentDots[x] = [];
            for (var y = 0; y < this.height; y++) {
                dots.currentDots[x][y] = new Dot(1, 0);
            }
        }

        for (x = 100; x < 110; x++) {
            for (y = 100; y < 110; y++) {
                dots.currentDots[x][y] = new Dot(0, 1);
            }
        }
    };

    this.generateNextState = function () {
        for (var x = 1; x < this.width -1; x++) {
            for (var y = 1; y < this.height-1; y++) {
                this.nextDots[x][y].a = this.getNewAValue(x, y);
                this.nextDots[x][y].b = this.getNewBValue(x, y)
            }
        }
        this.currentDots = this.nextDots;
    };

    this.getNewAValue = function (x, y) {
        var dot = this.currentDots[x][y];
        return constrain(dot.a + (this.dA * this.laplace('a', x, y) - dot.a * dot.b * dot.b + this.f * (1 - dot.a)), 0,1);
    };

    this.getNewBValue = function (x, y) {
        var dot = this.currentDots[x][y];
        return constrain(dot.b + (this.dB * this.laplace('b', x, y) + dot.a * dot.b * dot.b - (this.k + this.f) * dot.b), 0,1);
    };

    this.laplace = function (what, x, y) {
        return this.currentDots[x][y][what] * this.selfCoefitient +
            this.getNearestNeighbours(what, x, y) * this.nearestCoeficient +
            this.getDiagonalNeighbours(what, x, y) * this.diaconalCoefitient;
    };

    this.getNearestNeighbours = function (what, x, y) {
        var sum = 0;
        var neighbours =  [
            this.currentDots[x + 1][y][what],
            this.currentDots[x - 1][y][what],
            this.currentDots[x][y + 1][what],
            this.currentDots[x][y - 1][what]
        ];

        for (var i = 0; i<neighbours.length; i++) {
            sum += neighbours[i];
        }

        return sum;
    };

    this.getDiagonalNeighbours = function (what, x, y) {
        var sum = 0;
        var neighbours =  [
            this.currentDots[x + 1][y + 1][what],
            this.currentDots[x - 1][y + 1][what],
            this.currentDots[x + 1][y - 1][what],
            this.currentDots[x - 1][y - 1][what]
        ];

        for (var i = 0; i<neighbours.length; i++) {
            sum += neighbours[i];
        }

        return sum;
    };
}