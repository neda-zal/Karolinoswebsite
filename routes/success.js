// jshint esversion:10
const express = require('express');
const router = express.Router();
const path = require('path');
const moment = require('moment');
var session = require('express-session');

var Events = require('../models/events.js');
var Proceduros = require('../models/proceduros.js');

router.get('/sekmingaregistracija', function(req, res) {
  var waitTill = new Date(new Date().getTime() + 1 * 1000);
  while(waitTill > new Date()){}
  Events.findOne({
      order: [ [ 'createdAt', 'DESC' ]]
  }).then(data => {
      var nuo = moment(data.dataValues.laikasnuo).format('YYYY-MM-DD hh:mm');
      var iki = moment(data.dataValues.laikasiki).format('YYYY-MM-DD hh:mm');
      res.render('main', {layout: 'index', data: data,  nuo: nuo, iki: iki});
    })
    .catch(function(err) {
      console.log(err);
    });
});

module.exports = router;
