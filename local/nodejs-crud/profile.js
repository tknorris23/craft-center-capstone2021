module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getProfile(req, res, mysql, context, complete){
    var query = "SELECT users.user_ID, users.OSU_ID, users.first_name, users.last_name, users.pronouns, users.email, users.alt_email, users.phone_num, users.term, users.membership, users.comments, users.debt FROM users WHERE users.OSU_ID LIKE " + mysql.connection.escape(req.params.s + '%');

    mysql.connection.query( query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.profile = results;
            complete();
        });
    }
    
    router.get('/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["get_profile.js"];
        var mysql = req.app.get('mysql');
        getProfile(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('profile', context);
            }

        }
    });

    return router;
}();
