import React, { Component } from 'react';
import EventManager from "./EventManager";
import './Chart.css';
import {Doughnut} from 'react-chartjs-2';
import Api from "./Api"
import TicktacktoeBoard from "./TicktactoeBoard";
class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nbrWinX:0,
            nbrWinO:0,
            nbrNull:0,
            results: null
        };
       this.getStatistics()
       EventManager.addListener("getStats",()=>{
        this.setState({nbrWinO: 0})
        this.setState({nbrWinX: 0})
        this.setState({nbrNull: 0})
        this.getStatistics()
       })
    }

    render() {
        const data = {
            labels: [
                'Winner X',
                'Winner O',
                'Draw'
            ],
            datasets: [{
                data: [this.state.nbrWinX,this.state.nbrWinO,this.state.nbrNull],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        };
        
        return (
            <Doughnut data={data} width={500} />
        );
    }
   getStatistics() {
    Api.getHistory().then(value=> {
        console.log(value);
        let results = value.data;
        let victory = []
        //this.setState({results:value})
        results.forEach(element => {
            let history = JSON.parse(element.history)   
        victory.push(TicktacktoeBoard.winner(history)) 
            
        });
        
        for (let index = 0; index < victory.length; index++) {
            if (victory[index] === "X") {
               let count= this.state.nbrWinX 
                this.setState({nbrWinX: ++count })
            } else
            if (victory[index] === "O") {
                let count= this.state.nbrWinO
                this.setState({nbrWinO: ++count})
                

                
            } else if (victory[index] === false) {
                let count= this.state.nbrNull
                this.setState({nbrNull: ++count})
            } 
            
        }
          
    }).catch(
        (error)=>{

        }
    )

   }
}

export default Chart;
