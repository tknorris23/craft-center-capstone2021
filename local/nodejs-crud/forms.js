var express = require('express');
var router = express.Router();

//function to retrieve forms from forms table
function getForms(res, mysql, context, complete) {
    mysql.connection.query("SELECT forms.form_ID, forms.type, forms.link FROM forms", function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/forms');
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
    context.jsscripts = ["delete_form.js"];
    var mysql = req.app.get('mysql');
    getForms(res, mysql, context, complete);

    function complete() {
        callbackCount++;
        if (callbackCount >= 1) {
            res.render('forms', context);
        }

    }
});

/* Adds a form, redirects to the forms page after adding */
router.post('/', function(req, res) {
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO forms (type, link) VALUES(?, ?)";
    var inserts = [req.body.type, req.body.link];
    sql = mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.redirect('/forms');
            return;
        } else {
            res.redirect('/forms');
        }
    });
});

//delete a form from the form table
router.delete('/:form_ID', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM forms WHERE form_ID = ?";
    var inserts = [req.params.form_ID];
    sql = mysql.connection.query(sql, inserts, function(error, results, fields) {
        if (error) {
            res.write(JSON.stringify(error));
            res.status(400);
            res.redirect('/forms');
            return;
        } else {
            res.status(202).end();
        }
    })
})



module.exports = router;