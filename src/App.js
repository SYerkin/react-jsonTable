import logo from './logo.svg';
import './App.css';import React from 'react';
import DataWriter from './DataWriter';
import RandomTableGenerator from './RandomTableGenerator';
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <RandomTableGenerator />
      </header>
    </div>
  );
}

export default App;
