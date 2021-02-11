/* required for this application:
-express
-express-handlebars
-body-parser
-mysql
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var mysql = require('mysql');

var routes = require('./routes/index');

var app = express();

// place your favicon in /public/images
app.use(favicon(path.join(__dirname, '/public/images', 'chameleon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

var connection = mysql.createConnection({
  host: "localhost",
  //provide the following three
  user: "root",
  password: "nbuser",
  database: "salesdb"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected! to mysql");
  /*con.query(mysql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });*/
});

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout',
partialsDir: path.join(__dirname, 'views/toolbar')}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/index', function(req, res) {
  console.log('home page');
  const sqlQuery = 'select * from category';
  connection.query(sqlQuery, function(error, result, fields){
    if(error) throw error;

    console.log("results for your qurery are:");
    console.log(result);
  res.render('index', {
    title: 'Purple calf', 
    result: result
  });
});
});

app.post('/submit', urlencodedParser, function(req, res){
  
  var name = req.body.name;

  var insertQuery =  `INSERT INTO category(name) VALUES ("${name}")`;
  connection.query(insertQuery, function(error, result) {
    if (error) throw error;
    console.log('record saved to category table');
    res.redirect('/index');
  });
});

app.get('/test', function(req, res) {
  res.render('test', {title: 'test'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
