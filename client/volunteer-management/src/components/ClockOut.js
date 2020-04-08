import React, { useState } from 'react';

const ClockOut = ({ clockoutMessage }) => {
  return(
    <div className="App">
        <p>{clockoutMessage}</p>
    </div>
  )
}

export default ClockOut;