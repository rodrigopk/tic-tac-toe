import { ComputerPlayer } from './computer-player';

import { Player } from './player';
import { Game } from './game';

describe('ComputerPlayer', () => {
  describe('create', () => {
    it('returns a class instance', () => {
      expect(ComputerPlayer.create(Player.create('o'))).toBeInstanceOf(
        ComputerPlayer
      );
    });
  });

  describe('decideNextMove', () => {
    const cp = Player.create('o');
    const computer = ComputerPlayer.create(cp);
    const opponent = Player.create('x');

    it('calls', () => {
      computer.decideNextMove(Game.create());
    });

    describe('given an empty board', () => {
      it('places a piece in the center of the board', () => {
        const nextMove = computer.decideNextMove(Game.create());

        expect(nextMove.position).toBe(4);
      });
    });

    describe('given there is a piece in the top left corner', () => {
      it('places a piece in the opposite corner', () => {
        const nextMove = computer.decideNextMove(
          Game.create().addPlayerPiece(opponent, 0)
        );

        expect(nextMove.position).toBe(8);
      });
    });

    describe('given there is a piece in the bottom left corner', () => {
      it('places a piece in the opposite corner', () => {
        const nextMove = computer.decideNextMove(
          Game.create().addPlayerPiece(opponent, 6)
        );

        expect(nextMove.position).toBe(2);
      });
    });

    describe('given there is a winnable move', () => {
      it('returns the winning move', () => {
        const game = Game.create()
          .addPlayerPiece(cp, 0)
          .addPlayerPiece(cp, 1)
          .addPlayerPiece(opponent, 3)
          .addPlayerPiece(opponent, 4)
          .addPlayerPiece(cp, 5)
          .addPlayerPiece(cp, 6)
          .addPlayerPiece(opponent, 7)
          .addPlayerPiece(opponent, 8);

        const nextMove = computer.decideNextMove(game);
        expect(nextMove.position).toBe(2);
      });

      it('returns a different winning move', () => {
        const game = Game.create()
          .addPlayerPiece(opponent, 0)
          .addPlayerPiece(cp, 1)
          .addPlayerPiece(opponent, 2)
          .addPlayerPiece(cp, 3)
          .addPlayerPiece(cp, 4)
          .addPlayerPiece(opponent, 6)
          .addPlayerPiece(opponent, 7);

        const nextMove = computer.decideNextMove(game);
        expect(nextMove.position).toBe(5);
      });
    });

    describe('given the opponent has a winnable move', () => {
      it('blocks the winnable move', () => {
        const game = Game.create()
          .addPlayerPiece(cp, 0)
          .addPlayerPiece(cp, 1)
          .addPlayerPiece(opponent, 2)
          .addPlayerPiece(opponent, 3)
          .addPlayerPiece(opponent, 4)
          .addPlayerPiece(cp, 6);

        const nextMove = computer.decideNextMove(game);
        expect(nextMove.position).toBe(5);
      });

      it('blocks a different winnable move', () => {
        const game = Game.create()
          .addPlayerPiece(cp, 0)
          .addPlayerPiece(cp, 1)
          .addPlayerPiece(opponent, 2)
          .addPlayerPiece(opponent, 4)
          .addPlayerPiece(cp, 5)
          .addPlayerPiece(opponent, 8);

        const nextMove = computer.decideNextMove(game);
        expect(nextMove.position).toBe(6);
      });
    });

    describe('given there is a possible fork', () => {
      it('moves to create a fork', () => {
        const game = Game.create()
          .addPlayerPiece(cp, 0)
          .addPlayerPiece(opponent, 3)
          .addPlayerPiece(opponent, 4)
          .addPlayerPiece(cp, 5);

        const nextMove = computer.decideNextMove(game);
        expect(nextMove.position).toBe(2);
      });

      it('moves to create a different fork', () => {
        const game = Game.create()
          .addPlayerPiece(cp, 0)
          .addPlayerPiece(opponent, 3)
          .addPlayerPiece(cp, 4)
          .addPlayerPiece(opponent, 8);

        const nextMove = computer.decideNextMove(game);
        expect(nextMove.position).toBe(1);
      });
    });

    // TODO: Block opponent Fork scenario
    describe('given the opponent has a possible fork', () => {
      describe('if there is only one possible opponent fork', () => {
        it('blocks the opponent fork', () => {
          const game = Game.create()
            .addPlayerPiece(opponent, 0)
            .addPlayerPiece(cp, 4)
            .addPlayerPiece(opponent, 5);

          const nextMove = computer.decideNextMove(game);
          expect(nextMove.position).toBe(2);
        });
      });

      describe('given the opponent has two possible forks', () => {
        describe('given there is a block that creates a winnable move', () => {
          it.only('moves to create a winnable move', () => {
            const game = Game.create()
              .addPlayerPiece(opponent, 2)
              .addPlayerPiece(cp, 4)
              .addPlayerPiece(opponent, 6);

            const nextMove = computer.decideNextMove(game);
            expect(nextMove.position).toBe(1);
          });
        });
      });
    });
  });
});
