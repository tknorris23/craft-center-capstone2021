var express = require('express');
var router = express.Router();

//function to get profile from session.user variable
function getProfile(req, res, mysql, context, complete) {

    session = req.session;
    //console.log(session);

    if (!session.user) {
        console.log('User must login before viewing their forms status');
        res.redirect('/login');
        return;
    }

    var query = "SELECT users.user_ID, users.OSU_ID, users.first_name, users.last_name, users.pronouns, users.email, users.alt_email, users.phone_num, users.term, users.membership, users.comments, users.debt FROM users WHERE users.user_ID = ?";

    var inserts = [session.user];

    mysql.connection.query(query, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/forms_status');
            return;
        }
        context.profile = results;
        complete();
    });
}

//function to get forms the user has not completed yet
function getIncompleteForms(req, res, mysql, context, complete) {

    session = req.session;
    //console.log(session);

    var query = "SELECT class_form.class_ID AS class_ID, classes.category AS category, classes.section AS section, class_form.form_ID AS form_ID, forms.type AS type FROM class_form LEFT JOIN classes on classes.class_ID = class_form.class_ID LEFT JOIN forms ON forms.form_ID = class_form.form_ID WHERE class_form.class_ID IN (SELECT user_class.class_ID AS class_ID FROM user_class WHERE user_class.user_ID LIKE ?) AND class_form.form_ID NOT IN (SELECT user_form.form_ID FROM user_form WHERE user_form.user_ID LIKE ?)";

    var inserts = [session.user, session.user];

    mysql.connection.query(query, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/forms_status');
            return;
        }
        context.incomplete_forms = results;
        complete();
    });
}

//function to get the forms the user has completed
function getCompleteForms(req, res, mysql, context, complete) {

    session = req.session;
    //console.log(session);

    var query = "SELECT class_form.class_ID AS class_ID, classes.category AS category, classes.section AS section, class_form.form_ID AS form_ID, forms.type AS type FROM class_form LEFT JOIN classes on classes.class_ID = class_form.class_ID LEFT JOIN forms ON forms.form_ID = class_form.form_ID WHERE class_form.form_ID IN (SELECT user_form.form_ID FROM user_form WHERE user_form.user_ID LIKE ?)";

    var inserts = [session.user];

    mysql.connection.query(query, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/forms_status');
            return;
        }
        context.complete_forms = results;
        complete();
    });
}

//display results to page
router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    var mysql = req.app.get('mysql');
    getProfile(req, res, mysql, context, complete);
    getIncompleteForms(req, res, mysql, context, complete);
    getCompleteForms(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 3) {
            res.render('forms_status', context);
        }
    }
});

module.exports = router;