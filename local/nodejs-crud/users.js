module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getUsers(res, mysql, context, complete){
        mysql.connection.query("SELECT users.user_ID, users.OSU_ID, users.first_name, users.last_name, users.email, users.phone_num, users.term, users.membership, users.comments FROM users", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        });
    }
    
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete_user.js"];
        var mysql = req.app.get('mysql');
        getUsers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('users', context);
            }

        }
    });

        /* Adds a user, redirects to the users page after adding */

        router.post('/', function(req, res){
            console.log(req.body)
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO users (OSU_ID, first_name, last_name, email, phone_num, term, membership) VALUES(?, ?, ?, ?, ?, ?, ?)";
            var inserts = [req.body.OSU_ID, req.body.first_name, req.body.last_name, req.body.email, req.body.phone_num, req.body.term, req.body.membership];
            sql = mysql.connection.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/users');
                }
            });
        });

        router.delete('/:user_ID', function(req, res){
            var mysql = req.app.get('mysql');
            var sql = "DELETE FROM users WHERE user_ID = ?";
            var inserts = [req.params.user_ID];
            sql = mysql.connection.query(sql, inserts, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.status(400);
                    res.end();
                }else{
                    res.status(202).end();
                }
            })
        })

    return router;
}();
