var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require('express-flash');
var session = require('express-session');
var mysql = require('./lib/db.js');
var bodyParser = require('body-parser');
var app = express();


// view engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars')
app.set('port', process.argv[2]);
app.set('mysql', mysql);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/static', express.static('public'));

// initializing express-session module
app.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'CraftCenterRocks'
}))

app.use(flash());

//get homepage
app.get('/', function(req, res){
  res.status(200).render('home', {

  });
})

app.use('/users', require('./users.js'));
app.use('/classes', require('./classes.js'));
app.use('/forms', require('./forms.js'));
app.use('/users_classes', require('./users_classes.js'));
app.use('/users_forms', require('./users_forms.js'));
app.use('/classes_forms', require('./classes_forms.js'));
app.use('/login', require('./login.js'));
app.use('/profile', require('./profile.js'));

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

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip[x].engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
