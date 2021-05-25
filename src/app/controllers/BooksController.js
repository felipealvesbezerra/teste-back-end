import Book from "../models/Book";
import service from "../services/BookService";


import * as Yup from "yup";

var book = null;

class BooksController {

    async index ( req, res ) { 
        const allBooks = await service.find();

        res.status(200).json({ data: allBooks });
    }

    async show ( req, res ) {  
        return res.status(200).json({ data: res.book });
    }
    
    async create ( req, res ) {
        const { title, subtitle, content, category, author, gender, pages, date, isbn, year } = req.body;

        const schema = Yup.object().shape({
            title: Yup.string().required("Title is required"),
            subtitle: Yup.string().required("Subtitle is required"),
            content: Yup.string().required("Content is required"),
            category: Yup.string().required("Category is required"),
            author: Yup.string().required("Author is required"),
            gender: Yup.string().required("Gender is required"),
            pages: Yup.number().required("Quantity of pages is required"), 
            //date: Yup.number().required("DATE of pages is required"),
            isbn: Yup.string().required("ISBN is required"),
            year: Yup.number().required("Year is required"),
            
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const newBook = await Book.create(req.body);

        res.status(201).json({ data: newBook });
    }

    async update ( req, res ) {
        const { title, subtitle, content, category, author, gender, pages, date, isbn, year } = req.body;

        const schema = Yup.object().shape({
            title: Yup.string().required("Title is required"),
            subtitle: Yup.string().required("Subtitle is required"),
            content: Yup.string().required("Content is required"),
            category: Yup.string().required("Category is required"),
            author: Yup.string().required("Author is required"),
            gender: Yup.string().required("Gender is required"),
            pages: Yup.number().required("Quantity of pages is required"), 
            //date: Yup.number().required("DATE of pages is required"),
            isbn: Yup.string().required("ISBN is required"),
            year: Yup.number().required("Year is required"),
            
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
          }

        const id = req.params.id;
        const updateBook = { title, subtitle, content, category, author, gender, pages, date, isbn, year }

        try{
            await Book.findByIdAndUpdate(id, updateBook);
            return res.status(200).json({ msg: "Book updated", data: res.book})
        }catch(err){
            return res.status(400).json({ msg: err.message })
        }
    }

    async destroy ( req, res ) {
        //console.log(req.params.id)
        await Book.findByIdAndDelete(req.params.id);
        return res.json({ msg: "Book destroy"});
    }

    async verifyId(req, res, next){
        try {
            //book = null;
            book = await Book.findById(req.params.id);
            if(book == null) {
                return res.status(404).json({ message: "Book not found!"});
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

        res.book = book;
        next()
    }
}

export default new BooksController();