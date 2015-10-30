


// Update board in a timely fasion
// Listen for key press

import EventEmitter from 'events'

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 22;

var _board = get()

function get(){
var b = Array(BOARD_HEIGHT*BOARD_WIDTH)
  for (var i = 0; i < b.length; i++) {
    b[i] = 2;
  }
  return b

}
var TetrisStore = Object.assign({}, EventEmitter.prototype, {

  getBoard: function(){
    return _board;
  },
  viewBox:"0 0 " + BOARD_WIDTH + " " + BOARD_HEIGHT,
  board_w: BOARD_WIDTH,
  board_h: BOARD_HEIGHT


})

module.exports = TetrisStore
