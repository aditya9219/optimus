const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

var MONGOLAB_URI = "mongodb://aditya9219:engineer001@ds131119.mlab.com:31119/db_aditya9219",db;

MongoClient.connect(process.env.MONGOLAB_URI || MONGOLAB_URI, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 5000, () => {
    console.log('listening on process.env.PORT');
  })
})

app.get('/', (req, res) => {
  res.send('hello world123')
})

app.post('/mood', (req, res) => {
     console.log("the date is ",req.date);
	 console.log("countH is ", req.countH);
	 console.log("countC is ", req.countC);
     var record = db.collection.find({'date':req.date});
	 if(record){
	   var countH = req.countH;
       var countS = req.countS;
	   if(countH)
	       db.collection('mood').update({'date':req.date},{$set:{'countH':record.countH + countH}});
	   else 
	       db.collection('mood').update({'date':req.date},{$set:{'countC':record.countC + countC}});
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