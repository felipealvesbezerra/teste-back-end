const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost', { useNewUrlParser: true });

const exampleSchema = new mongoose.Schema({
  company: String,
  locality: String,
  month: String,
  year: Number,
  value: Number,
  employees: Number,
  AgeAverage: Number,
  CEO: String,
  salaryAverage: Number,
  street: String
});

const exampleModel = mongoose.model('Example', exampleSchema);
module.exports = { Model: exampleModel };
