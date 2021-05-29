const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://teddy:teddybackend@teddy-backend.bx9nn.mongodb.net/test?authSource=admin&replicaSet=atlas-ardaxo-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'teddy'
})
mongoose.set("useCreateIndex", true)

module.exports = mongoose