import mongoose from "mongoose";
import Book from "../models/Book";

class BookService {
    
    find() {
        return Book.find({});
    }

    findOne(id) {
        return Book.findOne({ _id: id});
    }

    create(title, subtitle, content, category, author, gender, pages, date, isbn, year) {
        return Book.save({ title: title, subtitle: subtitle, content: content, category: category, author: author, 
            gender: gender, pages: pages, isbn: isbn, year: year });
    }

    update(id, title, subtitle, content, category, author, gender, pages, date, isbn, year) {
        return Book.save({ _id: id, title: title, subtitle: subtitle, content: content, category: category, author: author, 
            gender: gender, pages: pages, isbn: isbn, year: year });
    }

    delete(id) {
        try{
            Book.findByIdAndDelete(id);
        } catch(error) {
            return error;
        }
    }
}

export default new BookService();