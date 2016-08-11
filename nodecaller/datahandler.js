var mongo = require('mongodb');
var json2csv = require('json2csv');
var fs = require('fs');

var bodyParser = require('body-parser');
var Server = mongo.Server
    , Db = mongo.Db
    , BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, {
    auto_reconnect: true
});
db = new Db('clicksdb', server);
// open the database
db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'clicksdb' database");
        db.collection('clicks', {
            strict: true
        }, function (err, collection) { 
            if (err) {
                console.log("The 'clicks' collection doesn't exist. Creating it with sample data...");
                populateDB(sampleData); // remove later
            }
        });
    }
});
var getCount = function (req, res) {
    db.collection('clicks', function (err, collection) {
        collection.count({}, function(err, counter){
            if(err){
                console.log(err);
            }
            res.json(counter);
        })
//        collection.find().toArray(function (err, items) {
//            res.json(items.length);
//        });
    });
};
var findAll = function (req, res) {
    db.collection('clicks', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.json(items);
        });
    });
};

var download = function (req, res) {
    db.collection('clicks', function (err, collection) {
        collection.find().toArray(function (err, items) {
            console.log("getting items from db ...");
            try {
                
                var fields = ['time'];
                var csv = json2csv({ data: items, fields: fields });

                fs.writeFile(__dirname + '/../click_times.csv', csv, function(err) {
                  if (err) throw err;
                  console.log('Generated click_times.csv files!');
                });
                res.sendStatus(200);
            }
            catch (err) {
                console.error(err);
            }
        });
    });

};

// this function is here in order to add current date to each generated file. currently not in use
var getDate = function(){
  
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = dd+'/'+mm+'/'+yyyy;
    
    return today;
    
};
var sampleData = [
    {
        timeTstamp: "12:44:16"
        }
    , {
        timeTstamp: "13:44:00"
        }
    ];
// add sample data if necessary
var populateDB = function (data) {
    db.collection('clicks', function (err, collection) {
        console.log("initializing 'clicks' collection with " + data)
        collection.insert(data, {
            safe: true
        }, function (err, result) {});
    });
};
// get all clicks
var addClick = function (req, res) {
    var click = req.body;
    console.log('Adding a click: ' + JSON.stringify(click));
    
    db.collection('clicks', function (err, collection) {
        collection.insert(click, {
            safe: true
        }, function (err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            }
            else {
                console.log('Success: ');
                
                getCount({}, res); // returns the count to the client
            }
        });
    });
}
var resetCollection = function (req, res) {
    console.log("Deleting all items from collection 'clicks'");
    // passing {} to delete means remove all objects!
    db.collection('clicks', function (err, collection) {
        collection.remove({}, {
            safe: true
        }, function (err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred - ' + err
                });
            }
            else {
                console.log('' + result + ' document(s) deleted');
                getCount({}, res); // will return the current number of docs (should be 0)
            }
        });
    });
};
module.exports = {
    getCount: getCount
    , addClick: addClick
    , findAll: findAll
    , download: download
    , populateDB: populateDB
    , resetCollection: resetCollection
}