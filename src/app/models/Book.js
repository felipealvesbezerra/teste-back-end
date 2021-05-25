import mongoose from "mongoose";

const booksModel = new mongoose.Schema({
    title: String,
    subtitle: String,
	content: String,
	category: String,
	author: String,
	gender: String,
	pages: Number,
	//date: { type: Date }, 
	isbn: String,
	year: Number
})

export default mongoose.model("Book", booksModel);