import mongoose from "mongoose";

mongoose.connect("mongodb+srv://bruno:373571@teste-teddy-open-bankin.3vr98.mongodb.net/teste-backend?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

export default mongoose;