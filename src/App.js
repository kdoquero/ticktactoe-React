import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TicktacktoeBoard from "./TicktactoeBoard";
import Timer from "./Timer"
import Chart from "./Chart"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer />
        <TicktacktoeBoard />

        <Chart />
      </div>
    );
  }
}

export default App;
