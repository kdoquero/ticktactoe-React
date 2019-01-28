import React, { Component } from 'react';
import { EventEmitter } from "fbemitter";
import './Timer.css';
import EventManager from "./EventManager";

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: 5,
           
        }
        this.timer = null
        //this.handler = this.handler.bind(this);
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.reset = this.reset.bind(this)
        EventManager.addListener('timer', (action) => {
            if (action === 'stop') {
                this.stop();
            }
            else if (action === 'start') {
                this.start();
            }
            else if (action === 'reset') {
                this.reset();
            }
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.start}>
                    start
                </button>
                <button onClick={this.stop}>
                    stop
                </button>
                <button onClick={this.reset}>
                    reset
                </button>
                <p>time left : {this.state.timeLeft}</p>
            </div>


        );
    }
    start() {
        
        let count =this.state.timeLeft
        this.timer = setInterval(() => {
                this.setState({ timeLeft: --count  });  
                if (this.state.timeLeft <= 0 ) {
                    this.reset()
                    EventManager.emit("nextPlayer")
                }
        
          
        }, 1000);

        
    }
    stop() {
        //sthis.setState({ timeLeft: 0 });
        clearInterval(this.timer)
    }
    reset() {
        this.stop()
        this.setState({ timeLeft: 5 });
    }

}

export default Timer;
