import Book from "../models/Book";

import * as Yup from "yup";

var book = null;

class BooksController {

    async index ( req, res ) { 
        const allBooks = await Book.find({});

        res.status(200).json({ data: allBooks });
    }

    async show ( req, res ) {  
        if(res.book == null) {
            return res.status(404).json({ message: "Book not found!" });
        }
        return res.status(200).json({ data: res.book });
    }
    
    async create ( req, res ) {
        const { title, subtitle, content, category, author, gender, pages, date, isbn, year, link } = req.body;

        const schema = Yup.object().shape({
            title: Yup.string().required("Title is required"),
            subtitle: Yup.string().required("Subtitle is required"),
            content: Yup.string().required("Content is required"),
            category: Yup.string().required("Category is required"),
            author: Yup.string().required("Author is required"),
            gender: Yup.string().required("Gender is required"),
            pages: Yup.number().required("Quantity of pages is required"), 
            link: Yup.string().required("Link is required"),
            isbn: Yup.string().required("ISBN is required"),
            year: Yup.number().required("Year is required"),
            
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const saveBook = { title, subtitle, content, category, author, gender, pages, date, isbn, year, link };

        const newBook = await Book.create(saveBook);

        res.status(201).json({ data: newBook });
    }

    async update ( req, res ) {
        const { title, subtitle, content, category, author, gender, pages, date, isbn, year, link } = req.body;

        const schema = Yup.object().shape({
            title: Yup.string().required("Title is required"),
            subtitle: Yup.string().required("Subtitle is required"),
            content: Yup.string().required("Content is required"),
            category: Yup.string().required("Category is required"),
            author: Yup.string().required("Author is required"),
            gender: Yup.string().required("Gender is required"),
            pages: Yup.number().required("Quantity of pages is required"), 
            link: Yup.string().required("Link is required"),
            isbn: Yup.string().required("ISBN is required"),
            year: Yup.number().required("Year is required"),
            
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
          }

        const id = req.params.id;
        const updateBook = { title, subtitle, content, category, author, gender, pages, date, isbn, year, link }

        try{
            await Book.findByIdAndUpdate(id, updateBook);
            return res.status(200).json({ msg: "Book updated", data: res.book})
        }catch(err){
            return res.status(404).json({ message: "Book not found!"});
        }
    }

    async destroy ( req, res ) {
        if(! (await Book.findByIdAndDelete(req.params.id))){
            return res.status(404).json({ message: "Book not found!"});
        }
        return res.json({ msg: "Book destroy"});
    }

    async verifyId(req, res, next){
        try {
            book = await Book.findById(req.params.id);
        } catch (error) {
            return res.status(404).json({ message: "Book not found!"});
        }

        res.book = book;
        next()
    }
}

export default new BooksController();