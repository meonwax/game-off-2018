import StaticTilemapLayer = Phaser.Tilemaps.StaticTilemapLayer;
import Tilemap = Phaser.Tilemaps.Tilemap;
import Tileset = Phaser.Tilemaps.Tileset;

export class LevelOne extends Phaser.Scene {

  constructor() {
    super({
      key: "level1"
    });
  }

  preload() {
    this.load.image("tileset", "assets/images/tileset.png");
    this.load.tilemapTiledJSON('level1', 'assets/maps/level1.json');
  }

  create() {
    const map: Tilemap = this.make.tilemap({ key: 'level1', tileWidth: 32, tileHeight: 32 });
    const tileset: Tileset = map.addTilesetImage("tileset");
    const layer: StaticTilemapLayer = map.createStaticLayer(0, tileset, 0, 0);
  }

  update() {
  }
}