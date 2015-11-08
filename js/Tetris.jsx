import ReactDom from 'react-dom'
import React from  "react"
import Board from 'BoardView'
import Counter from 'CounterView'
import TetrominoPreview from 'TetrominoPreview.jsx'

var Tetris = React.createClass({
    render: function () {

        return (
            <article id="frame">
                <header>Tetris-js</header>
                <section className="tetris">
                    <Board />
                    <TetrominoPreview />
                    <Counter name="Level"/>
                    <Counter name="Score"/>
                </section>
                <footer> Made with love</footer>
            </article>
        );
    }
});

 
ReactDom.render(
    <Tetris />,
    document.getElementById('content')
);