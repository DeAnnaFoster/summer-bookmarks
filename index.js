var express = require('express')
var bodyParser = require('body-parser')
var dbConnect = require('./config/db/mlab-config')
var port = 3000

var server = express()
server.listen(port,()=>{
  console.log('Listening on port: ', port)
})

server.use(express.static(__dirname + '/public' ))

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:true})) 

var booksRouter = require('./routes/books')
server.use('/api/books', booksRouter)


