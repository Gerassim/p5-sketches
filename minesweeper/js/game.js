let field;

function setup() {
  document.addEventListener('contextmenu', e => e.preventDefault());
  field = new Field();
  createCanvas(Field.width + 1, Field.height + 1);
}

function draw() {
  field.draw();
}

function doubleClicked() {
  if(!field.isGameOver) {
    let cell = field.getCellByCoordinates(mouseX, mouseY);

    field.openIfAllBombsFlagged(cell)
  }
}

function mousePressed() {
  if(!field.isGameOver) {
    let cell = field.getCellByCoordinates(mouseX, mouseY);
    if(cell) {
      if (mouseButton === 'left') {
        cell.open();
      } else if (mouseButton === 'right') {
        cell.flag();
      }
    }
  }
}