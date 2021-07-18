/* eslint-disable no-debugger */
// https://en.wikipedia.org/wiki/Tic-tac-toe

// [0 1 2]  [    x]
// [3 4 5]  [  o  ]
// [6 7 8]  [x    ]

import { Game } from './game';
import { Player } from './player';
import { Position } from './position';

const WINNING_POSITIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Right column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Left column
  [0, 4, 8], // Right to Left diagonal
  [2, 4, 6], // Left to Right diagonal
];

type NextMove = { position: Position };

export class ComputerPlayer {
  constructor(private readonly player: Player) {}

  public static create(player: Player) {
    return new ComputerPlayer(player);
  }

  public decideNextMove(game: Game): NextMove {
    const winningMove = this.getWinningMove(game);
    if (winningMove) {
      this.log('decideNextMove', 'Found winnable move');
      return winningMove;
    }

    const blockMove = this.getBlockMove(game);
    if (blockMove) {
      this.log('decideNextMove', 'Blocking opponent winnable move');
      return blockMove;
    }

    const forkMove = this.getForkMove(game);
    if (forkMove) {
      this.log('decideNextMove', 'Moving to create a Fork');
      return forkMove;
    }

    const forkBlockMove = this.getForkBlockMove(game);
    if (forkBlockMove) {
      this.log('decideNextMove', 'Moving to block opponent Fork');
      return forkBlockMove;
    }

    if (game.isEmpty()) {
      this.log(
        'decideNextMove',
        'Empty board - Placing piece in middle of board'
      );
      return { position: 4 };
    }

    if (game.isOpponentInCorner(this.player)) {
      this.log(
        'decideNextMove',
        'Player in corner - Placing piece in opposite corner'
      );
      return { position: this.getOppositeCornerPosition(game) };
    }
  }

  private getWinningMove(game: Game): NextMove | null {
    return this.getWinningMoveForPlayer(game, this.player);
  }

  private getBlockMove(game: Game): NextMove | null {
    const human = Player.getOppositePlayer(this.player);

    return this.getWinningMoveForPlayer(game, human);
  }

  private getWinningMoveForPlayer(game: Game, player: Player): NextMove | null {
    const playerIndices = game.getPlayerPositionIndices(player);
    let winningMove: NextMove | null;
    let it = 0;

    while (!winningMove && it < WINNING_POSITIONS.length) {
      const wp = WINNING_POSITIONS[it];

      if (playerIndices.filter((index) => wp.includes(index)).length === 2) {
        const candidate = wp.find(
          (pos) => !playerIndices.includes(pos)
        ) as Position;

        if (game.positions[candidate] === '')
          winningMove = { position: candidate };
      }

      it += 1;
    }

    return winningMove;
  }

  private getForkMove(game: Game): NextMove | null {
    return this.getForkMoveForPlayer({ game, player: this.player });
  }

  private getForkBlockMove(game: Game): NextMove | null {
    const opponent = Player.getOppositePlayer(this.player);
    const opponentForks = this.getPossibleForkPositionsForPlayer(
      game,
      opponent
    );

    if (opponentForks.length === 1) {
      return { position: opponentForks[0] };
    } else {
      // TODO: If no fork move is possible, try to get 2 in a row
      const move = this.getForkMoveForPlayer({
        game,
        player: this.player,
        excludedPositions: opponentForks,
      });
      debugger;
      return move;
    }
  }

  private getPossibleForkPositionsForPlayer(game: Game, player: Player) {
    let forkMove = this.getForkMoveForPlayer({ game, player });
    const excludedPositions: Position[] = [];

    while (forkMove !== null) {
      excludedPositions.push(forkMove.position);

      forkMove = this.getForkMoveForPlayer({ game, player, excludedPositions });
    }

    return excludedPositions;
  }

  private getForkMoveForPlayer({
    game,
    player,
    excludedPositions = [],
  }: {
    game: Game;
    player: Player;
    excludedPositions?: Position[];
  }): NextMove | null {
    const emptyPositions = game
      .getEmptyPositions()
      .filter((pos) => !excludedPositions.includes(pos));
    let forkMove = null;
    let epIt = 0;

    while (!forkMove && epIt < emptyPositions.length) {
      const position = emptyPositions[epIt];
      const possibility = game.addPlayerPiece(player, position);
      const playerIndices = possibility.getPlayerPositionIndices(player);
      let winnablePositions = 0;
      let wpIt = 0;

      while (winnablePositions < 2 && wpIt < WINNING_POSITIONS.length) {
        const wp = WINNING_POSITIONS[wpIt];
        if (
          playerIndices.filter((i) => wp.includes(i)).length === 2 &&
          wp.find((p) => possibility.positions[p] === '')
        ) {
          winnablePositions += 1;
        }

        wpIt += 1;
      }

      if (winnablePositions > 1) forkMove = { position };

      epIt += 1;
    }

    return forkMove;
  }

  private getOppositeCornerPosition(game: Game): Position {
    const human = Player.getOppositePlayer(this.player);

    if (game.positions[0] === human.symbol && game.positions[8] === '') {
      return 8;
    } else if (game.positions[2] === human.symbol && game.positions[6] === '') {
      return 6;
    } else if (game.positions[8] === human.symbol && game.positions[0] === '') {
      return 0;
    } else if (game.positions[6] === human.symbol && game.positions[2] === '') {
      return 2;
    } else {
      return 0;
    }
  }

  private log(method: string, message: string) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`ComputerPlayer - ${method}: ${message}`);
    }
  }
}
