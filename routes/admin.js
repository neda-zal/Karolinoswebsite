// jshint esversion:10
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
var session = require('express-session');

router.get('/admin', function(req, res) {
    res.sendFile(path.resolve('./admin/admin.html'));
});

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json({ type: 'application/*+json' }));
router.use(bodyParser.text({ type: 'text/html' }));

router.post('/admin', urlencodedParser, function(req, res, next) {

    const customer = {
      title: req.body.pavadinimas,
      start: req.body.laikasnuo,
      end: req.body.laikasiki
    };
    
    const customer1 = {
      start: req.body.laikasnuo,
      end: req.body.laikasiki
    };

    fs.readFile(path.resolve(process.cwd() + '/json/events.json'), 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        var obj = JSON.parse(data); //now it an object
        obj.push(customer1); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(path.resolve(process.cwd() + '/json/events.json'), json, err => {
          if (err) {
              console.log('Error writing file', err);
          } else {
              console.log('Successfully wrote file');
          }
      }); // write it back
    }});

    fs.readFile(path.resolve(process.cwd() + '/json/realevents.json'), 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        var obj = JSON.parse(data); //now it an object
        obj.push(customer); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(path.resolve(process.cwd() + '/json/realevents.json'), json, err => {
          if (err) {
              console.log('Error writing file', err);
          } else {
              console.log('Successfully wrote file');
          }
      }); // write it back
    }});

    res.redirect('back');
});

router.post('/istrinti', urlencodedParser, function(req, res, next) {

      var nuo = req.body.laikasnuo1,
      iki = req.body.laikasiki1;

    fs.readFile(path.resolve(process.cwd() + '/json/events.json'), 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        var obj = JSON.parse(data);
        for(var i = 0; i < obj.length; i++)
        {
          if(obj[i].start == nuo && obj[i].end == iki)
          {
            obj.splice(i);
          }
        }

        json = JSON.stringify(obj);
        fs.writeFile(path.resolve(process.cwd() + '/json/events.json'), json, err => {
          if (err) {
              console.log('Error writing file', err);
          } else {
              console.log('Successfully wrote file');
          }
      });
    }});

    fs.readFile(path.resolve(process.cwd() + '/json/realevents.json'), 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        var obj = JSON.parse(data);

        for(var i = 0; i < obj.length; i++)
        {
          if(obj[i].start == nuo && obj[i].end == iki)
          {
            obj.splice(i);
          }
        }

        json = JSON.stringify(obj);
        fs.writeFile(path.resolve(process.cwd() + '/json/realevents.json'), json, err => {
          if (err) {
              console.log('Error writing file', err);
          } else {
              console.log('Successfully wrote file');
          }
      }); // write it back
    }});

    res.redirect('back');
});



module.exports = router;
