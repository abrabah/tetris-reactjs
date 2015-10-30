


// Update board in a timely fasion
// Listen for key press

import EventEmitter from 'events'

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 22;


var _board = get()

function get(){
var b = Array(BOARD_HEIGHT*BOARD_WIDTH)
  for (var i = 0; i < b.length; i++) {
    b[i] = 'Z';
  }
  return b

}
var TetrisStore = Object.assign({}, EventEmitter.prototype, {

  getBoard: function(){
    return _board;
  },
  viewBox:"0 0 " + BOARD_WIDTH + " " + BOARD_HEIGHT,
  board_w: BOARD_WIDTH,
  board_h: BOARD_HEIGHT,
  colors: { I:'#47FDCE', //Cyan
            O:'#FFDF00', //Yellow
            T: '#8600C8', //Purple
            S: '#75DB1B', //Green
            Z: '#DB0000', //Red
            J: '#0033EE', //Blue
            L: '#AC5330', //Orange
          }

})

module.exports = TetrisStore
