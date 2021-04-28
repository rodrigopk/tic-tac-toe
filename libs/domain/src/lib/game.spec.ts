import { Game } from './game';
import { Player } from './player';

const playerOne = Player.create('x');
const playerTwo = Player.create('o');

describe('Game', () => {
  describe('create', () => {
    it('creates an empty game', () => {
      Game.create();
    });
  });

  describe('addPlayerPiece', () => {
    it('updates the positions in the game correctly', () => {
      const playerOne = Player.create('x');
      const game = Game.create();

      expect(game.addPlayerPiece(playerOne, 1).positions).toEqual([
        '',
        'x',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ]);
    });
  });

  describe('hasPlayerWon', () => {
    describe('given an empty game', () => {
      const game = Game.create();

      it('returns false for both possible players', () => {
        expect(game.hasPlayerWon(playerOne)).toBeFalsy();
        expect(game.hasPlayerWon(playerTwo)).toBeFalsy();
      });
    });

    describe('given a player has a row filled', () => {
      let game = Game.create();
      game = game.addPlayerPiece(playerOne, 0);
      game = game.addPlayerPiece(playerOne, 1);
      game = game.addPlayerPiece(playerOne, 2);

      it('returns true for the player who filled the row', () => {
        expect(game.hasPlayerWon(playerOne)).toBeTruthy();
        expect(game.hasPlayerWon(playerTwo)).toBeFalsy();
      });
    });

    describe('given a valid game', () => {
      let game = Game.create();
      game = game.addPlayerPiece(playerOne, 0);
      game = game.addPlayerPiece(playerOne, 1);
      game = game.addPlayerPiece(playerOne, 2);
      game = game.addPlayerPiece(playerTwo, 3);
      game = game.addPlayerPiece(playerOne, 4);
      game = game.addPlayerPiece(playerTwo, 5);
      game = game.addPlayerPiece(playerOne, 6);
      game = game.addPlayerPiece(playerTwo, 7);
      game = game.addPlayerPiece(playerOne, 8);

      it('returns true for the player who had a winning game', () => {
        expect(game.hasPlayerWon(playerOne)).toBeTruthy();
        expect(game.hasPlayerWon(playerTwo)).toBeFalsy();
      });
    });

    describe('given a game that player two wins', () => {
      let game = Game.create();
      game = game.addPlayerPiece(playerOne, 0);
      game = game.addPlayerPiece(playerOne, 1);
      game = game.addPlayerPiece(playerTwo, 2);
      game = game.addPlayerPiece(playerTwo, 3);
      game = game.addPlayerPiece(playerOne, 4);
      game = game.addPlayerPiece(playerTwo, 5);
      game = game.addPlayerPiece(playerOne, 6);
      game = game.addPlayerPiece(playerTwo, 7);
      game = game.addPlayerPiece(playerTwo, 8);

      it('returns true for the player who had a winning game', () => {
        expect(game.hasPlayerWon(playerOne)).toBeFalsy();
        expect(game.hasPlayerWon(playerTwo)).toBeTruthy();
      });
    });
  });

  describe('isGameOver', () => {
    describe('given an empty game', () => {
      const game = Game.create();

      it('returns false', () => {
        expect(game.isGameOver()).toBeFalsy();
      });
    });

    describe('given a full game', () => {
      let game = Game.create();
      game = game.addPlayerPiece(playerOne, 0);
      game = game.addPlayerPiece(playerOne, 1);
      game = game.addPlayerPiece(playerTwo, 2);
      game = game.addPlayerPiece(playerTwo, 3);
      game = game.addPlayerPiece(playerOne, 4);
      game = game.addPlayerPiece(playerTwo, 5);
      game = game.addPlayerPiece(playerOne, 6);
      game = game.addPlayerPiece(playerTwo, 7);
      game = game.addPlayerPiece(playerTwo, 8);

      it('returns true', () => {
        expect(game.isGameOver()).toBeTruthy();
      });
    });

    describe('given a partially filled game', () => {
      let game = Game.create();
      game = game.addPlayerPiece(playerOne, 0);
      game = game.addPlayerPiece(playerOne, 1);
      game = game.addPlayerPiece(playerTwo, 2);

      it('returns false', () => {
        expect(game.isGameOver()).toBeFalsy();
      });
    });
  });
});
