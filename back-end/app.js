var createError = require('http-errors');
global.express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global.conn = require('./data/server.js');
var cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', require('./routes/index.js'));
app.use('/customers', require('./routes/customers.js'));
app.use('/employees', require('./routes/employees.js'));
app.use('/categories', require('./routes/categories.js'));
app.use('/products', require('./routes/products.js'));
app.use('/suppliers', require('./routes/suppliers.js'));
app.use('/shippers', require('./routes/shippers.js'));

conn.connect(error => {
  console.log(error ? "Connection Failed" : "Database Connected");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('error');
});

module.exports = app;