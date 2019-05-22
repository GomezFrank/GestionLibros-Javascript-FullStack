import './styles/app.css';
import UI from './ui';

document.addEventListener('DOMContentLoaded', ()=> {
    const ui = new UI();
    ui.renderBooks();
});

document.getElementById('book-form').addEventListener('submit', (e)=> {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const editorial = document.getElementById('editorial').value;
    const pages = document.getElementById('pages').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    if(title == ''|| author == '' || editorial == '' || pages == '' || isbn == ''){
        alert('Todos los datos del libro excepto la imagen son requeridos.')
    }else {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('editorial', editorial);
        formData.append('pages', pages);
        formData.append('isbn', isbn);
        formData.append('image', image[0]);

        const ui = new UI();
        ui.addNewBook(formData);

        ui.renderMessage('Nuevo libro agregado', 'warning', 2000);
    }
    

    e.preventDefault();
});

document.getElementById('books-cards').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')){
        const ui = new UI();
        ui.deleteBook(e.target.getAttribute('_id'));

        ui.renderMessage('Libro eliminado', 'danger', 2000);
    }
    e.preventDefault();
})