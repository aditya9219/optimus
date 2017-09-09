const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

var MONGOLAB_URI = "mongodb://aditya9219:engineer001@ds131119.mlab.com:31119/db_aditya9219",db;

MongoClient.connect(process.env.MONGOLAB_URI || MONGOLAB_URI, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 8080, () => {
    console.log('listening')
  })
})

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/mood', (req, res) => {
  db.collection('mood').save(req.body, (err, result) => {
   if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})