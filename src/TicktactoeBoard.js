import React, { Component } from 'react';
import EventManager from "./EventManager";

import './TicktactoeBoard.css';
import Cell from "./Cell"
import Api from "./Api"

class TicktactoeBoard extends Component {
    //   render() {

    //     return (
    //       <div className="TicktactoeBoard">
    //         {this.createRow(3)} 
    //       </div>
    //     );
    //   }
    //   createRow(nb){

    //     let board = [];
    //     for (let index = 0; index < nb; index++) {

    //        board.push(<div className="row">{this.createCell(3)}</div>) 
    //     }
    //     return board
    //   }
    //   createCell(nb) {
    //     let row = [];
    //     for (let index = 0; index < nb; index++) {
    //         row.push(<Cell index={index} />)

    //     } 
    //     return row
    //   }
    constructor(props) {
        super(props);
        this.state = {
            turn: false,
            tickTack: new Array(9),
            message: "",
            winMessage: "",
            winner: "",
            loader:false
        };
        this.handler = this.handler.bind(this)
        EventManager.addListener("nextPlayer", () => {
            let playerTurn = this.state.turn
            if (playerTurn === false) {
                this.setState({ message: "Too bad it's the O player turn now" })
                this.setState({ turn: true })
            } else {
                this.setState({ message: "Holly molly ! it's the X player turn now" })
                this.setState({ turn: false })


            }
            EventManager.emit('timer', 'reset');

            EventManager.emit('timer', 'start');
        })
    }

    render() {
        return (
            <div className="flex-container">
                {this.createBoard(9)}
                <div>
                    {this.winnerPhrase(TicktactoeBoard.winner(this.state.tickTack))}
                    <h1>{this.state.message}</h1>
                    <button onClick={this.resetGame}>RESET GAME</button>
                </div>
            </div>
        );
    }

    renderSquare(i) {
        return (
            <Cell handler={this.handler} value={this.state.tickTack[i]} index={i} />
        );
    }

    createBoard(nbrCell) {
        let board = [];
        for (let i = 0; i < nbrCell; i++) {
            board.push(this.renderSquare(i))
        }
        return board;
    }


    handler(id, value) {
        this.setState({ message: "" })
        let cells = this.state.tickTack
        if (this.state.turn === false && value === "") {
            cells[id] = "X";
            this.setState({ turn: true })
        } else if (value === "") {
            cells[id] = "O";
            this.setState({ turn: false })
        }
        this.autoPlay()
        EventManager.emit('timer', 'reset');
        EventManager.emit('timer', 'start');
        this.setState({
            tickTack: cells
        })


    }
    static winner(cells) {
        let winCombi = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let index = 0; index < winCombi.length; index++) {
            const [a, b, c] = winCombi[index];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                //console.log("WINNNER", cells[a]);
                //this.setState({ winner: cells[a] })
                return cells[a]
            }

        }
        return false
    }
    resetGame = () => {
        this.setState({ turn: false });
        this.setState({ tickTack: new Array(9) });
        EventManager.emit('timer', "reset")
    }
    hasDraw(cells) {
        if (!cells.includes(undefined))
            return true;
    }
    winnerPhrase = (who) =>{
        if (this.hasDraw(this.state.tickTack)) {
            EventManager.emit('timer', "stop")
            return (
                <div>
                    <h1>Draw</h1>
                    <button onClick={this.saveGame}>SAVE GAME</button>
                </div>
            );
        }
        if (who == false) {
            return (
                <h1>Good Luck</h1>
            );
        }
        else {

            EventManager.emit('timer', "stop")
            return (
                <div>
                    <h1>The winner is {who},resetting game....</h1>

                    <button onClick={this.saveGame}>SAVE GAME</button>
                    {this.state.loader ? <div id="loader"></div> :null }
                    
                </div>


            );
        }

    }
    saveGame = () => {
        this.setState({loader: true})
        //document.getElementById("loader").style.display = "block";
        Api.saveHistory(this.state.tickTack).then(value => {
            EventManager.emit("getStats")
        this.setState({loader: false})
        EventManager.emit('timer', "reset")
            //document.getElementById("loader").style.display = "none";
        })
    }
    getStats = () => {
        Api.getHistory().then(value =>{
            console.log(value);
            
        })
    }
    autoPlay() {
        let winCombi = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        let currentGames = this.state.tickTack
        // for (let index = 0; index < currentGames.length; index++) {
        //     const [a,b,c] =winCombi[index]
        //     if (currentGames) {
        //         console.log("test autoplay");
                
        //     }
            
        // }
    }
}

export default TicktactoeBoard;
