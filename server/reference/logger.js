const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston'); // for transports.Console
const bodyParser = require('body-parser');
const app = module.exports = express();
var methodOverride = require('method-override');

app.use(bodyParser.json()); 
app.use(methodOverride());

// Let's make our express `Router` first.
var router = express.Router();
router.get('/error', function(req, res, next) {
  // here we cause an error in the pipeline so we see express-winston in action.
  return next(new Error("This is an error and it should be logged to the console"));
});

router.get('/', function(req, res, next) {
  res.write('This is a normal request, it should be logged to the console too');
  res.end();
});

// express-winston logger makes sense BEFORE the router
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({filename: 'file.log'})
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  responseField : !null,
}));

// Now we can tell the app to use our routing code:
app.use(router);

// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({filename: 'file.log'})
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));

app.listen(3300, function(){
  console.log("express-winston demo listening on port %d in %s mode", 3300, app.settings.env);
});