module.exports = function(){
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
        var mysql = req.app.get('mysql');
        getForms(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('forms', context);
            }

        }
    });

    

    return router;
}();
