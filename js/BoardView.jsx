//var scss = require("../scss/rainbow.scss");

import React from  "react"

import scss from '../scss/makeitpretty.scss'
import Store from 'TetrisStore'
import Constants from 'TetrisConstants'
import Dispatcher from 'TetrisActions'


const Board = React.createClass({


    componentDidMount: function () {
        Store.on('boardChange', this._onChange)
        Store.on('stateChange', this._onStateChange)
        Dispatcher.init()
    },

    getInitialState: function () {
        return {board: Store.get('board')}
    },


    render: function () {


        const darken = this.state.gameState === 'pause' ? " darken" : ""

        return (
            <svg className="board" viewBox={Constants.viewBox}>{
                this.state.board
                    .map( (elm, index)=> (<rect x={index % Constants.BOARD_WIDTH}
                                                y={Math.floor(index / Constants.BOARD_WIDTH)} width="0.9" height="0.9"
                                                className={elm + darken}/>) )}
            </svg>
        )
    },

    _onChange: function (board) {
        this.setState({board: board})
    },

    _onStateChange: function (state) {
        this.setState({board: this.state.board, gameState: state})
    }

})


export default Board
