// Book Class:  Represents a book
class Book{
  constructor(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI Class : Handle UI Tasks
class UI {
  static displayBooks() {
    // const storedBooks = [
    //   {
    //     title:"Book One",
    //     author:"John Gary",
    //     isbn:"3535"
    //   },
    //   {
    //     title:"Book Two",
    //     author:"Govert Hanyu",
    //     isbn:"6746"
    //   },
    // ];

    // const books = storedBooks;
    const books = Store.getBooks();
    books.forEach((book) => {
      UI.addBookToList(book);
    });
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
                     <td>${book.author}</td>
                     <td>${book.isbn}</td>
                     <td><a href="#" class="btn btn-danger btn-sm delete"><span><i class="fas fa-times"></i></span></a></td>
    `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className){
    const alertDiv = document.createElement("div");
    alertDiv.className =`alert alert-${className} w-50 h-10 m-auto mt-5 mb-5`;
    alertDiv.appendChild(document.createTextNode(message));
    const formContainer = document.querySelector(".form-cont");
    const form = document.querySelector("#book-form");
    formContainer.insertBefore(alertDiv, form);
    alertDiv.style.fontSize = "1rem";
    // setTimeout
    setTimeout(()=>{
      document.querySelector(".alert").remove();
    },3000)
  }
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Store Class : Handles Storage
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem("books") === null){
      books = [];
    }
    else{
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books",JSON.stringify(books));
  }
  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach((book, index)=>{
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books",JSON.stringify(books));
  }
}
// Event : Display Books
document.addEventListener("DOMContentLoaded",UI.displayBooks());
// Even : Add a Book
document.querySelector("#book-form").addEventListener("submit",(e)=>{
  e.preventDefault();
  // get values from form
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate
  if(title === "" || author === "" || isbn === ""){
    UI.showAlert("Please fill details in all fields !","danger");
  }
  else{
    //instatiate book
    const book = new Book(title, author, isbn);
    // Add book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);
    // Clear fields
    UI.clearFields();
    UI.showAlert("Book is added Successfully.", "success");
  }

})

// Event : Remove a Book
document.querySelector("#book-list").addEventListener("click",(e)=>{
  // Remove Book from UI
  UI.deleteBook(e.target);

  // Remove Book from Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show the Book Removed Alert message
  UI.showAlert("Book is removeded.", "info");
})