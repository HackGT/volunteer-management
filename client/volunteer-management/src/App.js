import React, { useState } from 'react';
import CurrentParticipant from './components/CurrentParticipant';
import Home from './components/Home'
import './App.css';

const App = () => {
  const [home, setHome] = useState(true);
  const [participant, setParticipant] = useState(false);

  const goToParticipant = () => {
    setHome(false);
    setParticipant(true);
  }

  const goToHome = () => {
    setHome(true);
    setParticipant(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        {home && <Home goToParticipant={goToParticipant}/>}
        {participant && <CurrentParticipant goToHome={goToHome} />}
      </header>
    </div>
  );
}

export default App;
