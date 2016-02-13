/**
 * @module tiledmap
 */

/**
 * @class TiledMap
 * @constructor
 * @param {Number} sizeX     Number of horizontal tiles.
 * @param {Number} sizeY     Number of vertical tiles.
 * @param {Number} tileWidth Width/Height of a signle tile.
 */
var Map = function (sizeX, sizeY, tileWidth) {
  this.size = {};

  this.size.x = sizeX;
  this.size.y = sizeY;
  this.bufferSize = sizeX * sizeY * 4;

  this.tileWidth = tileWidth;

  this.autotiles = [];
};

Map.prototype.setTileset = function (img) {
  this.tileset = img;
};

Map.prototype.addAutotile = function (img) {
  var autotile = new Autotile(img, this.autotiles.length);

  autotile.compile();

  this.autotiles.push(autotile);
};

Map.prototype.drawTile = function (ctx, tile, x, y) {
  var xTileSource, yTileSource, xSource, ySource;

  xTileSource = tile % this.size.x;

  if (xTileSource === 0) {
    xTileSource = this.size.x;
  }

  yTileSource = Math.ceil(tile / this.size.x);

  xSource = (xTileSource - 1) * 32;
  ySource = (yTileSource - 1) * 32;

  ctx.drawImage(this.tileset, xSource, ySource, this.tileWidth, this.tileWidth,
    x, y, this.tileWidth, this.tileWidth);
};

Map.prototype.renderLayer = function (layer) {
  return this.renderFragment(layer, this.size.x);
};

Map.prototype.renderFragment = function (fragment, fragmentWidth) {
  var fragmentHeight = Math.ceil(fragment.length / fragmentWidth);
  var canvas = document.createElement('canvas'),
    ctx      = canvas.getContext('2d'),
    width    = fragmentWidth * this.tileWidth,
    height   = fragmentHeight * this.tileWidth,
    img      = new Image(),
    tile     = null,
    offset   = null,
    dx       = null,
    dy       = null;


  canvas.width = width;
  canvas.height = height;

  for (var x = 0; x < fragmentWidth; x += 1) {
    for (var y = 0; y < fragmentHeight; y += 1) {
      tile = fragment[y * fragmentWidth + x];

      dx = x * this.tileWidth;
      dy = y * this.tileWidth;

      if (tile > 0) {
        this.drawTile(ctx, tile, dx, dy);
      } else {
        tile = -tile;

        offset = Math.floor((tile - 1) / 256);

        if (!this.autotiles[offset]) {
          continue;
        }

        tile = (tile - 1) % 256;

        this.autotiles[offset].drawTile(ctx, tile, dx, dy);
      }
    }
  }

  return canvas;
};
