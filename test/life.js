'use strict';

let expect = require('chai').expect;

describe('life', function () {
  let life = require('../lib/life');

  it('should create a board', function () {
    let lifeGame = life();

    expect(lifeGame.size).to.equals(0);
    expect(lifeGame.board).to.length(0);
  });

  describe('#setBoard', function () {
    let lifeGame;

    beforeEach(function () {
      lifeGame = life();
    });

    it('should throw an error if board is not square', function () {
      expect(lifeGame.setBoard.bind(lifeGame, [
        0, 0, 0,
        1, 0, 1
      ])).to.throw('Invalid board input');
    });

    it('should set board size', function () {
      lifeGame.setBoard([
        0, 1, 0,
        1, 0, 0,
        0, 1, 0
      ]);

      expect(lifeGame.size).to.eql(3);
    });

    it('should set board values', function () {
      lifeGame.setBoard([
        0, 1, 0,
        1, 0, 0,
        0, 1, 0
      ]);

      expect(lifeGame.board).to.eql([
        0, 1, 0,
        1, 0, 0,
        0, 1, 0
      ]);
    });
  });

  describe('#getCell', function () {
    let lifeGame;

    beforeEach(function () {
      lifeGame = life();
      lifeGame.setBoard([
        0, 1, 0,
        1, 0, 1,
        0, 0, 1
      ]);
    });

    it('should return cell at given position', function () {
      expect(lifeGame.getCell(0, 0), '(0, 0)').to.equals(0);
      expect(lifeGame.getCell(0, 1), '(0, 1)').to.equals(1);
      expect(lifeGame.getCell(0, 2), '(0, 2)').to.equals(0);
      expect(lifeGame.getCell(1, 0), '(1, 0)').to.equals(1);
      expect(lifeGame.getCell(1, 1), '(1, 1)').to.equals(0);
      expect(lifeGame.getCell(1, 2), '(1, 2)').to.equals(1);
      expect(lifeGame.getCell(2, 0), '(2, 0)').to.equals(0);
      expect(lifeGame.getCell(2, 1), '(2, 1)').to.equals(0);
      expect(lifeGame.getCell(2, 2), '(2, 2)').to.equals(1);
    });

    describe('out of bounds', function () {
      it('should return 0', function () {
        expect(lifeGame.getCell(10, 10)).to.eql(0);
        expect(lifeGame.getCell(1 , 10)).to.eql(0);
        expect(lifeGame.getCell(10, 1 )).to.eql(0);

        expect(lifeGame.getCell(-1, -1)).to.eql(0);
        expect(lifeGame.getCell( 2, -1)).to.eql(0);
        expect(lifeGame.getCell(-1,  1 )).to.eql(0);
      });
    });
  });

  describe('#getNeighbourCount', function () {
    let lifeGame;

    beforeEach(function () {
      lifeGame = life();
      lifeGame.setBoard([
        0, 1, 0,
        1, 0, 0,
        1, 0, 0
      ]);
    });

    it('should count cell neighbour', function () {
      expect(lifeGame.getNeighbourCount(0, 0), '(0, 0)').to.equals(2);
      expect(lifeGame.getNeighbourCount(0, 1), '(0, 1)').to.equals(1);
      expect(lifeGame.getNeighbourCount(0, 2), '(0, 2)').to.equals(1);
      expect(lifeGame.getNeighbourCount(1, 0), '(1, 0)').to.equals(2);
      expect(lifeGame.getNeighbourCount(1, 1), '(1, 1)').to.equals(3);
      expect(lifeGame.getNeighbourCount(1, 2), '(1, 2)').to.equals(1);
      expect(lifeGame.getNeighbourCount(2, 0), '(2, 0)').to.equals(1);
      expect(lifeGame.getNeighbourCount(2, 1), '(2, 1)').to.equals(2);
      expect(lifeGame.getNeighbourCount(2, 2), '(2, 2)').to.equals(0);
    });
  });

  describe('#next', function () {
    let lifeGame;

    beforeEach(function () {
      lifeGame = life();
    });

    describe('a dead cell with 3 living neighbours', function () {
      it('should become alive', function () {
        lifeGame.setBoard([
          1, 0, 0,
          1, 0, 1,
          0, 0, 0
        ]);

        lifeGame.next();
        expect(lifeGame.getCell(1, 1)).to.equals(1);
      });
    });

    describe('a living cell with 3 living neighbours', function () {
      it('should become alive', function () {
        lifeGame.setBoard([
          1, 0, 0,
          1, 1, 1,
          0, 0, 0
        ]);

        lifeGame.next();
        expect(lifeGame.getCell(1, 1)).to.equals(1);
      });
    });

    describe('a dead cell with 2 living neighbours', function () {
      it('should stay dead', function () {
        lifeGame.setBoard([
          0, 0, 0,
          1, 0, 1,
          0, 0, 0
        ]);

        lifeGame.next();
        expect(lifeGame.getCell(1, 1)).to.equals(0);
      });
    });

    describe('a living cell with 2 living neighbours', function () {
      it('should stay alive', function () {
        lifeGame.setBoard([
          0, 0, 0,
          1, 1, 1,
          0, 0, 0
        ]);

        lifeGame.next();
        expect(lifeGame.getCell(1, 1)).to.equals(1);
      });
    });

    describe('a living cell with less than 2 living neighbours', function () {
      it('should die', function () {
        lifeGame.setBoard([
          0, 0, 0,
          1, 1, 0,
          0, 0, 0
        ]);

        lifeGame.next();
        expect(lifeGame.getCell(1, 1)).to.equals(0);
      });
    });

    describe('a dead cell with less than 2 living neighbours', function () {
      it('should stay dead', function () {
        lifeGame.setBoard([
          0, 0, 0,
          1, 0, 0,
          0, 0, 0
        ]);

        lifeGame.next();
        expect(lifeGame.getCell(1, 1)).to.equals(0);
      });
    });

    describe('a living cell with more than 3 living neighbours', function () {
      it('should die', function () {
        lifeGame.setBoard([
          1, 0, 0,
          1, 1, 1,
          0, 1, 0
        ]);

        lifeGame.next();
        expect(lifeGame.getCell(1, 1)).to.equals(0);
      });
    });

    describe('a dead cell with more than 3 living neighbours', function () {
      it('should stay dead', function () {
        lifeGame.setBoard([
          1, 0, 0,
          1, 0, 1,
          0, 1, 0
        ]);

        lifeGame.next();
        expect(lifeGame.getCell(1, 1)).to.equals(0);
      });
    });
  });
});
