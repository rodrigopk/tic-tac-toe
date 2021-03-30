import { Game } from './game';
import { Player } from './player';

const playerOne = Player.create('x');
const playerTwo = Player.create('o');

describe('Game', () => {
  describe('create', () => {
    it('creates an empty board', () => {
      Game.create();
    });
  });

  describe('addPlayerPiece', () => {
    it('updates the positions in the board correctly', () => {
      const playerOne = Player.create('x');
      const board = Game.create();

      expect(board.addPlayerPiece(playerOne, 1).positions).toEqual([
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
    describe('given an empty board', () => {
      const board = Game.create();

      it('returns false for both possible players', () => {
        expect(board.hasPlayerWon(playerOne)).toBeFalsy();
        expect(board.hasPlayerWon(playerTwo)).toBeFalsy();
      });
    });

    describe('given a player has a row filled', () => {
      let board = Game.create();
      board = board.addPlayerPiece(playerOne, 0);
      board = board.addPlayerPiece(playerOne, 1);
      board = board.addPlayerPiece(playerOne, 2);

      it('returns true for the player who filled the row', () => {
        expect(board.hasPlayerWon(playerOne)).toBeTruthy();
        expect(board.hasPlayerWon(playerTwo)).toBeFalsy();
      });
    });

    describe('given a valid game', () => {
      let board = Game.create();
      board = board.addPlayerPiece(playerOne, 0);
      board = board.addPlayerPiece(playerOne, 1);
      board = board.addPlayerPiece(playerOne, 2);
      board = board.addPlayerPiece(playerTwo, 3);
      board = board.addPlayerPiece(playerOne, 4);
      board = board.addPlayerPiece(playerTwo, 5);
      board = board.addPlayerPiece(playerOne, 6);
      board = board.addPlayerPiece(playerTwo, 7);
      board = board.addPlayerPiece(playerOne, 8);

      it('returns true for the player who had a winning game', () => {
        expect(board.hasPlayerWon(playerOne)).toBeTruthy();
        expect(board.hasPlayerWon(playerTwo)).toBeFalsy();
      });
    });

    describe('given a game that player two wins', () => {
      let board = Game.create();
      board = board.addPlayerPiece(playerOne, 0);
      board = board.addPlayerPiece(playerOne, 1);
      board = board.addPlayerPiece(playerTwo, 2);
      board = board.addPlayerPiece(playerTwo, 3);
      board = board.addPlayerPiece(playerOne, 4);
      board = board.addPlayerPiece(playerTwo, 5);
      board = board.addPlayerPiece(playerOne, 6);
      board = board.addPlayerPiece(playerTwo, 7);
      board = board.addPlayerPiece(playerTwo, 8);

      it('returns true for the player who had a winning game', () => {
        expect(board.hasPlayerWon(playerOne)).toBeFalsy();
        expect(board.hasPlayerWon(playerTwo)).toBeTruthy();
      });
    });
  });

  describe('isGameOver', () => {
    describe('given an empty board', () => {
      const board = Game.create();

      it('returns false', () => {
        expect(board.isGameOver()).toBeFalsy();
      });
    });

    describe('given a full board', () => {
      let board = Game.create();
      board = board.addPlayerPiece(playerOne, 0);
      board = board.addPlayerPiece(playerOne, 1);
      board = board.addPlayerPiece(playerTwo, 2);
      board = board.addPlayerPiece(playerTwo, 3);
      board = board.addPlayerPiece(playerOne, 4);
      board = board.addPlayerPiece(playerTwo, 5);
      board = board.addPlayerPiece(playerOne, 6);
      board = board.addPlayerPiece(playerTwo, 7);
      board = board.addPlayerPiece(playerTwo, 8);

      it('returns true', () => {
        expect(board.isGameOver()).toBeTruthy();
      });
    });

    describe('given a partially filled board', () => {
      let board = Game.create();
      board = board.addPlayerPiece(playerOne, 0);
      board = board.addPlayerPiece(playerOne, 1);
      board = board.addPlayerPiece(playerTwo, 2);

      it('returns false', () => {
        expect(board.isGameOver()).toBeFalsy();
      });
    });
  });
});
