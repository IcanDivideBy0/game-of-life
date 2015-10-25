'use strict';

let life = require('./lib/life');

function renderLifeGame(lifeGame) {
  for (let idx = 0; idx < lifeGame.board.length; idx += lifeGame.size) {
    process.stdout.write(
      lifeGame.board
      .slice(idx, idx + lifeGame.size)
      .reduceRight((acc, value) => (value ? '#' : ' ') + acc, '\n')
    );
  }

  process.stdout.write('\x1B[' + lifeGame.size + 'A');
}

(function () {
  let lifeGame = life();
  lifeGame.setBoard(Array.from(new Array(40 * 40), () => 0));

  // Glider gun
  [
    242, 243, 203, 95,  94,  133, 172, 212,
    252, 293, 334, 335, 225, 226, 186, 385,
    386, 426, 268, 269, 308, 309, 310, 348,
    349, 356, 357, 317
  ].forEach(v => lifeGame.board[v] = 1);

  setInterval(() => {
    lifeGame.next();
    renderLifeGame(lifeGame);
  }, 1000 / 60);
})();
