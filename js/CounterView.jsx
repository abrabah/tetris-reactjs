import React from 'react'
import Store from 'TetrisStore.jsx'


const Counter = React.createClass({


    componentDidMount: function() {
        Store.on(this.props.name.toLowerCase() + 'Change', this._changeValue)
    },


    getInitialState: function(){
        return {value:Store.get(this.props.name.toLowerCase())}
    },

    _changeValue: function(newValue) {
        this.setState({value:newValue})
    },

    render: function () {
        return (
            <section className="counter">
                <header>{this.props.name}</header>
                <p>{this.state.value}</p>
            </section>
        )
    }


})

export default Counter
