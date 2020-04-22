import React, { useState } from 'react';
import EditShiftHistory from './EditShiftHistory';
import ClockOut from './ClockOut'

const CurrentParticipant =  ({ goToHome }) => {
  const [editShiftHistory, setEditShiftHistory] = useState(false);
  const [clockOut, setClockOut] = useState(false);
  const [curClockoutMessage, setCurClockoutMessage] = useState("dummy clockout message");
  const clockoutErrorCodes = {
    "1": "You have clocked out successfully",
    "0": "You have clocked out, but forgot to clock in. Go to Edit Shift History to record your clock in time"
  };
  
  const goToEditShiftHistory = () => {
    setEditShiftHistory(true);
    setClockOut(false);
  }

  const goToClockOut = () => {
    // make api call here
    // set curClockoutMessage based on error code from api call
    setEditShiftHistory(false);
    setClockOut(true);
  }

  return(
    <div>
      <div>
        <button onClick={goToHome}>back</button>
      </div>
      <h2>Current Participant: </h2>
      <p>Rahul Rajan</p>

      <div>
        <button>clock in</button>
        <button onClick={goToClockOut}>clock out</button>
        <button onClick={goToEditShiftHistory}>edit shift history</button>
      </div>

      <div>
        {clockOut && <ClockOut clockoutMessage={curClockoutMessage}/>}
        {editShiftHistory && <EditShiftHistory />}
      </div>
    </div>
  )
}

export default CurrentParticipant;