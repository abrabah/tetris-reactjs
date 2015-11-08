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
            console.log(evt.keyCode)

            if (evt.keyCode == 80) { //pause 'p'
                Store.pause()
            } else if (evt.keyCode == 82) {// restart 'r'
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
