var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://aditya9219:engineer001@ds131119.mlab.com:31119/db_aditya9219');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
    console.log("Connected Successfully.");

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
	
    app.get('/', (req, res) => {
        res.send("hello word");
    });

    app.post('/mood', (req, res) => {
       console.log("the request is ", req.body);
       console.log("the date is ",req.body.date);
	   console.log("countH is ", req.body.countH);
	   console.log("countS is ", req.body.countS);
	   console.log("the collection is ", db);
       var record = db.mood.find({"date":req.body.date});
	   console.log(record);
	   if(record){
	     console.log("in if")
	     var countH = req.countH;
         var countS = req.countS;
	     if(countH)
	         db.mood.update({"date":req.date},{$set:{"countH":record.countH + countH}});
	     else 
	         db.mood.update({"date":req.date},{$set:{"countC":record.countS + countS}});
	   }
	   else
	   {
	      console.log("in else");
	      db.mood.insert(req.body);
	      /*db.collection('mood').save(req.body, (err, result) => {
          if (err) return console.log("error1233",err)
             console.log('saved to database')*/
       }   
	   res.end();
    });

    app.listen(3000, () => {
        console.log('Running app.js on 3000');
    });
});