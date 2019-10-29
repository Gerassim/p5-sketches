class Genome {
  constructor(id, color, relations) {
    this.id = id;
    this.color = color;
    this.relations = relations;
  }

  getRelation(id) {
    return this.relations.find((relation) => id === relation.cellId);
  }
}