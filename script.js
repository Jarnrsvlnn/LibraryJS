const createBook = document.querySelector(".create-book");
const addBook = document.querySelector(".addBook")
const showForm = document.querySelector("dialog");
const closeForm = document.querySelector(".close-book-form");

const myLibrary = [ // this is where all the book objects will be stored in

];

function Book(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, readState) { // every book that gets created will be handled by this and saved to the library array
    const newBook = new Book(title, author, pages, readState);
    myLibrary.push(newBook);
}

function displayBook() {
    const bookContainer = document.querySelector(".book-container");
    bookContainer.innerHTML = '';

    for (let book of myLibrary) {
        const card = document.createElement('div');
        card.classList.add("book-card");
        card.innerHTML = `
        <h1>${book.title}</h1>
        <h2>${book.author}</h2>
        <p>${book.pages}</p>
        <p>${book.readState ? 'Read' : 'Not Read'}</p>
        `;
        bookContainer.append(card);
    }
}

createBook.addEventListener('click', () => {
    showForm.showModal();
});

closeForm.addEventListener('click', () => {
    showForm.close();
});


