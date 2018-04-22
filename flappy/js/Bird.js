class Bird {

  static get x () { return 50; };
  static get w () { return 46; };
  static get h () { return 32; };
  static get normalColor() { return '#fff'};
  static get inPipeColor() { return '#5d8edd'};
  static get collisionColor() { return '#e82c0b'};

  constructor(scene) {
    this.scene = scene;
    this.speed = 0;
    this.y = this.scene.height / 2;
    this.bumpSpeed = -5;


    this.color = Bird.normalColor;
  }

  setImage(image) {
    this.image = image;
  }

  jump() {
    this.speed = this.bumpSpeed;
  }

  reset() {
    this.speed = 0;
    this.y = this.scene.height / 2;
  }

  draw() {
    if(!this.image) {
      fill(this.color);
      ellipse(Bird.x, this.y, Bird.w, Bird.h);
    } else {
      // fill(this.color);
      // rect(Bird.x - Bird.w / 2, this.y - Bird.h / 2, Bird.w, Bird.h);
      image(this.image, Bird.x - Bird.w / 2, this.y - Bird.h / 2);
    }
    // fill('#ff0000');
    // ellipse(Bird.x, this.y, 2);
  }

  update() {
    this.speed = this.speed + Scene.g;
    this.y += this.speed;
  }
}