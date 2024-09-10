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

    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        const button = document.createElement("button");
        
        card.classList.add("book-card");
        button.classList.add("delete-button");
        button.setAttribute("type", "button");
        button.setAttribute("data-index",`${index}`);
        button.textContent = "Remove book";

        for (key in book) {
            const p = document.createElement("p");
            const formattedKey = key.at(0).toUpperCase() + key.slice(1);
            p.textContent = `${formattedKey}: ${book[key]}`;
            card.appendChild(p);
        }

        card.appendChild(button);
        booksContainer.appendChild(card);
    });
}

function addBookToLibrary(event) {
    const inputValues = Array.from(inputs).map(input => input.value);
    const book = new Book(...inputValues);
    myLibrary.push(book);
    event.preventDefault();
    dialog.close();
    bookInfo.reset();
    displayBooks();
}

function deleteBook(event) {
    if (event.target.classList.contains("delete-button")) {
        const button = event.target;
        index = button.getAttribute("data-index");
        myLibrary.splice(index,1);
        displayBooks();
    }
}

bookInfo.addEventListener("submit", addBookToLibrary);

booksContainer.addEventListener("click", deleteBook);

newBookButton.addEventListener("click", () => {
    dialog.showModal(); 
});

cancelButton.addEventListener("click", () => {
    dialog.close();
    bookInfo.reset();
});