const mongoose = require('mongoose');
(async () => {
    try {
        await mongoose.connect("mongodb+srv://teddy:101010@teddy.l5l15.mongodb.net/Teddy?retryWrites=true&w=majority");
        console.log("MongoDB Connected: ");
    } catch (error) {
      console.log('MongoDB ERROR: ' + error)
    }
})();
