var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var https = require('https');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var trackerRouter = require('./routes/tracker');
var listingRouter = require('./routes/listing');
var profileRouter = require('./routes/profile');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/tracker', trackerRouter);
app.use('/listing', listingRouter);
app.use('/profile', profileRouter);

const allowedOrigins = ['http://localhost:3000', "https://smtp.zoho.com", 'https://milkmates.org']

app.use(
  cors({
    origin: function(origin, callback)
    {
      if(allowedOrigins.indexOf(origin) !== -1)
      {
        callback(null, true);
      }
      else
      {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

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

const options = {
  key: fs.readFileSync("../milkmates.org.key"),
  cert: fs.readFileSync("../frontend/milkmates_org.crt")
};

https.createServer(options, app).listen(3000, ()=> {
  console.log("Server listening on port 3000");
});
module.exports = app;
