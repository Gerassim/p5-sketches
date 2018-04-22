class Bird {

  static get x () { return 50; };
  static get d () { return 32; };
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

  jump() {
    this.speed = this.bumpSpeed;
  }

  reset() {
    this.speed = 0;
    this.y = this.scene.height / 2;
  }

  draw() {
    fill(this.color);
    ellipse(Bird.x, this.y, Bird.d);
  }

  update() {
    this.speed = this.speed + Scene.g;
    this.y += this.speed;
  }
}