
import EventEmitter from 'events'
import Constants from 'TetrisConstants'




class Store extends EventEmitter {

  constructor(){
    super()
    this.listeners = new Array()
    this.board = new Array(Constants.BOARD_HEIGHT*Constants.BOARD_WIDTH)
    this.board[10] = 'Z'

    this.currentTetromino = 0
    this.nextTetromino = 0
    this.currentPos = Constants.BOARD_WIDTH + Math.floor(Constants.BOARD_WIDTH/2)
  }

  addBoardListener(callback){
    this.listeners.push(callback)
  }

  getBoard(){
    return this.board;
  }

  removeCurrentTetromino(){
    delete this.board[this.currentPos]
    delete this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino +1]]
    delete this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino +2]]
    delete this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino +3]]
  }

  insertCurrentTetromino(){
    const color = Constants.tetrominoes[this.currentTetromino]
    this.board[this.currentPos] = color
    this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino +1]] = color
    this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino +2]] = color
    this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino +3]] = color
  }

  tetrominoFits(){
    return true
  }

  rotateTermino(){
    const rotatedTetromino = (this.currentTetromino + 4) % (4*4)
    console.log(rotatedTetromino)
    if(!this.tetrominoFits(rotatedTetromino)){
      return
    }
    this.removeCurrentTetromino()
    this.currentTetromino = rotatedTetromino
    this.insertCurrentTetromino()

    this._broadCastChange()
  }

  movePieceDown(){


    this._broadCastChange()
  }

  _broadCastChange(){
    this.listeners.forEach(callback => callback(this.board))

  }

}

let storeInstance = new Store()

export default storeInstance
