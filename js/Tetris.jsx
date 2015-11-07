//var scss = require("../scss/rainbow.scss");

import React from  "react"
import ReactDom from 'react-dom'
import scss from '../scss/makeitpretty.scss'
import Store from 'TetrisStore'
import Constants from 'TetrisConstants'
import Dispatcher from 'TetrisActions'



var TetrisBoard = React.createClass({


  componentDidMount: function(){
      Store.on('boardChange', this._onChange)
        Dispatcher.init()
  },

  getInitialState: function() {
    return {board:Store.getBoard() }
  },


  render: function () {
    
        return (
          <svg viewBox={Constants.viewBox}>{
            this.state.board
            .map( (elm, index)=> (<rect x={index % Constants.BOARD_WIDTH} y={Math.floor(index / Constants.BOARD_WIDTH)} width="0.9" height="0.9" fill={Constants.colors[elm]}/>) )}
            </svg>
        );
    },

    _onChange: function(board){
      this.setState({board:board})
    },


});

ReactDom.render(
    <TetrisBoard />,
    document.getElementById('content')
);
