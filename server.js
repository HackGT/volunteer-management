const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const app = express();

var db;

MongoClient.connect(
  "mongodb+srv://meha:0X4J02fFh1pQifzj@cluster0-tfnai.mongodb.net/test?retryWrites=true&w=majority",
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

     if (db.collection("vms").find({ _id: req.body.userid})) {
      cur_shifts = db.vms.find(
        {_id: req.body.userid},
        {shifts: 1}
      );
      if (cur_shifts != null) {
        const cur_tuple  = cur_shifts[cur_shifts.length - 1]
        cur_tuple[1] = req.body.checkout_time;
        cur_shifts[cur_shifts.length - 1] = cur_tuple;
        db.vms.update(
          {_id: req.body.userid},
          {$set:
            {
              shifts: cur_shifts
            }
          }
        );
      } else {
        const cur_shift_tuple = [null, req.body.checkout_time];
        const all_shifts = [cur_shift_tuple];
        db.vms.update(
          {_id: req.body.userid},
          {$set:
            {
              shifts: all_shifts
            }
          }
        );
        return ("no current ongoing shift, clock out time added anyway");
      }
     } else {
       return ("user does not exist");
     }
    
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
