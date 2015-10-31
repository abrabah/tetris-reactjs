
import EventEmitter from 'events'
import Constants from 'TetrisConstants'




class Store extends EventEmitter {

  constructor(){
    super()
    this.listeners = new Array()
    this.board = new Array(Constants.BOARD_HEIGHT*Constants.BOARD_WIDTH)
    this.currentTetromino = 81
    this.nextTetromino = 0
    this.currentPos = Constants.BOARD_WIDTH + Math.floor(Constants.BOARD_WIDTH/2)
    this.insertCurrentTetromino()
  }

  addBoardListener(callback){
    this.listeners.push(callback)
  }

  getBoard(){
    return this.board;
  }

  removeCurrentTetromino(){
    delete this.board[this.currentPos]
    delete this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 0]]
    delete this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 1]]
    delete this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 2]]
  }

  insertCurrentTetromino(){
    const color = Constants.tetrominoes[this.currentTetromino - 1]
    this.board[this.currentPos] = color
    this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 0]] = color
    this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 1]] = color
    this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 2]] = color
  }

  tetrominoFits(){
    return true
  }

  rotateTermino(){
    const rotatedTetromino = 16*Math.floor(this.currentTetromino / 16) + ((this.currentTetromino + 4) % 16)

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
