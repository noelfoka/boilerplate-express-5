let express = require('express');
let app = express();
require('dotenv').config()
var bodyParser = require('body-parser');

// #1
// console.log("Hello World");
const mySecret = process.env['MESSAGE_STYLE']

// #2
/*app.get('/', function(req, res) {
  res.send('Hello Express');
});*/

// #4
app.use('/public', express.static(__dirname + '/public'))

// #7
app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});
// ou bien encore
/*app.use((req, res, next) => {

 let string = `${req.method} ${req.path} - ${req.ip}`
 console.log(string) 
   
  next();

});*/

// #11
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// #3
app.get('/', function(req, res) {
  res.sendFile(absolutePath = __dirname + '/views/index.html');
})

// #5
/*app.get('/json', (req, res) => {
  res.json({'message': 'Hello json'});
})*/

// #6
app.get('/json', (req, res) => {
  if (process.env['MESSAGE_STYLE'] === 'uppercase') {
    res.json({'message': 'HELLO JSON'});
  } else {
    res.json({'message': 'Hello json'});
  }
});

// #8
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, 
  (req, res) => {
    res.send({time: req.time});
  });

// #9
app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({echo: word});
});

// #10

app.get('/name', (req, res) => {
  var firstName = req.query.first;
  var lastName = req.query.last
  
  res.json({name: `${firstName} ${lastName}`});
});

// #12
app.post('/name', (req, res) => {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});













 module.exports = app;
