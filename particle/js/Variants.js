class Variants {
  constructor(genomes) {
    this.genomes = genomes;
  }

  getRandomGenome() {
    return _.sample(this.genomes);
  }
}