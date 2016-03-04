Tiledmap
========

YAGL Tiledmap is a "low level" library that allow you to render tiledmap for 2d orthogonal maps for your games. "low level" because the library let you load assets, does not stick to a particular format, and will not render directly to your scene.

YAGL Tiledmap help you render map layers or map layers fragments that you'll compose to render your map in WebGL or Canvas.

## Usage

Below a simple example of using YAGL Tiledmap

```
let layer = [
  0, 0, 1, 1,
  0, 0, 1, 1,
  0, 0, 1, 1,
  0, 0, 1, 1
];

let tileset = new Image();
tileset.src = '/path/to/tileset.png';
tileset.onload = () => {
  let tiledmap = new TiledMap(4, 4, 32);
  tiledmap.setTileset(tileset);
  
  // return a canvas object with the rendered layer
  // re-draw this canvas in another canvas or use it as webgl texture
  tiledmap.renderLayer(layer);
};
```
