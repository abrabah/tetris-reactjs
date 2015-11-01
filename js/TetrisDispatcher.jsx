
import Store from 'TetrisStore'
import Constants from 'TetrisConstants'

class Dispatcher{

  constructor(){
    this.keyCode = null
    this.moveTetromino = false
  }


  run(){
    if(this.runningLoop){
      console.log("trash cycle")
      return
    }
    if(this.moveTetromino){
      Store.moveTetromino(Constants.BOARD_WIDTH)
    }
    this.runningLoop = true
    if(this.keyCode){
      switch (this.keyCode) {
       case 38: //'ArrowUp'
       Store.rotateTermino()
       break
       case  37: //ArrowLeft'
       Store.moveTetromino(-1)
       break
       case 39://'ArrowRight'
       Store.moveTetromino(1)
       break
       case 40: //'ArrowDown'
       Store.moveTetromino(Constants.BOARD_WIDTH)
       break
       case 32: //'Space':
       Store.moveTetrominoToBottom()
       break
    }
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
      window.onkeydown = evt =>  ths.keyCode = evt.keyCode
}




    removeKeyEventListener(){
      window.onkeydown = null
    }
}

let dispatcherInstance = new Dispatcher()

export default dispatcherInstance
