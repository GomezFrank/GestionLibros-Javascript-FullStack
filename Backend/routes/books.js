
const { Router } = require('express');
const router = Router();
const Book = require('../models/book');
const { unlink } = require('fs-extra');// El modulo fs sirve para trabajar con archivos
const path = require('path')

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.post('/', async (req, res) => {
    const { title, author,editorial, pages, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({title, author, editorial, pages, isbn, imagePath});
    await newBook.save();
    res.json({message: 'Libro guardado'})
});

router.delete('/:id', async (req, res)=> {
    const book = await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./Backend/public' + book.imagePath));
    res.json({message: "El libro fue eliminado"})
});


module.exports = router;