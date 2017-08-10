function BookmarkService() {
  var myBooks = []

  function logError(err) {
    console.error('ITS BRWOKED', err)
  }

  this.getBooks = function getBooks(draw) {
    $.get('/api/books').then((books) => {
      myBooks = books
      draw(myBooks)
    })
  }

  this.addBook = function (newBook, cb) {
    $.post('/api/books', newBook).then(function () {
      cb()
    })
  }

  this.deleteBook = function (bookId, getBooks) {
    $.ajax({
      contentType: 'application/json',
      method: 'DELETE',
      url: '/api/books/' + bookId
    })
      .then(getBooks)
      .fail(logError)
  }

  this.editBook = function (bookId, getBooks) {
    var book = myBooks.find(book => book._id == bookId)
    if(book.currentPage == 100){
      book.currentPage = 0
    }else{
      book.currentPage = 100
    }
    if (!book) { return logError('Ugh no idea what you are doing')}

    $.ajax({
      contentType: 'application/json',
      method: 'PUT',
      url: '/api/books/' + bookId,
      data: JSON.stringify(book)
    }) // I AM AN ANGRY TEENAGER
      .then(getBooks)
      .fail(logError)
  }



}