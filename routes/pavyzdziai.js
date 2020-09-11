// jshint esversion:10
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/pavyzdziai', function(req, res) {
    res.sendFile(path.resolve('./pavyzdziai/pavyzdziai.html'));
});

module.exports = router;
