module.exports = function(){
    var express = require('express');
    var router = express.Router();
    
    router.get('/', function(req, res){
        var context = {req};
        context.jsscripts = ["get_profile.js"];
        res.render('login', context);
        });

    return router;
}();
