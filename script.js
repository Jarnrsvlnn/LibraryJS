const createBook = document.querySelector(".create-book");
const addBook = document.querySelector("form")
const showForm = document.querySelector("dialog");
const closeForm = document.querySelector(".close-book-form");

const myLibrary = [ // this is where all the book objects will be stored in

];

function Book(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState === 'true';
    this.id = crypto.randomUUID();
}

Book.prototype.changeReadStatus = function() {
    this.readState = !this.readState;
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
        const deleteBook = document.createElement('button');
        const toggleReadStatus = document.createElement('button');
        toggleReadStatus.textContent = 'Change Status'
        deleteBook.textContent = "Remove";
        deleteBook.dataset.id = book.id;

        toggleReadStatus.addEventListener('click', () => {
            book.changeReadStatus();
            displayBook();
        })

        deleteBook.addEventListener('click', (e) => {
            const bookID = e.target.dataset.id;
            const bookIndex = myLibrary.findIndex(book => 
                {
                    return book.id == bookID
                });

            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1)
                displayBook();
            }
        })

        card.classList.add("book-card");
        card.innerHTML = `
        <h1>${book.title}</h1>
        <h2>${book.author}</h2>
        <p>${book.pages}</p>
        <p>${book.readState ? 'Read' : 'Not Read'}</p>
        `
        
        bookContainer.append(card);
        card.append(toggleReadStatus);
        card.append(deleteBook);
    }
}

createBook.addEventListener('click', () => {
    showForm.showModal();
});

closeForm.addEventListener('click', () => {
    showForm.close();
});

addBook.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById("book-title").value;
    const author = document.getElementById("book-author").value;
    const page = document.getElementById("book-pages").value;
    const hasRead = document.querySelector("input[name='readState']:checked")?.value;

    addBookToLibrary(title, author, page, hasRead);
    displayBook();
    console.log('its working');
    showForm.close();
    addBook.reset();
});

