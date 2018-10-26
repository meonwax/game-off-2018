/// <reference path="phaser.d.ts"/>

import "phaser";
import { GameScene } from "./scenes/gameScene";

const config: GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 550,
  parent: "game",
  backgroundColor: "#444",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [GameScene]
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.onload = () => {
  let game = new Game(config);
};
