const h1 = document.querySelector('h1');
const showButton = document.querySelector('.container > button');
const dialog = document.querySelector('dialog');
const closeBtn = document.querySelector('.close');
const submitBtn = dialog.querySelector('button[type="submit"');
const bookList = document.querySelector('div.books');
const title = dialog.querySelector('#title');
const author = dialog.querySelector('#author');
const pages = dialog.querySelector('#pages');
let emptyList = true;

booksArr = [];

window.addEventListener('load', () => {
    h1.style.transform = 'translateY(0)';
    showButton.style.transform = 'translateY(0)';
})

showButton.addEventListener('click', () => {
    dialog.showModal();
    dialog.classList.add('open');
})

closeBtn.addEventListener('click', () => {
    dialog.classList.remove('open');
    setTimeout(() => {
        dialog.close();
    }, 500);
})

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (emptyList == true) initializelist();
    const isRead = document.querySelector('input[name="read"]:checked');
    const newBook = new Book(title.value, author.value, pages.value, isRead.value);
    booksArr.push(newBook);
    const bookIndex = booksArr.indexOf(newBook);
    setBookRow(newBook, bookIndex);
})

function setBookRow(book, index) {
    const bookEntry = document.createElement('ul');
    bookEntry.setAttribute('data-index', index);
    bookEntry.classList.add('book', 'open');

    const bookTitle = document.createElement('li');
    bookTitle.textContent = `${book.title}`;

    const bookAuthor = document.createElement('li');
    bookAuthor.textContent = `${book.author}`;

    const bookPages = document.createElement('li');
    bookPages.textContent = `${book.pages}`;

    const bookStatus = document.createElement('li');
    bookStatus.classList.add('readStatus');
    bookStatus.textContent = `${book.read}`;

    const changeBtn = document.createElement('button');
    changeBtn.textContent = 'Change';
    changeBtn.setAttribute("type", "button");
    changeBtn.setAttribute("data-index", `${index}`);
    changeBtn.addEventListener('click', () => {
        console.log('lol')
    })
    bookStatus.appendChild(changeBtn);

    bookEntry.append(bookTitle, bookAuthor, bookPages, bookStatus);
    bookList.append(bookEntry);
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function initializelist() {
    {
        bookList.innerHTML = `<ul class="book open">
        <li>Title</li>
        <li>Author</li>
        <li>Pages</li>
        <li>Read?</li>
        </ul>`;

        bookList.classList.add('open');
    }
    emptyList = false;
}