const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sessionUser = require('./middlewares/sessionUser');
const logger = require('morgan');
const methodOverride =  require('method-override');

const app = express();

//middlewares
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'));

//session y cookie
app.use(cookieParser());
app.use(session({
  secret: 'topSecret',
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// routes y usuario en .locals
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

app.use(sessionUser);
app.use('/', indexRouter); // Rutas /
app.use('/products', productsRouter); // Rutas /products
app.use('/users', usersRouter); // Rutas /users


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
  res.render('error');
});

module.exports = app;
