import Store from 'TetrisStore'
import Constants from 'TetrisConstants'

class Action {

    constructor() {
        Store.start()
    }

    init() {
        this.addKeyEventListener()
    }


    addKeyEventListener() {
        window.onkeydown = evt => {

            if (evt.keyCode == 80) { //pause game 'p'
                Store.pause()
            } else if (evt.keyCode == 82) {// restart game 'r'
                Store.reset()
            } else {
                Store.keyCode = evt.keyCode
            }
        }
    }

    removeKeyEventListener() {
        window.onkeydown = null
    }
}

let dispatcherInstance = new Action()
export default dispatcherInstance
