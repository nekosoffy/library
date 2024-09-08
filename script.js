const myLibrary = [];

function Book(title, author, pages, notes) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.notes = notes;

    this.info = function() {
        return {
            title: `${title}`,
            author: `${author}`,
            pages: `${pages}`,
            notes: `${notes}`
        }
    };
}