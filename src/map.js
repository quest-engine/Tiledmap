
var Map = function (sizeX, sizeY, tileWidth) {
  this.size = {};

  this.size.x = sizeX;
  this.size.y = sizeY;

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
  var canvas = document.createElement('canvas'),
    ctx      = canvas.getContext('2d'),
    width    = this.size.x * this.tileWidth,
    height   = this.size.y * this.tileWidth,
    img      = new Image(),
    tile     = null,
    offset   = null,
    dx       = null,
    dy       = null;

  canvas.width = width;
  canvas.height = height;

  for (var x = 0; x < this.size.x; x += 1) {
    for (var y = 0; y < this.size.y; y += 1) {
      tile = layer[y * this.size.x + x];

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