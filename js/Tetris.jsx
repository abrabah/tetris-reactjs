
import ReactDom from 'react-dom'
import React from  "react"
import Board from 'BoardView'



var Tetris = React.createClass({
    render: function () {

        return (
            <Board/>
        );
    }
});



ReactDom.render(
    <Tetris />,
    document.getElementById('content')
);