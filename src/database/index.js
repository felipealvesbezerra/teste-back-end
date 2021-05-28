const mongoose = require('mongoose');

class Database {

    constructor() {
        this.mongo();
    }

    mongo() {
        this.mongoConnect = mongoose.connect(process.env.URL_MONGO, {
            useNewUrlParser: true, 
            useFindAndModify: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    }

}

module.exports = new Database();