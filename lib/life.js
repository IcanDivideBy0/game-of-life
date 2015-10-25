'use strict';

module.exports = lifeBoardFactory;

let lifeBoardProto = {
  setBoard: function (board) {
    var size = Math.sqrt(board.length);

    if (size !== Math.floor(size)) throw new Error('Invalid board input');

    this.size = size;
    this.board = Array.from(board);
  },

  getCell: function (x, y) {
    if (x >= this.size || x < 0 || y >= this.size || y < 0) return 0;
    return this.board[this.size * x + y] || 0;
  },

  getNeighbourCount: function (x, y) {
    return [x-1, x, x+1]
    .reduce((acc, xx) => acc.concat([y-1, y, y+1].map(yy => [xx, yy])), [])
    .reduce((acc, a) => acc + this.getCell(a[0], a[1]), -this.getCell(x, y));
  },

  next: function () {
    this.board = Array.from(this.board, (v, k) => {
      let count = this.getNeighbourCount(Math.floor(k/this.size), k%this.size);
      return +(count === 3 || (v && count === 2));
    });
  }
};

function lifeBoardFactory() {
  return Object.create(lifeBoardProto, {
    board: { writable: true, value: [] },
    size: { writable: true, value: 0 }
  });
}
