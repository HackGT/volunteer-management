import React, { useState, useEffect } from 'react';

const clockoutErrorCodes = {
  "1": "You have clocked out successfully",
  "0": "You have clocked out, but forgot to clock in. Go to Edit Shift History to record your clock in time"
};

const ClockOut = ({ clockoutMessage }) => {
  const [displayMessage, editDisplayMessage] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: "1", clockout: "5:00" })
    };
    fetch('/clockout', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("here")
        console.log(data)
        //{success: true, errorcode: 1}
        var message = clockoutErrorCodes[data.errorcode]
        editDisplayMessage(message)
      });
  })
  return (
    <div>
      {displayMessage}
    </div>
  )
}

export default ClockOut;