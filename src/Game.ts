/// <reference path="phaser.d.ts"/>

import "phaser";
import { LevelOne } from "./scenes/LevelOne";

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  parent: "game",
  backgroundColor: "#444",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [LevelOne]
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  let game: Phaser.Game = new Game(config);
};
