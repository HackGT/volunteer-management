import React, { useState } from 'react';

const Home = ({ goToParticipant }) => {
  return(
    <div className="App">
        <h1>Please Scan a Badge</h1>
        <button onClick={goToParticipant}> button that imitates scan </button>
    </div>
  )
}

export default Home;