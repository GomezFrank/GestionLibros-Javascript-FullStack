
import BookService from './services/BooksService';
const bookService = new BookService();

import { format } from 'timeago.js';

class UI {

    async renderBooks() {
        const books = await bookService.getBooks();
        const booksCardsContainers = document.getElementById('books-cards');
        booksCardsContainers.innerHTML = '';

        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class= "card m-2">
                    <div class= "row">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" alt="" class="img-fluid"/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title mt-3" style="text-aling:center"> ${book.title} </h4>
                                <p class="card-text"><strong>Autor</strong>  : ${book.author}</p>
                                <p class="card-text"><strong>Editorial</strong> : ${book.editorial}</p>
                                <p class="card-text"><strong>Páginas</strong> : ${book.pages}</p>
                                <p class="card-text"><strong>Isbn</strong> : ${book.isbn}</p>
                                <a href="#" class="btn btn-danger delete" _id=${book._id}><i class="fas fa-trash-alt"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)} 
                    </div>
                </div>
            `;
            booksCardsContainers.appendChild(div);
        });
    }

    async addNewBook(book) {
       await bookService.postBook(book);
       this.clearBookForm();
       this.renderBooks();
    }

    clearBookForm() {
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message` ;
        div.appendChild(document.createTextNode(message));
        
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');

        container.insertBefore(div, bookForm);

        setTimeout(() =>{
            document.querySelector('.message').remove();
        }, secondsToRemove);


    }

    async deleteBook(bookId) {
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }

}

export default UI;