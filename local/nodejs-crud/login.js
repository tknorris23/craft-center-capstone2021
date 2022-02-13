var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    var context = {};
    res.render('login', context);
});

router.get('/input', function(req, res){
    var context = {};
    context.jsscripts = ["get_profile.js"];
    res.render('login_input', context);
});

module.exports = router;

