const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

MONGO_URL = "mongodb://127.0.0.1:27017"
//"mongodb+srv://meha:0X4J02fFh1pQifzj@cluster0-tfnai.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(
  MONGO_URL,
  (err, client) => {
    if (err) return console.log(err);
    db = client.db("volunteer_management");
    app.listen(3000, function() {
      console.log("listening on 3000");
    });

  }

*/

//Aakash
app.post('/clockin', function (req, res) {
    /*
        Input:
            * checkin time: string
            * userid/name: int
        Output:
            * success: boolean
            * errorcode: int
     */
    console.log(req.body)
     db.collection('users').findOne({"nfc_id":req.body.id}, async (err, doc) => {
         inserted = false
         if(!doc) {
             console.log("document doesn't exist");
             await db.collection('users').insertOne({
                 nfc_id: req.body.id,
                 shifts: []
             });
             inserted = true
         }
         if(true) {
             db.collection('users').findOneAndUpdate({"nfc_id":req.body.id},
             {
                 $push: {
                    shifts: {
                     clockin: req.body.clockin,
                     clockout: ""
                    }
                }
            }, (err, doc) => {
                console.log("here: ", doc);
                res.send({success: true, errorcode: 0});
            });
         }

     });
})

//Meha
app.get("/clockout", function(req, res) {
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

  db.collection("users").find({ nfc_id: req.body.userid }, response => {
    if (err) return console.log(err);
    cur_shifts = response.shifts;

    if (cur_shifts != null) {
      const cur_tuple = cur_shifts[cur_shifts.length - 1];
      cur_tuple.end_time = req.body.checkout_time;
      db.vms.update(
        { nfc_id: req.body.userid },
        {
          $set: {
            shifts: cur_shifts
          }
        }
      );
    } else {
      const cur_tuple = { end_time: req.body.checkout_time };
      const all_shifts = [cur_tuple];
      db.vms.update(
        { nfc_id: req.body.userid },
        {
          $set: {
            shifts: all_shifts
          }
        }
      );
      console.log("no current ongoing shift, clock out time added anyway");
    }
    res.send("Clock-out time added");
  });
});

//Rahul
app.post("/edit-shift-history", function(req, res) {
  /*
        Input:
            * new_time
            * shift_number
            * check-in: True/False
        Output:
            * success: boolean
            * errorcode: int
     */
});

//Rashmi
app.post('/get-shift-history', function(req, res) {
    db.collection('users').findOne({id: req.body.id}, (response) => {
        var shifts = response.shifts
        res.send(shifts)
    })
});
