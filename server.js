const express = require('express');
const MongoClient = require("mongodb").MongoClient;
const app = express();

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
            * checkin time: string
            * userid/name: int
        Output:
            * success: boolean
            * errorcode: int
     */

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
    db.collection(‘users’).findOne({nfc_id: req.body.id}, (response) => {
        var shifts = response.shifts
        res.send(shifts)
    })
})

app.listen(3000, function() {
  console.log('listening on 3000')
})
