
import Store from 'TetrisStore'
import Constants from 'TetrisConstants'

class Dispatcher{


  init(){
    this.addKeyEventListener()
    clearInterval(this.clock)
    this.clock = setInterval( elm=> Store.moveTetromino(Constants.BOARD_WIDTH) ,1000)
  }


  addKeyEventListener(){
      window.onkeydown = function(e){
        switch (e.code) {
          case 'ArrowUp':
          Store.rotateTermino()
          break
          case 'ArrowLeft':
          Store.moveTetromino(-1)
          break
          case 'ArrowRight':
          Store.moveTetromino(1)
          break
          case 'ArrowDown':
          Store.moveTetromino(Constants.BOARD_WIDTH)
          break
          case 'Space':
          Store.moveTetrominoToBottom()
          break
        }
      }
    }

    removeKeyEventListener(){
      window.onkeyup = undefined
    }
}

let dispatcherInstance = new Dispatcher()

export default dispatcherInstance
