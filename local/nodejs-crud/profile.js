var express = require('express');
var router = express.Router();

//when the user logs in, this function saves the userID in the session variable for later use
function saveProfile(req, res, mysql, context, complete) {

    session = req.session;

    //
    var query = "SELECT users.user_ID FROM users WHERE users.OSU_ID = " + mysql.connection.escape(req.params.s + '%');

    mysql.connection.query(query, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/profile');
            return;
        }
        try {
            session.user = results[0].user_ID;
        } catch (e) {
            console.log('User does not exits. Please try again');
            res.redirect('/login/input');
            return;
        }
        session.user = results[0].user_ID;
        context.profile = results;
        complete();
    });
}

//function to get user data from database
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
            res.redirect('/profile');
            return;
        }
        context.profile = results[0];
        complete();
    });
}

//function to search for a profile
router.get('/:s', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["get_profile.js"];
    var mysql = req.app.get('mysql');
    saveProfile(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.redirect('/');
        }
    }
});

//display results to page
router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["update_profile.js"];
    var mysql = req.app.get('mysql');
    getProfile(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.render('profile', context);
        }
    }
});

//update profile when user presses "save" button
router.post('/update', function(req, res) {

    session = req.session;

    var mysql = req.app.get('mysql');
    console.log(req.body)
    console.log(session.user)
    var sql = "UPDATE users SET first_name = ?, last_name = ?, pronouns = ?, email = ?, alt_email = ?, phone_num = ? WHERE user_ID = ?";
    var inserts = [req.body.firstName, req.body.lastName, req.body.pronounChoice, req.body.onidEmail, req.body.altEmails, req.body.phoneNum, session.user];
    mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.end();
            return;
        }
        res.redirect('/profile');
    });
});

module.exports = router;