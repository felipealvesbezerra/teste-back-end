const mongoose = require("mongoose");
// cloud
const url =
  "mongodb+srv://t:t@contactsapi.khra2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// local
const url2 = "mongodb://localhost/contacts";

module.exports = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
