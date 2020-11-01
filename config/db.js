const mongoose = require('mongoose');
let url = "mongodb+srv://richardpeccin:richardpeccin@teste.6q2cm.mongodb.net/teste?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar com db'));