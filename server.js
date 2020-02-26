const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const app = express();

var db;

MongoClient.connect(
  "mongodb+srv://meha:dGbZhA9V4UeSJqHZ@cluster0-jgd6t.mongodb.net/test?retryWrites=true&w=majority",
  (err, client) => {
    if (err) return console.log(err);
    db = client.db(“CRUD_Tutorial”);
    app.listen(3000, function() {
      console.log(“listening on 3000”);
    });
  }
);

/*

  db: "vms"
  document structure:
  {
    id: ObjectId
    name: String
    shifts: Array of Tuples (!start_time, !end_time)
  }

*/

//Aakash
app.get('/clockin', function (req, res) {
    /*
        Input:
            * checkin time: string
            * userid/name: int
        Output:
            * success: boolean
            * errorcode: int
     */

})

//Meha
app.get('/clockout', function(req, res) {
    /*
        Input:
            * checkout time: string
            * userid/name: int
        Output:
            * success: boolean
            * errorcode: String
                - "user does not exist"
                - "no current ongoing shift, clock out time added anyway"
     */

      db.collection("vms").find({ nfc_id: req.body.userid}, (response) => {
        if (err) return console.log(err);
        cur_shifts = response.shifts

        if (cur_shifts != null) {
          const cur_tuple  = cur_shifts[cur_shifts.length - 1]
          cur_tuple.end_time = req.body.checkout_time;
          db.vms.update(
            {nfc_id: req.body.userid},
            {$set:
              {
                shifts: cur_shifts
              }
            }
          );
        } else {
          const cur_tuple = {"end_time": req.body.checkout_time};
          const all_shifts = [cur_tuple];
          db.vms.update(
            {nfc_id: req.body.userid},
            {$set:
              {
                shifts: all_shifts
              }
            }
          );
          console.log("no current ongoing shift, clock out time added anyway")
        }
        res.send("Clock-out time added")

      });
})

//Rahul
app.post('/edit-shift-history', function(req, res) {
    /*
        Input:
            * new_time
            * shift_number
            * check-in: True/False
        Output:
            * success: boolean
            * errorcode: int
     */
})

//Rashmi
app.post('/get-shift-history', function(req, res) {

})

app.listen(3000, function() {
  console.log('listening on 3000')
})
