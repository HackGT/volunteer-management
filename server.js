const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
);

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
app.post("/clockout", function(req, res) {
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

      db.collection('users').findOne({"nfc_id": req.body.id}, (err, doc) => {
        if (doc.shifts.length < 1 || doc.shifts[doc.shifts.length - 1].clockout.length > 0) {
          db.collection('users').findOneAndUpdate({"nfc_id":req.body.id},
          {
              $push: {
                shifts: {
                  clockin: "",
                  clockout: req.body.clockout
                }
            }
          }, (err, doc) => {
              console.log("here: ", doc);
              res.send({success: true, errorcode: 0});
          });
        } else {
          last_index = doc.shifts.length - 1;
          shifts_last_index = "shifts." + last_index
          cur_shift = doc.shifts[doc.shifts.length - 1];
          cur_shift.clockout = req.body.clockout;

          // replace last shift in the array
          db.collection('users').findOneAndUpdate({"nfc_id":req.body.id},
          {
            $set: {shifts_last_index : cur_shift}
          }, (err, doc) => {
            res.send({success: true, errorcode: 1});
          });
        }
      })
  });
});

//Rahul
app.post("/edit-shift-history", function(req, res) {

  /*
        Input:
            * shifts_array: []
            * id
        Output:
            * success: boolean
            * errorcode: int
     */
    console.log(typeof(req.body.id)) //number

     db.collection('users').findOne({"nfc_id":req.body.id}, async (err, doc) => {
         console.log(doc) //null
        if (!doc) {
            console.log("false response") //..
            res.send({success: false, errorcode: 0});
        } else {
            db.collection('users').findOneAndUpdate({"nfc_id":req.body.id},
             {
                 $set: {
                    shifts : JSON.parse(req.body.shifts_array)
                }
            }, (err, doc) => {
                res.send({success: true, errorcode: 0});
            });
        }
    })
});

//Rashmi
app.post('/get-shift-history', function(req, res) {
    db.collection('users').findOne({id: req.body.id}, (response) => {
        var shifts = response.shifts
        res.send(shifts)
    })
});
