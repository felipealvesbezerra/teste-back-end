import Book from "../models/Book";
import service from "../services/BookService";

import * as Yup from "yup";

class BooksController {

    async index ( req, res ) { 
        const allBooks = await service.find();

        return res.status(200).json({ data: allBooks });
    }

    //ainda falta ver
    async show ( req, res ) {
        const id = req.params.id;
        const book = await service.findOne(id);

        if(!book) 
        console.log(book)
        
        return res.status(200).json({ data: book });
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

        return res.status(201).json({ data: newBook });
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



        return res.status(200).json({ msg: "Book updated"});
    }

    destroy ( req, res ) {
        return res.json({ msg: "Book destroy"});
    }

}

export default new BooksController();