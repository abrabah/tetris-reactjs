import EventEmitter from 'events'
import Constants from 'TetrisConstants'


class Store extends EventEmitter {

    constructor() {
        super()
        this.reset()
    }

    getBoard() {
        return this.board;
    }

    removeCurrentTetromino() {
        delete this.board[this.currentPos]
        delete this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 0]]
        delete this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 1]]
        delete this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 2]]
    }

    insertCurrentTetromino() {
        const color = Constants.tetrominoes[this.currentTetromino - 1]
        this.board[this.currentPos] = color
        this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 0]] = color
        this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 1]] = color
        this.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 2]] = color
    }


    start() {
        const ths = this
        this.clock = setInterval(elm=> ths.shouldMoveTetromino = true, 1000)
        this.eventLoop = setInterval(evt => ths._eventLoop(), 60)
    }


    stop() {
        clearInterval(this.clock)
        clearInterval(this.eventLoop)
        this.runningLoop = false
    }

    reset() {
        stop()
        this.board = new Array((Constants.BOARD_HEIGHT) * (Constants.BOARD_WIDTH))
        for (var i = 0; i < this.board.length - Constants.BOARD_WIDTH; i += Constants.BOARD_WIDTH) {
            this.board[i] = 'E'
            this.board[i + Constants.BOARD_WIDTH - 1] = 'E'
        }
        for (var i = (Constants.BOARD_HEIGHT - 1) * Constants.BOARD_WIDTH; i < this.board.length; i++) {
            this.board[i] = 'E'
        }

        this.currentTetromino = this._getRandomTetromino()
        this.nextTetromino = this._getRandomTetromino()
        this.currentPos = Constants.BOARD_WIDTH + Math.floor(Constants.BOARD_WIDTH / 2)
        this.insertCurrentTetromino()
    }


    _eventLoop() {
        if (this.runningLoop) {
            console.log("trash cycle")
            return
        }

        if(this.shouldMoveTetromino || this.keyCode)
            this.removeCurrentTetromino()

        if (this.shouldMoveTetromino) {
            this._moveTetromino(Constants.BOARD_WIDTH)
        }
        this.runningLoop = true
        if (this.keyCode) {
            switch (this.keyCode) {
                case 38: //'ArrowUp'
                    this._rotateTermino()
                    break
                case  37: //ArrowLeft'
                    this._moveTetromino(-1)
                    break
                case 39://'ArrowRight'
                    this._moveTetromino(1)
                    break
                case 40: //'ArrowDown'
                    this._moveTetromino(Constants.BOARD_WIDTH)
                    break
                case 32: //'Space':
                    this._moveTetrominoToBottom()
                    break
            }
        }


        if (this.shouldMoveTetromino || this.keyCode) {
            this.drawBoard()
            this.emit('boardChange', this.board)

        }

        this.shouldMoveTetromino = false
        this.keyCode = null
        this.runningLoop = false
    }


    tetrominoFits(pos, tetromino) {
        if (
            this.board[pos] ||
            this.board[pos + Constants.tetrominoes[tetromino + 0]] ||
            this.board[pos + Constants.tetrominoes[tetromino + 1]] ||
            this.board[pos + Constants.tetrominoes[tetromino + 2]]
        ) {
            return false
        }

        return true
    }


    _rotateTermino() {
        const rotatedTetromino = 16 * Math.floor(this.currentTetromino / 16) + ((this.currentTetromino + 4) % 16)
        if (this.tetrominoFits(this.currentPos, rotatedTetromino))
            this.currentTetromino = rotatedTetromino
    }

    _moveTetromino(delta) {
        if (this.tetrominoFits(this.currentPos + delta, this.currentTetromino)) {
            this.currentPos += delta;
        }
    }

    _moveTetrominoToBottom() {
        this.currentPos = this._getBottomPosition()
    }

    _getBottomPosition() {
        for (var i = this.currentPos; i < this.board.length; i += Constants.BOARD_WIDTH) {
            if (!this.tetrominoFits(i, this.currentTetromino)) {
                return i - Constants.BOARD_WIDTH;
            }
        }
        return this.currentPos
    }

    drawBoard() {
        this._moveFilledLines()
        this._changeTetrominoIfNeeded()
        if (!this.tetrominoFits(this.currentPos + Constants.BOARD_WIDTH, this.currentTetromino)) {
            this.stop()
            console.log("TODO implement GAME OVER!")
        }
        this.insertCurrentTetromino()
    }

    _changeTetrominoIfNeeded() {


        if (!this.tetrominoFits(this.currentPos + Constants.BOARD_WIDTH, this.currentTetromino)) {
            this.insertCurrentTetromino()
            this.currentTetromino = this.nextTetromino
            this.nextTetromino = this._getRandomTetromino()
            this.currentPos = Constants.BOARD_WIDTH + Math.floor(Constants.BOARD_WIDTH / 2)
        }

    }

    _getRandomTetromino() {
        return 1 + Math.floor(Math.random() * (27)) * 4
    }

    _moveFilledLines() {
        var move = 0
        let movedLines = 0
        let scoreMultiplicator = 10
        for (let i = this.board.length - Constants.BOARD_WIDTH * 2; i > 0; i -= Constants.BOARD_WIDTH) {

            for (let m = i + 1; m < i + Constants.BOARD_WIDTH - 1; m++) {
                if (this.board[m])
                    this.board[m + move] = this.board[m]
                else
                    delete this.board[m + move]
            }

            let rowCount = 0
            for (let j = i; j < i + Constants.BOARD_WIDTH; j++) {
                if (this.board[j]) {
                    rowCount++
                }
            }
            if (rowCount == Constants.BOARD_WIDTH) {
                scoreMultiplicator *= 2
                movedLines++
                move += Constants.BOARD_WIDTH
            }

        }

        this.score += movedLines * scoreMultiplicator
    }

}

let storeInstance = new Store()

export default storeInstance
