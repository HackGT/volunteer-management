import React, { useState } from 'react';
import EditShiftHistory from './EditShiftHistory';
import ClockIn from './ClockIn'

const CurrentParticipant =  ({ goToHome }) => {
  const [editShiftHistory, setEditShiftHistory] = useState(false);
  const [clockIn, setClockIn] = useState(false);
  
  const goToEditShiftHistory = () => {
    setEditShiftHistory(true);
  }

  const goToClockIn = () => {
    setClockIn(true);
  }

  return(
    <div>
      <div>
        <button onClick={goToHome}>back</button>
      </div>
      <h2>Current Participant: </h2>
      <p>Rahul Rajan</p>

      <div>
        <button onClick={goToClockIn}>clock in</button>
        <button>clock out</button>
        <button onClick={goToEditShiftHistory}>edit shift history</button>
      </div>

      <div>
        {clockIn && <ClockIn />}
        {editShiftHistory && <EditShiftHistory />}
      </div>
    </div>
  )
}

export default CurrentParticipant;