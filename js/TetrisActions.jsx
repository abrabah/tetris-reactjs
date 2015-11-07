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
        window.onkeydown = evt =>  Store.keyCode = evt.keyCode
    }

    removeKeyEventListener() {
        window.onkeydown = null
    }
}

let dispatcherInstance = new Action()
export default dispatcherInstance
