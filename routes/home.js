// jshint esversion:10
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
var session = require('express-session');

const app = express();

var Events = require('../models/events.js');
var Proceduros = require('../models/proceduros.js');
//const eventas = require('../json/events.json');
//const realeventas = require('../json/realevents.json');

// create application/json parser
var jsonParser = bodyParser.json();
router.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.json({ type: 'application/*+json' }));
router.use(bodyParser.text({ type: 'text/html' }));


app.disable('etag');

app.get('/', function(req, res) {
    res.sendFile('../index.html', {'root': __dirname});
});

router.post('/prisijungti', function(req, res) {
    res.redirect('/admin');
});

router.post('/', urlencodedParser, function(req, res, next) {
    var proc = [];

    // rasome i klientu json
    proc = req.body.proceduros.split("; ");
    proc.splice(-1,1);
    const customer = {
      start: req.body.laikasnuo,
      end: req.body.laikasiki
    };
    fs.readFile(path.resolve(process.cwd() + '/json/events.json'), 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        var obj = [];
        obj = JSON.parse(data); //now it an object
        obj.push(customer); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(path.resolve(process.cwd() + '/json/events.json'), json, err => {
          if (err) {
              console.log('Error writing file', err);
          } else {
              console.log('Successfully wrote file');
          }
      }); // write it back
    }});

    var description = req.body.proceduros + " " + req.body.vardas + " " +
    req.body.pavarde + " " + req.body.email + " " + req.body.telnumeris + " visa kaina: " + req.body.visasuma;

    // rasome i main json
    const customer1 = {
      title: description,
      start: req.body.laikasnuo,
      end: req.body.laikasiki
    };

    fs.readFile(path.resolve(process.cwd() + '/json/realevents.json'), 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        //var obj = [];
        var obj = JSON.parse(data); //now it an object
        obj.push(customer1); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(path.resolve(process.cwd() + '/json/realevents.json'), json, err => {
          if (err) {
              console.log('Error writing file', err);
          } else {
              console.log('Successfully wrote file');
          }
      }); // write it back
    }});


    Events.create({
      vardas: req.body.vardas,
      pavarde: req.body.pavarde,
      elpastas: req.body.email,
      telnumeris: req.body.telnumeris,
      kaina: parseInt(req.body.visasuma),
      laikasnuo: req.body.laikasnuo,
      laikasiki: req.body.laikasiki
    }).then(user => {
      Events.findOne({
        order: [ [ 'createdAt', 'DESC' ]],
    }).then(data => {
      proc.forEach(procedures =>
      {
        Proceduros.create({
          iduser: data.dataValues.id,
          title: procedures
        })
        .catch(function(err) {
            console.log(err);
        });
      });
    });
  })
  .catch(function(err) {
    console.log(err);
});
var waitTill = new Date(new Date().getTime() + 2 * 1000);
while(waitTill > new Date()){}
res.redirect('/sekmingaregistracija');
});

module.exports = router;
