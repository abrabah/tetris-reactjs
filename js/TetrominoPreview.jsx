import React from  "react"
import Constants from 'TetrisConstants.jsx'
import Store from 'TetrisStore.jsx'

const TetrominoPreview = React.createClass({

    componentDidMount: function () {
        Store.on('nextTetrominoChange', this._changePreview)
    },
    _changePreview: function (nextTetromino) {
        this.setState({nextTetromino: nextTetromino})
    },

    getInitialState: function () {
        return {nextTetromino: Store.get('nextTetromino')}
    },

    render: function () {
        let pos = [
            12,
            12 + Constants.tetrominoes[this.state.nextTetromino + 0],
            12 + Constants.tetrominoes[this.state.nextTetromino + 1],
            12 + Constants.tetrominoes[this.state.nextTetromino + 2]
        ]
        const color = Constants.tetrominoes[this.state.nextTetromino - 1]
        return (
            <section className="tetrominoPreview">
                <header> Next Piece:</header>
                <svg viewBox="1 0 4 4">
                    {pos.map( (elm, index)=> (<rect x={elm % Constants.BOARD_WIDTH}
                                                    y={Math.floor(elm / Constants.BOARD_WIDTH)} width="0.9" height="0.9"
                                                    className={color}/>) )}
                </svg>
            </section>
        )
    }
})

export default TetrominoPreview
