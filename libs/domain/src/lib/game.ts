// [0 1 2]
// [3 4 5]
// [6 7 8]

import { Player } from './player';

type Position = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class Game {
  private WINNING_POSITIONS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Right column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Left column
    [0, 4, 8], // Right to Left diagonal
    [2, 4, 6], // Left to Right diagonal
  ];

  private constructor(public readonly positions: string[]) {}

  public static create() {
    return new Game(Array(9).fill(''));
  }

  public hasPlayerWon(player: Player) {
    const playerIndices = this.getPlayerPositionIndices(player);

    let playerHasWon = false;
    let it = 0;

    while (!playerHasWon && it < this.WINNING_POSITIONS.length) {
      const wp = this.WINNING_POSITIONS[it];

      if (wp.every((i) => playerIndices.includes(i))) {
        playerHasWon = true;
      }

      it += 1;
    }

    return playerHasWon;
  }

  private getPlayerPositionIndices(player: Player) {
    return this.positions
      .map((val, index) => (val === player.symbol ? index : null))
      .filter((val) => val !== null);
  }

  public addPlayerPiece(player: Player, position: Position) {
    const newPositions = [...this.positions];
    newPositions.splice(position, 1, player.symbol);

    return new Game(newPositions);
  }

  public isGameOver() {
    if (this.positions.some((val) => val === '')) return false;

    return true;
  }
}
