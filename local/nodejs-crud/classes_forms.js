module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getClassesForms(req, res, mysql, context, complete){
        mysql.connection.query("SELECT class_form.class_ID AS class_ID, classes.category AS category, classes.section AS section, class_form.form_ID AS form_ID, forms.type AS type FROM class_form LEFT JOIN classes on classes.class_ID = class_form.class_ID LEFT JOIN forms ON forms.form_ID = class_form.form_ID ORDER BY class_ID ASC, form_ID ASC;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes_forms = results;
            complete();
        });
    }

    //function to search for class form relationships by class category
    function searchClassesForms(req, res, mysql, context, complete){
        var query = "SELECT class_form.class_ID AS class_ID, classes.category AS category, classes.section AS section, class_form.form_ID AS form_ID, forms.type AS type FROM class_form LEFT JOIN classes on classes.class_ID = class_form.class_ID LEFT JOIN forms ON forms.form_ID = class_form.form_ID WHERE classes.category LIKE " + mysql.connection.escape(req.params.s + '%');

        mysql.connection.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.classes_forms = results;
            complete();
        });
    }

    function getForms(req, res, mysql, context, complete){
        mysql.connection.query("SELECT forms.form_ID, forms.type, forms.link FROM forms;", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.forms = results;
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
        context.jsscripts = ["search_classes_forms.js"];
        var mysql = req.app.get('mysql');
        getClassesForms(req, res, mysql, context, complete);
        getForms(req, res, mysql, context, complete);
        getClasses(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('classes_forms', context);
            }

        }
    });

    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["serch_classes_forms.js"];
        var mysql = req.app.get('mysql');
        searchClassesForms(req, res, mysql, context, complete);
        getForms(req, res, mysql, context, complete);
        getClasses(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('classes_forms', context);
            }
        }
    });

        /* Adds a user, redirects to the people page after adding */
        /*
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
        */

    

    return router;
}();