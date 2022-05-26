var express = require('express');
var router = express.Router();

//funtion to get all classes the user is enrolled in
function getClasses(req, res, mysql, context, complete) {

    session = req.session;

    var sql = "SELECT classes.class_ID, classes.category, classes.section, classes.description, classes.instructor, classes.term, classes.date, classes.time, classes.fee, classes.curr_enrolled, classes.max_enrolled FROM classes, users WHERE classes.class_ID AND users.user_ID LIKE ? ORDER BY class_ID ASC";

    var inserts = [session.user];

    sql = mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            //res.redirect('/open_classes');
            return;
        }
        context.open_classes = results;
        complete();
    });
}

//display results to page
router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["add_class.js"];
    var mysql = req.app.get('mysql');
    getClasses(req, res, mysql, context, complete);
    //checkEnroll(req, res, mysql, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.render('open_classes', context);
        }
    }
});

//get the class the user wants to register for
router.get('/:class_ID', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["add_class.js"];
    var mysql = req.app.get('mysql');
    getClasses(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.render('open_classes', context);
        }
    }
});

/* Adds a class to the user's schedule, redirects to the my_classes page after adding */
router.post('/:class_ID', function(req, res) {

    session = req.session;

    console.log(req.params)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO user_class (user_ID, class_ID, status) VALUES(?, ?, ?)";
    var inserts = [session.user, req.params.class_ID, 'Waitlisted'];
    sql = mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            console.log(error);
            res.write(JSON.stringify(error));
            //res.redirect('/my_classes');
            return;
        } else {
            res.redirect('/my_classes');
        }
    });
});

module.exports = router;