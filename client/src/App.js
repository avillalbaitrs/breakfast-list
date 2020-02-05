import React from 'react';
import Schedule from './components/Schedule';
import Navbar from './components/Navbar';
import './App.css';
import Items from './components/Items';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Schedule />
      <Items />
    </div>
  );
}

export default App;
