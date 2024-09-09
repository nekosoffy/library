const myLibrary = [];
const newBookButton = document.querySelector("#add");
const dialog = document.querySelector("dialog");
const inputs = document.querySelectorAll("input, textarea");
const cancelButton = document.querySelector("#cancel");
const bookInfo = document.querySelector("form");
const booksContainer = document.querySelector("#books-container");

function Book(title, author, pages, notes) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.notes = notes;
}

function displayBooks() {
    booksContainer.replaceChildren();

    myLibrary.forEach(book => {
        const div = document.createElement("div");
        div.classList.add("book-card");

        for (key in book) {
            const p = document.createElement("p");
            const formattedKey = key.At(0).toUpperCase() + key.slice(1);
            p.textContent = `${formattedKey}: ${value}`;
            div.appendChild(p);
        }

        booksContainer.appendChild(div);
    });
}

function addBookToLibrary(event) {
    const inputValues = Array.from(inputs).map(input => input.value);
    const book = new Book(...inputValues);
    myLibrary.push(book);
    console.log(myLibrary);
    event.preventDefault();
    dialog.close();
    bookInfo.reset();
    displayBooks();
}

bookInfo.addEventListener("submit", addBookToLibrary);

newBookButton.addEventListener("click", () => {
    dialog.showModal(); 
});

cancelButton.addEventListener("click", () => {
    dialog.close();
    bookInfo.reset();
});