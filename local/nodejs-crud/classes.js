module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var session = require('express-session');

    function getClasses(res, mysql, context, complete){
        mysql.connection.query("SELECT classes.class_ID, classes.category, classes.section, classes.description, classes.instructor, classes.term, classes.date, classes.time, classes.cost FROM classes", function(error, results, fields){
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
        context.jsscripts = ["delete_class.js"];
        var mysql = req.app.get('mysql');
        // req.session is accessible from any page and can have data added to it.
        if (req.session) {
            console.log("Session exists.");
            // If the variable views doesn't exist, this will create it as a new dict.
            // This dict is stored in the session and remains within session
            //      even if the user moves to other pages.
            if (!req.session.views) {
                req.session.views = {}
            }
            
            // If the dict has no entry for the classes page, this creates one and sets it to 0.
            if (!req.session.views['classes']) {
                req.session.views['classes'] = 0;
            }
            
            // This will increment the classes view counter.
            req.session.views['classes'] = (req.session.views['classes'] || 0) + 1;

            // The context variable returned by this function is what is used by Handlebars
            //      to fill data into its template files. To create a new variable for use
            //      in templating, we add to the context dictionary.
            //      Now the viewcount is usable in classes.handlebars under the name 'views'.
            context['views'] = req.session.views['classes']
        }
        getClasses(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('classes', context);
            }

        }
        
    });


    /* Adds a class, redirects to the classes page after adding */

    router.post('/', function(req, res){
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO classes (class_ID, category, section, description, instructor, term, date, time, cost) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var inserts = [req.body.class_ID, req.body.category, req.body.section, req.body.description, req.body.instructor, req.body.term, req.body.date, req.body.time, req.body.cost];
        sql = mysql.connection.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/classes');
            }
        });
    });

    router.delete('/:class_ID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM classes WHERE class_ID = ?";
        var inserts = [req.params.class_ID];
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
