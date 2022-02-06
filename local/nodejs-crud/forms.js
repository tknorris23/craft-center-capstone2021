var express = require('express');
var router = express.Router();

function getForms(res, mysql, context, complete){
    mysql.connection.query("SELECT forms.form_ID, forms.type, forms.link FROM forms", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.forms = results;
        complete();
    });
}

router.get('/', function(req, res){
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["delete_form.js"];
    var mysql = req.app.get('mysql');
    getForms(res, mysql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('forms', context);
        }

    }
});

/* Adds a form, redirects to the forms page after adding */

router.post('/', function(req, res){
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO forms (type, link) VALUES(?, ?)";
    var inserts = [req.body.type, req.body.link];
    sql = mysql.connection.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/forms');
        }
    });
});

router.delete('/:form_ID', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM forms WHERE form_ID = ?";
    var inserts = [req.params.form_ID];
    sql = mysql.connection.query(sql, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        }else{
            res.status(202).end();
        }
    })
})



module.exports = router;
