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
    const newBook = new Book(title.value, author.value, pages.value, +isRead.value);
    booksArr.push(newBook);
    const bookIndex = booksArr.indexOf(newBook);
    setBookRow(newBook, bookIndex);
})

function setBookRow(book, index) {
    const bookEntry = document.createElement('ul');
    bookEntry.setAttribute('data-index', index);
    bookEntry.classList.add('book', 'open');

    const bookTitle = document.createElement('li');
    bookTitle.classList.add('title');
    bookTitle.textContent = `${book.title}`;

    const bookAuthor = document.createElement('li');
    bookAuthor.classList.add('author');
    bookAuthor.textContent = `${book.author}`;

    const bookPages = document.createElement('li');
    bookPages.textContent = `${book.pages}`;

    let bookStatus = document.createElement('li');
    bookStatus.classList.add('readStatus');
    bookStatus.textContent = isRead(book.readStatus);

    const changeBtn = document.createElement('button');
    changeBtn.textContent = 'Change';
    changeBtn.setAttribute("type", "button");
    changeBtn.setAttribute("data-index", `${index}`);
    changeBtn.addEventListener('click', () => {
        if (booksArr[index].readStatus == true) {
            booksArr[index].readStatus = false;
            bookStatus.textContent = isRead(booksArr[index].readStatus)
            bookStatus.appendChild(changeBtn);
            return;
        }
        if (booksArr[index].readStatus == false || booksArr[index].readStatus == -1) {
            booksArr[index].readStatus = true;
            bookStatus.textContent = isRead(booksArr[index].readStatus)
            bookStatus.appendChild(changeBtn);
            return;
        }
    })

    bookStatus.appendChild(changeBtn);

    bookEntry.append(bookTitle, bookAuthor, bookPages, bookStatus);
    bookList.append(bookEntry);
}

function isRead(value) {
    if (value == true) return "Yes";
    if (value == -1 || value == false) return "No";
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = read;
}

function initializelist() {
    {
        bookList.innerHTML = `<ul class="book open">
        <li class="header">Title</li>
        <li class="header">Author</li>
        <li class="header">Pages</li>
        <li class="header">Read?</li>
        </ul>`;

        bookList.classList.add('open');
    }
    emptyList = false;
}