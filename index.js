var express = require('express')
var app = express()
var Parse = require('parse/node').Parse; // module to use parsa javascript sdk

// our parse project
Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");

//Database connection
var mongoose = require('mongoose');

mongoose.connect('mongodb://adpillrw:mongo12@ds011248.mlab.com:11248/adherencepill');

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

var Schema = mongoose.Schema;

// schemas for most existing collections
// using string formats for pointers, not sure if correct
var MessageSchema = new Schema({
  //_id: String,
  _created_at: {type: Date},
  _updated_at: {type: Date},
  _p_addressee: String,
  _p_sender: String,
  subject: String,
  text: String
},
{collection: 'Message'});

var BottleSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  UUID: String,
  BatteryCharge: String,
  weight: String
},
{collection: 'Bottle'});

var DoctorSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  address: String,
  hospitalName: String,
  hospitalCity: String,
  _p_userAccount: String
},
{collection: 'Doctor'});

var ImageSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  UUID: String,
  image: String
},
{collection: 'Image'});

var ImageStorageDevSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  Image: String
},
{collection: 'ImageStorageDev'});

var PatientSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  _p_userAccount: String
},
{collection: 'Patient'});

var PillLibSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  pillInfo: String,
  pillName: String,
  pillInstruction: String
},
{collection: 'PillLib'});

var PrescriptionSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  _p_bottle: String,
  pillName: String,
  _p_schedule: String,
  _p_patientID: String
},
{collection: 'Prescription'});

var ScheduleSchema = new Schema({
  _created_at: {type: Date},
  _updated_at: {type: Date},
  _p_Drug: String,
  Monday: {},
  Tuesday:{},
  Wednesday:{},
  Thursday:{},
  Friday:{},
  Saturday:{},
  Sunday:{}
},
{collection: 'Schedule'});




// needed for dates (updatedat etc)
//var now = new Date();
//var jsonDate = now.toJSON();

// example of how to save to Mongo
/*var Message = mongoose.model('Message', MessageSchema);
var newMess  = new Message({
  _p_addressee: "Yo",
  _p_sender: "Yo",
  subject: "Test ",
  text: "Test",
  _created_at: jsonDate,
  _updated_at: jsonDate
});

newMess.save(function (err) {
  if (err) console.log(err);
})*/

app.get('/', function(request, response) {
  response.send({'hi': 5})
})

app.post('/update', function(request, response) {
  var data = (request.body);
  // This is the json I used to test:
  // {"collection": "User", "Fields": {"username": "MONGO@mongo.msngo", "password": "xD",
  // "email": "MONGO@mongo.mongos", "phone": "3234asd23333", "firstname": "jacky",
  // "lastname": "baley", "gender": "Male"}}

  if (data['collection'] == "User") {
      var newUser = new Parse.User(); // new Parse User
      // run a loop on each field in the JSON
      for (var field in data['Fields'])
      {
        // set the appropriate field in the Parse User object
        newUser.set(field, data['Fields'][field]);
      }
      // save Parse User
      newUser.save();
  }


	response.send("Success");
})
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
