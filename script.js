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
        const card = document.createElement("div");
        card.classList.add("book-card");

        const button = document.createElement("button");
        button.classList.add("delete-button");
        button.setAttribute("type", "button");
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