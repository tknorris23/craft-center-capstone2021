var express = require('express');
var router = express.Router();

function getClasses(res, mysql, context, complete){
    mysql.connection.query("SELECT classes.class_ID, classes.category, classes.section, classes.description, classes.instructor, classes.term, classes.date, classes.time, classes.fee FROM classes", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.redirect('/open_classes');
            return;
        }
        context.open_classes = results;
        complete();
    });
}

router.get('/', function(req, res){
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["delete_class.js"];
    var mysql = req.app.get('mysql');
    getClasses(res, mysql, context, complete);
    function complete(){
        callbackCount++;
        if(callbackCount >= 1){
            res.render('open_classes', context);
        }
    }
});
module.exports = router;