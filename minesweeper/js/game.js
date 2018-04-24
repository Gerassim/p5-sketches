let field;

function setup() {
  field = new Field();
  createCanvas(Field.width + 1, Field.height + 1);
}

function draw() {
  field.draw();
}

function mousePressed() {
  if(!field.isGameOver) {
    let cell = field.getCellByCoordinates(mouseX, mouseY);
    if(cell) {
      cell.open();
    }
  }
}