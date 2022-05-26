var express = require('express');
var router = express.Router();

//function to get classes the user is registered in from the user_class table
function getMyClasses(req, res, mysql, context, complete) {

    session = req.session;
    console.log(session);

    if (!session.user) {
        console.log('User must login before viewing their classes');
        res.redirect('/login');
        return;
    }

    var sql = "SELECT user_class.class_ID AS class_ID, classes.category, classes.section, classes.description, classes.instructor, classes.term, classes.date, classes.time, classes.fee, user_class.status FROM user_class LEFT JOIN users on users.user_ID = user_class.user_ID LEFT JOIN classes ON classes.class_ID = user_class.class_ID WHERE users.user_ID LIKE ? ORDER BY class_ID ASC";

    var inserts = [session.user];
    sql = mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/my_classes');
            return;
        }
        context.my_classes = results;
        complete();
    });
}

//display results to page
router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    var mysql = req.app.get('mysql');
    getMyClasses(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.render('my_classes', context);
        }

    }
});


module.exports = router;