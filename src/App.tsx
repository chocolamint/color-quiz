import React from 'react';
import './App.css';
import WhichCode from './quiz/WhichCode';
import { random } from './Utils';

const App: React.FC = () => {
  return (
    <div className="App">
      <WhichCode random={random} />
    </div>
  );
}

export default App;
