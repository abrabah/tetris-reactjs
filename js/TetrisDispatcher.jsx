
import Store from 'TetrisStore'

class Dispatcher{


  init(){
    this.addKeyEventListener()
    clearInterval(this.clock)
    this.clock = setInterval( elm=> Store.movePieceDown() ,1000)
  }


  addKeyEventListener(){
      window.onkeydown = function(e){
        switch (e.code) {
          case 'ArrowUp':
          Store.rotateTermino()
          break
          case 'ArrowLeft':
          Store.moveTetrominoLeft()
          break
          case 'ArrowRight':
          Store.moveTetrominoRight()
          break
          case 'ArrowDown':
          Store.movePieceDown()
          break
          case 'Space':
          Store.movePieceToBottom()
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
