var express = require('express');
var bodyParser = require('body-parser')
var app = express();
bodyParser.urlencoded({extended: false})
console.log("Hello World");
app.use((req, res, next) => {
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
})
app.get('/', (req, res) => {
  res.sendFile(__dirname+'/views/index.html');
});
app.use(express.static(__dirname+'/public'));
app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE==="uppercase") {
    res.json({message: "Hello json".toUpperCase()});
  } else {
    res.json({message: "Hello json"})
  }
})
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time})
});
app.get('/:word/echo',(req,res) => {
  res.json({echo: req.params.word})
})
app.post('/name',bodyParser.urlencoded({extended: false}),(req, res) => {
  res.json({name: req.body.first+" "+req.body.last});    
})

// mongodb+srv://pacifique:test123@cluster0.pjv2y.mongodb.net/<dbname>?retryWrites=true&w=majority



























 module.exports = app;
