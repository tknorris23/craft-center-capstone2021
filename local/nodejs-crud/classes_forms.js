var express = require('express');
var router = express.Router();

//function to retrieve class_form table from database
function getClassesForms(req, res, mysql, context, complete) {
    mysql.connection.query("SELECT class_form.class_ID AS class_ID, classes.category AS category, classes.section AS section, class_form.form_ID AS form_ID, forms.type AS type FROM class_form LEFT JOIN classes on classes.class_ID = class_form.class_ID LEFT JOIN forms ON forms.form_ID = class_form.form_ID ORDER BY class_ID ASC, form_ID ASC;", function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/classes_forms');
            return;
        }
        context.classes_forms = results;
        complete();
    });
}

//function to search for class form relationships by class category
function searchClassesForms(req, res, mysql, context, complete) {
    var query = "SELECT class_form.class_ID AS class_ID, classes.category AS category, classes.section AS section, class_form.form_ID AS form_ID, forms.type AS type FROM class_form LEFT JOIN classes on classes.class_ID = class_form.class_ID LEFT JOIN forms ON forms.form_ID = class_form.form_ID WHERE classes.category LIKE " + mysql.connection.escape(req.params.s + '%');

    mysql.connection.query(query, function(error, results, fields) {
        if (error) {
            res.redirect('/classes_forms');
            return;
        }
        context.classes_forms = results;
        complete();
    });
}

//function to retrieve all forms from the forms table
function getForms(req, res, mysql, context, complete) {
    mysql.connection.query("SELECT forms.form_ID, forms.type, forms.link FROM forms", function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/classes_forms');
            return;
        }
        context.forms = results;
        complete();
    });
}

//function to retrieve all classes from the classes table
function getClasses(req, res, mysql, context, complete) {
    mysql.connection.query("SELECT classes.class_ID, classes.category, classes.section FROM classes GROUP BY classes.category", function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/classes_forms');
            return;
        }
        context.classes = results;
        complete();
    });
}

//display results to page
router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["search_classes_forms.js"];
    var mysql = req.app.get('mysql');
    getClassesForms(req, res, mysql, context, complete);
    getForms(req, res, mysql, context, complete);
    getClasses(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render('classes_forms', context);
        }

    }
});

//get search results
router.get('/search/:s', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["search_classes_forms.js"];
    var mysql = req.app.get('mysql');
    searchClassesForms(req, res, mysql, context, complete);
    getForms(req, res, mysql, context, complete);
    getClasses(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render('classes_forms', context);
        }
    }
});

/* Adds a class_form relationship, redirects to the class_form page after adding */
router.post('/', function(req, res) {
    console.log(req.body.class_ID)
    console.log(req.body.form_ID)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO class_form (class_ID, form_ID) VALUES(?, ?)";
    var inserts = [req.body.class_ID, req.body.form_ID];
    sql = mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/classes_forms');
            return;
        } else {
            res.redirect('/classes_forms');
        }
    });
});

module.exports = router;