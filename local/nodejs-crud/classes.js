var express = require('express');
var router = express.Router();

//function to get all classes from database
function getClasses(req, res, mysql, context, complete) {
    var query = "SELECT classes.class_ID, classes.category, classes.section, classes.description, classes.instructor, classes.term, classes.date, classes.time, classes.fee, classes.curr_enrolled, classes.max_enrolled FROM classes";


    mysql.connection.query(query, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/classes');
            return;
        }
        context.classes = results;
        complete();
    });
}

//function to search for user class relationships by name
function searchClasses(req, res, mysql, context, complete) {
    var query = "SELECT classes.class_ID, classes.category, classes.section, classes.description, classes.instructor, classes.term, classes.date, classes.time, classes.fee FROM classes WHERE classes.section LIKE " + mysql.connection.escape('%' + req.params.s + '%');

    mysql.connection.query(query, function(error, results, fields) {
        if (error) {
            res.redirect('/classes');
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
    context.jsscripts = ["delete_class.js", "search_class.js"];
    var mysql = req.app.get('mysql');
    getClasses(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.render('classes', context);
        }

    }
});

//display search results
router.get('/search/:s', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["search_class.js", "delete_class.js"];
    var mysql = req.app.get('mysql');
    getClasses(req, res, mysql, context, complete);
    searchClasses(req, res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 2) {
            res.render('classes', context);
        }
    }
});

/* Adds a class, redirects to the classes page after adding */
router.post('/', function(req, res) {
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO classes (class_ID, category, section, description, instructor, term, date, time, fee) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var inserts = [req.body.class_ID, req.body.category, req.body.section, req.body.description, req.body.instructor, req.body.term, req.body.date, req.body.time, req.body.fee];
    sql = mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/classes');
            return;
        } else {
            res.redirect('/classes');
        }
    });
});

//used to delete a class from the database
router.delete('/:class_ID', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM classes WHERE class_ID = ?";
    var inserts = [req.params.class_ID];
    sql = mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.status(400);
            res.redirect('/classes');
            return;
        } else {
            res.status(202).end();
        }
    })
})

module.exports = router;