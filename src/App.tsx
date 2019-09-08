import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';

const App: React.FC = () => {
  return (
    <div className="App">
      <WhichCode randomGenerator={Math.random} />
    </div>
  );
}

export default App;
