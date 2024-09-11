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
    this.status = "Not read";
    this.notes = notes;

    this.toggleStatus = function() {
        if (this.status === "Not read") {
            this.status = "Read";
        } else {
            this.status = "Not read";
        }
        displayBooks();
    }
}

function displayBooks() {
    booksContainer.replaceChildren();

    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        const div = document.createElement("div");
        card.classList.add("book-card");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("data-index", index);
        deleteButton.textContent = "✖";
        div.appendChild(deleteButton);

        const readButton = document.createElement("button");
        readButton.classList.add("read-button");
        readButton.setAttribute("type", "button");
        readButton.setAttribute("data-index", index);
        readButton.textContent = "✔";
        div.appendChild(readButton);
        card.appendChild(div);

        for (key in book) {
            if (key !== "toggleStatus" && book[key] !== "") {
            const p = document.createElement("p");
            const span = document.createElement("span");
            const div = document.createElement("div");
            span.textContent = `${key}`
            p.textContent = `${book[key]}`;
                if (key === "notes") {
                    p.classList.add("notes");
                }
            div.appendChild(span);
            div.appendChild(p);
            card.appendChild(div);
            }
        };

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


// Functions for styling purposes

const welcomeWrapper = document.querySelector("#welcome-wrapper");
const mainWrapper = document.querySelector("#main-wrapper");
const startButton = document.querySelector("#start-button");

function fadeOut() {
    let opacity = 1;
    let interval = setInterval(function () {
        if (opacity > 0) {
            opacity -= 0.1;
            welcomeWrapper.style.opacity = opacity;
        } else {
            clearInterval(interval);
            welcomeWrapper.remove();
            fadeIn();
        }
    }, 100);
}

function fadeIn() {
    let opacity = 0;
    mainWrapper.style.opacity = opacity;
    mainWrapper.style.display = "block";
    let interval = setInterval(function () {
        if (opacity < 1) {
            opacity += 0.1;
            mainWrapper.style.opacity = opacity;
            } else {
                clearInterval(interval);
            }
        }, 100);
}

startButton.addEventListener("click", fadeOut,{once:true});