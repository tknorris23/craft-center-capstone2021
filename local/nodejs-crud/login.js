var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    console.log(req.body);
    var context = {};
    context.jsscripts = ["get_profile.js"];
    res.render('login', context);
    });

module.exports = router;

