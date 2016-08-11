var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var dbHandler = require('./datahandler');
var app = express();

 var port = process.env.PORT || 3000;

app.use(morgan('dev')); /* 'default','short','tiny','dev' */
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));

app.get('/', function (req, res) {
    console.log('someone has routed to /');
    res.sendFile(__dirname + '/../index.html');
});

// app.get('/api/all', dbHandler.findAll); // not in use
app.get('/api/count', dbHandler.getCount);
app.get('/api/download', dbHandler.download);
app.post('/api/add', dbHandler.addClick);
app.delete('/api/reset', dbHandler.resetCollection);

dbHandler.connectDatabase();

app.listen(port);
console.log('Listening on port '+ port);

