class Relation {
  constructor(cellId, maxForce, distanceFunction) {
    this.cellId = cellId;
    this.maxForce = maxForce;

    if (distanceFunction) {
      this.distanceFunction = distanceFunction
    } else {
      this.distanceFunction = (distance) => distance > 3 ? maxForce / Math.pow(map(distance, 0, 1000, 1, 2), 3) : 0;
    }
  }

  calculateForce(distance) {
    return this.distanceFunction(distance);
  }
}
