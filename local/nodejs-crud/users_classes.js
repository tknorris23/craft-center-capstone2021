module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getUsersClasses(req, res, mysql, context, complete){
        mysql.connection.query("SELECT user_class.user_ID AS user_ID, users.OSU_ID, users.first_name AS first_name, users.last_name AS last_name, user_class.class_ID AS class_ID, classes.category AS category, classes.section AS section FROM user_class LEFT JOIN users on users.user_ID = user_class.user_ID LEFT JOIN classes ON classes.class_ID = user_class.class_ID ORDER BY user_ID ASC, class_ID ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users_classes = results;
            complete();
        });
    }

    //function to search for user class relationships by OSU_ID
    function getUserClasses(req, res, mysql, context, complete){
        var query = "SELECT user_class.user_ID AS user_ID, users.OSU_ID, users.first_name, users.last_name, user_class.class_ID AS class_ID, classes.category AS category, classes.section AS section FROM user_class LEFT JOIN users on users.user_ID = user_class.user_ID LEFT JOIN classes ON classes.class_ID = user_class.class_ID WHERE users.OSU_ID LIKE " + mysql.connection.escape(req.params.s + '%');
        console.log(query)

        mysql.connection.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users_classes = results;
            complete();
        });
    }

    function getUsers(req, res, mysql, context, complete){
        mysql.connection.query("SELECT users.user_ID, users.first_name, users.last_name FROM users", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        });
    }

    function getClasses(req, res, mysql, context, complete){
        mysql.connection.query("SELECT classes.class_ID, classes.category, classes.section FROM classes", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes = results;
            complete();
        });
    }


    
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["search_users_classes.js"];
        var mysql = req.app.get('mysql');
        getUsersClasses(req, res, mysql, context, complete);
        getUsers(req, res, mysql, context, complete);
        getClasses(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('users_classes', context);
            }

        }
    });

    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["serch_users_classes.js"];
        var mysql = req.app.get('mysql');
        getUserClasses(req, res, mysql, context, complete);
        getUsers(req, res, mysql, context, complete);
        getClasses(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('users_classes', context);
            }
        }
    });

        /* Adds a user, redirects to the people page after adding */

        router.post('/', function(req, res){
            console.log(req.body.user_ID)
            console.log(req.body.class_ID)
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO user_class (user_ID, class_ID) VALUES(?, ?)";
            var inserts = [req.body.user_ID, req.body.class_ID];
            sql = mysql.connection.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/users_classes');
                }
            });
        });

    

    return router;
}();
