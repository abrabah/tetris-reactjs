import ReactDom from 'react-dom'
import React from  "react"
import Board from 'BoardView'
import Counter from 'CounterView'

var Tetris = React.createClass({
    render: function () {

        return (
            <div>
                <Board/>
                <Counter name="Level" />
                <Counter name="Score" />
            </div>
        );
    }
});


ReactDom.render(
    <Tetris />,
    document.getElementById('content')
);