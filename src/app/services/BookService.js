import mongoose from "mongoose";
import Book from "../models/Book";

class BookService {
    
    find() {
        return Book.find({});
    }

    findOne(id) {
        return Book.findById({ _id: id }).exec();
    }

    create(title, subtitle, content, category, author, gender, pages, date, isbn, year) {
        return Book.save({ title: title, subtitle: subtitle, content: content, category: category, author: author, 
            gender: gender, pages: pages, isbn: isbn, year: year });
    }

    update(title, subtitle, content, category, author, gender, pages, date, isbn, year) {
        return Book.save({ title: title, subtitle: subtitle, content: content, category: category, author: author, 
            gender: gender, pages: pages, isbn: isbn, year: year });
    }
}

export default new BookService();