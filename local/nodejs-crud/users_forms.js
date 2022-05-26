var express = require('express');
var router = express.Router();

//retrieve user_form table from database
function getUsersForms(req, res, mysql, context, complete) {
    mysql.connection.query("SELECT user_form.user_ID AS user_ID, users.OSU_ID, users.first_name AS first_name, users.last_name AS last_name, user_form.form_ID AS form_ID, forms.type AS type, forms.link FROM user_form LEFT JOIN users on users.user_ID = user_form.user_ID LEFT JOIN forms ON forms.form_ID = user_form.form_ID ORDER BY user_ID ASC, form_ID ASC;", function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/users_forms');
            return;
        }
        context.users_forms = results;
        complete();
    });
}

//function to search for user class relationships by name
function searchUsersForms(req, res, mysql, context, complete) {
    var query = "SELECT user_form.user_ID AS user_ID, users.OSU_ID, users.first_name AS first_name, users.last_name AS last_name, user_form.form_ID AS form_ID, forms.type, forms.link AS type FROM user_form LEFT JOIN users on users.user_ID = user_form.user_ID LEFT JOIN forms ON forms.form_ID = user_form.form_ID WHERE users.first_name LIKE " + mysql.connection.escape(req.params.s + '%');

    mysql.connection.query(query, function(error, results, fields) {
        if (error) {
            res.redirect('/users_forms');
            return;
        }
        console.log(results);
        context.users_forms = results;
        complete();
    });
}

//function to get all users from database for dropdown
function getUsers(req, res, mysql, context, complete) {
    mysql.connection.query("SELECT users.user_ID, users.first_name, users.last_name FROM users", function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/users_forms');
            return;
        }
        context.users = results;
        complete();
    });
}

//function to get all forms from database for dropdown
function getForms(req, res, mysql, context, complete) {
    mysql.connection.query("SELECT forms.form_ID, forms.type FROM forms", function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/users_forms');
            return;
        }
        context.forms = results;
        complete();
    });
}

//display results to page
router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["search_users_forms.js"];
    var mysql = req.app.get('mysql');
    getUsersForms(req, res, mysql, context, complete);
    getUsers(req, res, mysql, context, complete);
    getForms(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render('users_forms', context);
        }

    }
});

//display search results to page
router.get('/search/:s', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["search_users_forms.js"];
    var mysql = req.app.get('mysql');
    searchUsersForms(req, res, mysql, context, complete);
    getUsers(req, res, mysql, context, complete);
    getForms(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render('users_forms', context);
        }
    }
});

/* Adds a users_forms relationship, redirects to the users_forms page after adding */
router.post('/', function(req, res) {
    console.log(req.body.user_ID)
    console.log(req.body.form_ID)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO user_form (user_ID, form_ID) VALUES(?, ?)";
    var inserts = [req.body.user_ID, req.body.form_ID];
    sql = mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/users_forms');
            return;
        } else {
            res.redirect('/users_forms');
        }
    });
});

module.exports = router;