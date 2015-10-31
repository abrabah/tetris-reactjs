
import EventEmitter from 'events'
import Constants from 'TetrisConstants'




class Store extends EventEmitter {

  constructor(){
    super()
    this.board = new Array(Constants.BOARD_HEIGHT*Constants.BOARD_WIDTH)
    this.board[10] = 'Z'
  }

  getBoard(){
    return this.board;
  }

}

let storeInstance = new Store()

export default storeInstance
