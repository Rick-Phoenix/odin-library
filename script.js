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
    if (emptyList == true) {
        bookList.innerHTML = `<ul class="book open">
        <li>Title</li>
        <li>Author</li>
        <li>Pages</li>
        <li>Read?</li>
        </ul>`;

        bookList.classList.add('open');
    }
    emptyList = false;
    const isRead = document.querySelector('input[name="read"]:checked');
    const newBook = new Book(title.value, author.value, pages.value, +isRead.value);
    const bookEntry = document.createElement('ul');
    bookEntry.classList.add('book', 'open');
    bookEntry.innerHTML = `
    <li>${newBook.title}</li>
    <li>${newBook.author}</li>
    <li>${newBook.pages}</li>
    <li>${newBook.read}</li>
    `
    bookList.appendChild(bookEntry);
})

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = (read == true);
}

