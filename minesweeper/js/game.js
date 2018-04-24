let field;

function setup() {
  field = new Field();
  createCanvas(Field.width, Field.height);
}

function draw() {
  field.draw();
}

function mousePressed() {
  let cell = field.getCellByCoordinates(mouseX, mouseY);
  if(cell) {
    cell.open();
  }
}