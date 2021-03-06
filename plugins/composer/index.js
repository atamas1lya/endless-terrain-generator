export default class TGPluginComposer {
  constructor({ generator, detalization }) {
    this.generator = generator;
    this.detalization = detalization;
  }

  generateMap(map) {
    Object.keys(map).forEach(x => {
      Object.keys(map[x]).forEach(z => {


        if (typeof map[x][z] === 'number') {
          map[x][z] = { initial: map[x][z] };

          const offsetI = this.detalization * x;
          const offsetJ = this.detalization * z;

          for (let i = 0; i < this.detalization; i++) {
            map[x][z][i] = {};

            for (let j = 0; j < this.detalization; j++) {
              map[x][z][i][j] = this.generator._generateNoise({
                x: i + offsetI,
                z: j + offsetJ,
              });
            }
          }
        }
      });
    });
  }

  onMapDidUpdate(_, { map, added, deleted }) {
    this.generateMap(added);
    this.generateMap(deleted);
  }
}
