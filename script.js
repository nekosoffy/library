const myLibrary = [];
const newBookButton = document.querySelector("#add");
const dialog = document.querySelector("dialog");
const inputs = document.querySelectorAll("input, textarea");
const cancelButton = document.querySelector("#cancel");
const bookInfo = document.querySelector("form");

function Book(title, author, pages, notes) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.notes = notes;
}

const inputValues = Array.from(inputs).map(input => input.value);

function addBookToLibrary(event) {
    const book = new Book(...inputValues);
    myLibrary.push(book);
    console.log(myLibrary);
    event.preventDefault();
    dialog.close();
    bookInfo.reset();
}

bookInfo.addEventListener("submit", addBookToLibrary);

newBookButton.addEventListener("click", () => {
    dialog.showModal(); 
});

cancelButton.addEventListener("click", () => {
    dialog.close(); 
});