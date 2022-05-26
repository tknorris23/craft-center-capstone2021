var express = require('express');
var router = express.Router();

//function to get the user's profile from the session variable
function getProfile(req, res, mysql, context, complete) {

    session = req.session;

    if (!session.user) {
        console.log('User must login before viewing their profile');
        res.redirect('/login');
        return;
    }

    var query = "SELECT users.user_ID, users.OSU_ID, users.first_name, users.last_name, users.pronouns, users.email, users.alt_email, users.phone_num, users.term, users.membership, users.comments, users.debt FROM users WHERE users.user_ID = ?";

    var inserts = [session.user];

    mysql.connection.query(query, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/');
            return;
        }
        context.profile = results[0];
        complete();
    });
}

//display results to page
router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    var mysql = req.app.get('mysql');
    getProfile(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.render('student_dashboard', context);
        }
    }
});
module.exports = router;