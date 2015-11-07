import React from 'react'
import Store from 'TetrisStore.jsx'


const Counter = React.createClass({


    componentDidMount: function () {
        Store.on(this.props.name.toLowerCase() + 'Change', this._changeValue)
    },


    getInitialState: function () {
        return {value: Store.get(this.props.name.toLowerCase())}
    },

    incrementValue: function (newValue) {

        const tmpValue = Math.ceil( (newValue - this.state.value) * (-Math.pow(2, -10 * this.state.tc / 200) + 1))


        if (Math.abs(tmpValue + this.state.value - newValue)  < 2 || this.state.tc > 200) {
            clearInterval(this.incrementValueInterval)
            this.setState({value: newValue})
        } else
            this.setState({value: tmpValue + this.state.value, tc: this.state.tc + 1})
    },


    _changeValue: function (newValue) {
        const ths = this
        clearInterval(this.incrementValueInterval)

        if (Math.abs(newValue - this.state.value) < 2)
            this.setState({value: newValue, tc: 0})
        else
            this.incrementValueInterval = setInterval((evt) => ths.incrementValue(newValue), 10)
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
