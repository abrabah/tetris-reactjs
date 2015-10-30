//var scss = require("../scss/rainbow.scss");

import React from  "react"
import ReactDom from 'react-dom'
import scss from '../scss/makeitpretty.scss'
import TetrisStore from 'TetrisStore'


  const BOARD_WIDTH = 10;
  const BOARD_HEIGHT = 22;

var TetrisBoard = React.createClass({


  componentDidMount: function(){
    //  TetrisStore.addChangeListener(this._onChange);
  },

  getInitialState: function() {
    return {board:TetrisStore.getBoard() }
  },


  render: function () {
        return (
          <svg viewBox={TetrisStore.viewBox}>{
            this.state.board.map( (elm, index)=> (<rect x={index% TetrisStore.board_w} y="1" width="1" height="1"/>) )}
            </svg>
        );
    },

    _onChange: function(){
      this.setState({board:TetrisStore.getBoard()})
    },

});

ReactDom.render(
    <TetrisBoard />,
    document.getElementById('content')
);
