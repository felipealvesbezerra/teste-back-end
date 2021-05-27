const { app } = require("./app");


app.listen(process.env.APP_PORT || 7777, () => {
    console.log("Back-end ON ");
});
