import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import FegBar from './FegBar';
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <img alt="feg bar logo" src="https://image.ibb.co/nmFL6d/untitled.png"/>
          </header>
          <FegBar />
          <footer>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
