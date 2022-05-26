var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require('express-flash');
var sessions = require('express-session');
var mysql = require('./lib/db.js');
var bodyParser = require('body-parser');
var app = express();


// view engine setup
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use(express.static('public'));
app.use('/static', express.static('public'));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// initializing express-session module
app.use(sessions({
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: new sessions.MemoryStore,
    saveUninitialized: true,
    resave: 'false',
    secret: 'CraftCenterRocks'
}));

app.use('/', require('./student_dashboard.js'));
app.use('/users', require('./users.js'));
app.use('/classes', require('./classes.js'));
app.use('/forms', require('./forms.js'));
app.use('/users_classes', require('./users_classes.js'));
app.use('/users_forms', require('./users_forms.js'));
app.use('/classes_forms', require('./classes_forms.js'));
app.use('/login', require('./login.js'));
app.use('/profile', require('./profile.js'));
app.use('/my_classes', require('./my_classes.js'));
app.use('/open_classes', require('./open_classes.js'));
app.use('/forms_status', require('./forms_status.js'));
//app.use('/membership', require('./membership.js'));

app.get('/membership', function(req, res) {
    res.status(200).render('membership', {});
})

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.status(404);
    res.render('404');
    //next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.error(err.stack);
    res.status(500);
    res.render('500');
    //res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    //res.status(err.status || 500);
    //res.render('error');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});