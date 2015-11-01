
import Store from 'TetrisStore'
import Constants from 'TetrisConstants'

class Dispatcher{

  constructor(){
    this.keyCode = null
    this.moveTetromino = false
  }


  run(){
    if(this.runningLoop){
      console.log('thrashing..')
      return
    }
    this.runningLoop = true
    if(this.keyCode){
      switch (this.keyCode) {
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

    if(this.moveTetromino){
      Store.moveTetromino(Constants.BOARD_WIDTH)
    }

    if (this.moveTetromino || this.keyCode){
    Store.broadcastChange()
  }

    this.moveTetromino = false
    this.keyCode = null


    this.runningLoop = false
}



  init(){
    this.addKeyEventListener()
    const ths = this
    clearInterval(this.clock)
    clearInterval(this.eventLoop)
    this.clock = setInterval( elm=> ths.moveTetromino = true ,1000)
    this.eventLoop = setInterval(evt => ths.run(), 60)
  }


  addKeyEventListener(){
    const ths = this
      window.onkeydown = evt => {ths.keyCode = evt.code}
}




    removeKeyEventListener(){
      window.onkeyup = undefined
    }
}

let dispatcherInstance = new Dispatcher()

export default dispatcherInstance
