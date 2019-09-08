import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';

const random = Math.random;

const App: React.FC = () => {
  return (
    <div className="App">
      <WhichCode random={random()} />
    </div>
  );
}

export default App;
