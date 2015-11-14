import EventEmitter from 'events'
import Constants from 'TetrisConstants'


class Store extends EventEmitter {

    constructor() {
        super()
        this.init()
    }

    get(value) {
        return this.props[value]
    }


    removeCurrentTetromino() {
        delete this.props.board[this.currentPos]
        delete this.props.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 0]]
        delete this.props.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 1]]
        delete this.props.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 2]]
    }

    insertCurrentTetromino() {
        const color = Constants.tetrominoes[this.currentTetromino - 1]
        this.props.board[this.currentPos] = color
        this.props.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 0]] = color
        this.props.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 1]] = color
        this.props.board[this.currentPos + Constants.tetrominoes[this.currentTetromino + 2]] = color
    }

    stop() {
        this.props.pause = true
        clearInterval(this.intervals.moveTetromino)
    }

    start() {
        const ths = this
        this.props.pause = false
        this.shouldMoveTetromino = true
        this.keyCode = null
        setTimeout(() => ths._eventLoop(), 10)


    }

    pause() {
        if (this.props.pause == true) {
            this.start()
        } else {
            this.stop()
        }
    }

    reset(){
        this.stop()
        this.init()
        this.start()
    }

    init() {
        stop()
        this.props = {}
        this.intervals = {}
        this.props.score = 0
        this.props.level = 0
        this.props.board = new Array((Constants.BOARD_HEIGHT) * (Constants.BOARD_WIDTH))
        for (var i = 0; i < this.props.board.length - Constants.BOARD_WIDTH; i += Constants.BOARD_WIDTH) {
            this.props.board[i] = 'E'
            this.props.board[i + Constants.BOARD_WIDTH - 1] = 'E'
        }
        for (var i = (Constants.BOARD_HEIGHT - 1) * Constants.BOARD_WIDTH; i < this.props.board.length; i++) {
            this.props.board[i] = 'E'
        }

        this.currentTetromino = this._getRandomTetromino()
        this.props.nextTetromino = this._getRandomTetromino()
        this.emit('nextTetrominoChange', this.props.nextTetromino)
        this.emit('scoreChange', this.props.score)
        this.emit('boardChange', this.props.board)
        this.currentPos = Constants.BOARD_WIDTH + Math.floor(Constants.BOARD_WIDTH / 2)
        this.insertCurrentTetromino()
    }


    _eventLoop() {
        const ths = this

        if (this.props.pause)
            return

        if (this.shouldMoveTetromino || this.keyCode)
            this.removeCurrentTetromino()

        if (this.shouldMoveTetromino) {
            this._moveTetromino(Constants.BOARD_WIDTH)


        }
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
            this.emit('boardChange', this.props.board)

        }

        if(this.shouldMoveTetromino) {
            this.shouldMoveTetromino = false
            this.intervals.moveTetromino = setTimeout(() => ths.shouldMoveTetromino = true, 1000 - ths.props.level * 20)
        }
        this.keyCode = null
        setTimeout(() => ths._eventLoop(), 10)

    }


    tetrominoFits(pos, tetromino) {
        if (
            this.props.board[pos] ||
            this.props.board[pos + Constants.tetrominoes[tetromino + 0]] ||
            this.props.board[pos + Constants.tetrominoes[tetromino + 1]] ||
            this.props.board[pos + Constants.tetrominoes[tetromino + 2]]
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
        for (var i = this.currentPos; i < this.props.board.length; i += Constants.BOARD_WIDTH) {
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
            this.currentTetromino = this.props.nextTetromino
            this.props.nextTetromino = this._getRandomTetromino()
            this.emit('nextTetrominoChange', this.props.nextTetromino)
            this.currentPos = Constants.BOARD_WIDTH + Math.floor(Constants.BOARD_WIDTH / 2)
        }

    }

    _getRandomTetromino() {
        return 1 + Math.floor(Math.random() * (27)) * 4
    }

    _moveFilledLines() {
        var move = 0
        let movedLines = 0
        for (let i = this.props.board.length - Constants.BOARD_WIDTH * 2; i > 0; i -= Constants.BOARD_WIDTH) {

            for (let m = i + 1; m < i + Constants.BOARD_WIDTH - 1; m++) {
                if (this.props.board[m])
                    this.props.board[m + move] = this.props.board[m]
                else
                    delete this.props.board[m + move]
            }

            let rowCount = 0
            for (let j = i; j < i + Constants.BOARD_WIDTH; j++) {
                if (this.props.board[j]) {
                    rowCount++
                }
            }
            if (rowCount == Constants.BOARD_WIDTH) {
                movedLines++
                move += Constants.BOARD_WIDTH
            }

        }
        this.props.score += Constants.lineScoreMultiplicator[movedLines] * (this.props.level + 1)
        this.emit('scoreChange', this.props.score)
    }

}

let storeInstance = new Store()

export default storeInstance
