import TerrainGenerator, { mapObjectToArray } from "./index";
import TGPluginComposer from "./plugins/composer/index";

const generator = new TerrainGenerator({
  seed: 1,
  detalization: 10,
  minHeight: 5,
  maxHeight: 10
});

generator.addPlugin(
  new TGPluginComposer({
    generator: new TerrainGenerator({
      seed: 1,
      detalization: 2,
      minHeight: 1,
      maxHeight: 2
    }),
    detalization: 16,
  })
);

for (var i = 0; i < 3; i++) {
  const { map, added, deleted } = generator.updateMap({
    userPosition: [i, 0, 0],
    renderDistance: 1,
    unrenderOffset: 1
  });

  console.log(deleted);
}
