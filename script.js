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

function displayBook() {
    const div = document.createElement("div");
    document.body.appendChild(div);
    let newBook = myLibrary.at(-1);
        for (key in newBook) {
            const p = document.createElement("p");
            let info = `${key}`;
            p.textContent = info.at(0).toUpperCase() + info.slice(1) + `: ${newBook[key]}`;
            div.appendChild(p);
    }
}

function addBookToLibrary(event) {
    const inputValues = Array.from(inputs).map(input => input.value);
    const book = new Book(...inputValues);
    myLibrary.push(book);
    console.log(myLibrary);
    event.preventDefault();
    dialog.close();
    bookInfo.reset();
    displayBook();
}

bookInfo.addEventListener("submit", addBookToLibrary);

newBookButton.addEventListener("click", () => {
    dialog.showModal(); 
});

cancelButton.addEventListener("click", () => {
    dialog.close();
    bookInfo.reset();
});