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
    this.status = "Not read";

    this.toggleStatus = function() {
        this.status = this.status === "Not read" ? "Read" : "Not read";
        displayBooks();
    };
}

function displayBooks() {
    booksContainer.replaceChildren();

    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        for (key in book) {
            if (key !== "toggleStatus") {
            const p = document.createElement("p");
            const capitalizedKey = key.at(0).toUpperCase() + key.slice(1);
            p.textContent = `${capitalizedKey}: ${book[key]}`;
            card.appendChild(p);
            }
        };

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("data-index", index);
        deleteButton.textContent = "Remove book";
        card.appendChild(deleteButton);

        const readButton = document.createElement("button");
        readButton.classList.add("read-button");
        readButton.setAttribute("type", "button");
        readButton.setAttribute("data-index", index);
        readButton.textContent = "Change read status";
        card.appendChild(readButton);

        booksContainer.appendChild(card);
    });
}

function addBookToLibrary(event) {
    event.preventDefault();
    const inputValues = Array.from(inputs).map(input => input.value);
    myLibrary.push(new Book(...inputValues));
    dialog.close();
    bookInfo.reset();
    displayBooks();
}

function handleButtonClick(event) {
    const button = event.target;
    const index = button.dataset.index;
    if (button.classList.contains("delete-button")) {
        myLibrary.splice(index,1);
    } else if (button.classList.contains("read-button")) {
        myLibrary[index].toggleStatus();
    }
    displayBooks();
}

bookInfo.addEventListener("submit", addBookToLibrary);
booksContainer.addEventListener("click", handleButtonClick);
newBookButton.addEventListener("click", () => dialog.showModal());

cancelButton.addEventListener("click", () => {
    dialog.close();
    bookInfo.reset();
});