var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var clicks = require('./datahandler');
var app = express();

 var port = process.argv[2] || 3000;

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

app.get('/api/all', clicks.findAll);
app.get('/api/count', clicks.getCount);
app.get('/api/download', clicks.download);

app.post('/api/add', clicks.addClick);
//app.put('/wines/:id', clicks.updateWine);
app.delete('/api/reset', clicks.resetCollection);

app.listen(port);
console.log('Listening on port '+ port);

