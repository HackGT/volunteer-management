import React,{ useState, useEffect } from 'react';

const EditShiftHistory = () => {
  const [shifts, editShifts] = useState([]);

  useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "1" })
    };
    fetch('/get-shift-history', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("here")
            console.log(data)
            editShifts(data)
        });
  },[])
  var uiShifts = shifts.map(shift => {
      return (
          <div>
            clockin: {shift.clockin}
            clockout: {shift.clockout}
          </div>
      )
  })
  return(
    <div>
        {uiShifts}
    </div>
  )
}

export default EditShiftHistory;
