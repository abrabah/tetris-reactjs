
import Store from 'TetrisStore'

class Dispatcher{



  addKeyEventListener(){
      window.onkeyup = function(e){
        switch (e.code) {
          case 'ArrowUp':
          Store.rotatePiece()
          break
          case 'ArrowLeft':
          Store.movePieceLeft()
          break
          case 'ArrowRight':
          Store.movePieceRight()
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
