var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')


var bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    currentPage: {type: Number, required: true, default: 0}
})

var Books = mongoose.model('Book', bookSchema)

router.get('/', function(req, res, next) {
    Books.find({})
    .then((books)=>{
      res.send(books)
    })
    .catch(next)
})

router.post('/', function(req, res, next) {
    Books.create(req.body)
    .then((book)=>{
        res.send(book)
    })
    .catch(next)
})

router.get('/:bookId', function(req, res, next){
  let bookId = req.params.bookId
  Books.findById(bookId)
  .then(book =>{
    if(book){
    res.send(book)
    }else{
      next({message: 'You suck!'})
    }
  })
  .catch(next)
})

router.delete('/:bookId', (req, res, next) => {
  var bookId = req.params.bookId
  Books.findByIdAndRemove(bookId)
  .then(book =>{
    res.send({message: 'Successfully deleted.'})
  })
  .catch(next)
})

router.put('/:bookId', (req, res, next) =>{
  var bookId = req.params.bookId
  var updatedBookObj = req.body
  Books.findByIdAndUpdate(bookId, updatedBookObj)
  .then(book => {
    res.send({message: 'Successfully Updated Book'})
  })
  .catch(next)
})


router.use(defaultErrorHandler)

function defaultErrorHandler(err, req, res, next){
  if (req.xhr){
    res.json({success: false, error: err})
  }else{
    res.json({success: false, error: err.message})
  }
}

module.exports = router