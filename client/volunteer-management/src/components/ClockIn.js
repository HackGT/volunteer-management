import React,{ useState, useEffect } from 'react';

const errorCodes = {
  "1": "You have clocked in successfully"
  ,"0": "You have clocked in, however you previously forgot to clockout"
}

const ClockIn = () => {
  const [message, editMessage] = useState([]);

  useEffect(() => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: "1" , clockin: "1:00"})
    };
    fetch('/clockin', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("here")
            console.log(data)
            var message = errorCodes[data.errorcode]
            editMessage(message)
        });
  },[])
  
  return(
    <div>
        {message}
    </div>
  )
}

export default ClockIn;
