function BookmarkController(){
  var bookmarkService = new BookmarkService()

  function getBooks(){
    bookmarkService.getBooks(draw)
  }

  function draw(bookArr){
    var bookElem = document.getElementById("book-list")
    var template = '<ul>'
    for (var i = 0; i < bookArr.length; i++) {
      var book = bookArr[i];
      template += `
      <li>${book.title}:  ${book.currentPage}</li>
      <button type="button" onclick="app.controllers.bookmarkController.deleteBook('${book._id}')">Delorted</button>
      <button type="button" onclick="app.controllers.bookmarkController.editBook('${book._id}')">READ</button>
      `
    }
    template += '</ul>'
    bookElem.innerHTML = template
  }

  this.addBook = function(e){
    e.preventDefault()
    var newTitle = e.target.title.value
    var newBook = {
      title: newTitle
    }
    bookmarkService.addBook(newBook, getBooks)
  }

  this.editBook = function(bookId){
    bookmarkService.editBook(bookId, getBooks)
  }

  this.deleteBook = function(bookId){
    bookmarkService.deleteBook(bookId, getBooks)
  }













  getBooks()
}