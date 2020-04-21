import React, { useState } from 'react';
import EditShiftHistory from './EditShiftHistory';

const CurrentParticipant =  ({ goToHome }) => {
  const [editShiftHistory, setEditShiftHistory] = useState(false);

  const goToEditShiftHistory = () => {
    setEditShiftHistory(true);
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
        <button>clock out</button>
        <button onClick={goToEditShiftHistory}>edit shift history</button>
      </div>

      <div>
        {editShiftHistory && <EditShiftHistory />}
      </div>
    </div>
  )
}

export default CurrentParticipant;
