import ReactDom from 'react-dom'
import React from  "react"
import Board from 'BoardView'
import Counter from 'CounterView'
import TetrominoPreview from 'TetrominoPreview.jsx'

var Tetris = React.createClass({
    render: function () {

        return (
            <article id="frame">
                <header>Tetris</header>
                <section className="tetris">
                    <Board />
                    <TetrominoPreview />
                    <Counter name="Level"/>
                    <Counter name="Score"/>
                    <section className="tetrisDescription">
                        Use <i className="fa fa-arrow-left"></i> and <i className="fa fa-arrow-right"></i> to move tetromino.
                        <br/>
                        <i className="fa fa-arrow-up"></i> rotates the tetromino, space sends the tetromino to the bottom.
                        <br/>
                        Press P to pause game and R to reset
                    </section>
                </section>
                <footer> Made with <i className="fa fa-heart"></i>. Source code on <a
                    href="https://github.com/abrabah/tetris-reactjs"> <i className="fa fa-github"></i>Github </a>
                </footer>
            </article>
        );
    }
});


ReactDom.render(
    <Tetris />,
    document.getElementById('content')
);