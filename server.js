const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

var MONGOLAB_URI = "mongodb://aditya9219:engineer001@ds131119.mlab.com:31119/db_aditya9219",db;

MongoClient.connect(process.env.MONGOLAB_URI || MONGOLAB_URI, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 5000, () => {
    console.log('listening on process.env.PORT');
  })
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/mood', (req, res) => {
     console.log("the request is ", req.body);
     console.log("the date is ",req.body.date);
	 console.log("countH is ", req.body.countH);
	 console.log("countS is ", req.body.countS);
     var record = db.collection('mood').find({'date':req.date});
	 if(record){
	   var countH = req.countH;
       var countS = req.countS;
	   if(countH)
	       db.collection('mood').update({'date':req.date},{$set:{'countH':record.countH + countH}});
	   else 
	       db.collection('mood').update({'date':req.date},{$set:{'countC':record.countS + countS}});
	 }
	 else
	 {
	   db.collection('mood').save(req.body, (err, result) => {
         if (err) return console.log(err)
         console.log('saved to database')
         res.redirect('/')
     })   
}
})