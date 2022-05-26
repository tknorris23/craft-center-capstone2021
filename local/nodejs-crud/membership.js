var express = require('express');
var router = express.Router();

//display membership page
router.get('/', function(req, res) {
    complete();
    var callbackCount = 0;
    var context = {};
    var mysql = req.app.get('mysql');

    function complete() {
        callbackCount++;
        if (callbackCount >= 0) {
            res.render('membership', context);
        }

    }
});













module.exports = router;