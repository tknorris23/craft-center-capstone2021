var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    var context = {};
    context.jsscripts = ["get_profile.js"];
    res.render('login', context);
    });

module.exports = router;

