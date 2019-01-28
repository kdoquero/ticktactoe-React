import React, { Component } from 'react';
import EventManager from "./EventManager";
import './Cell.css';

class Cell extends Component {
    render() {
        return (
            <button value={this.props.value} className="flex-item" onClick={this.clickOnCell} id={this.props.index}>
            </button>
        );
    }
    clickOnCell = (event) => {
       
        this.props.handler(event.target.id,event.target.value)
        console.log(event.target.id,event.target.value);
        
    }
}

export default Cell;
