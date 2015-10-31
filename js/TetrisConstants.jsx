

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 22

const TL =  - BOARD_WIDTH - 1
const TC =  - BOARD_WIDTH
const TR =  - BOARD_WIDTH + 1
const CL =  - 1
const CR =  1
const BL =  BOARD_WIDTH - 1
const BC =  BOARD_WIDTH
const BR =  BOARD_WIDTH + 1


let Constants  = {

BOARD_WIDTH: BOARD_WIDTH,

BOARD_HEIGHT: BOARD_HEIGHT,

viewBox: "0 0 " + BOARD_WIDTH + " " + BOARD_HEIGHT,

colors: { I:'#47FDCE', //Cyan, Stick
          O:'#FFDF00', //Yellow, Square
          T: '#8600C8', //Purple,
          S: '#75DB1B', //Green, Right snake
          Z: '#DB0000', //Red, left snake
          J: '#0033EE', //Blue, left gun
          L: '#AC5330', //Orange, right gun
        },

tetrominoes: [
    'I',  TC, BC, 2 * BOARD_WIDTH,
    'I',  CL, CR, 2,
    'I',  TC, BC, 2 * BOARD_WIDTH,
    'I',  CL, CR, 2,
    'O',  CL, BL, BC,
    'O',  CL, BL, BC,
    'O',  CL, BL, BC,
    'O',  CL, BL, BC,
    'T',  TC, CL, CR,
    'T',  TC, CR, BC,
    'T',  CL, CR, BC,
    'T',  TC, CL, BC,
    'S',  TC, TR, CL,
    'S',  TC, CR, BR,
    'S',  TC, TR, CL,
    'S',  TC, CR, BR,
    'Z',  TL, TC, CR,
    'Z',  TR, CR, BC,
    'Z',  TL, TC, CR,
    'Z',  TR, CR, BC,
    'J',  TL, CL, CR,
    'J',  TC, TR, BC,
    'J',  CL, CR, BR,
    'J',  TC, BC, BL,
    'L',  TR, CL, CR,
    'L',  TC, BC, BR,
    'L',  CL, CR, BL,
    'L',  TL, TC, BC
  ]
}




export default Constants
