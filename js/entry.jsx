//var scss = require("../scss/rainbow.scss");

import React from  "react"
import ReactDom from 'react-dom'

import scss from '../scss/makeitpretty.scss'


var Main = React.createClass({
    render: function () {
        return (
            <article className='grid-container'>
            <header >
                Let's code tetris!
            </header>
            </article>
        );
    }

});

ReactDom.render(
    <Main />,
    document.getElementById('content')
);
