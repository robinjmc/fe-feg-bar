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
