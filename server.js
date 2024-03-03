const express = require("express");
const app = express();

app.use(express.static('.'))

app.post("/save/never-do", (req, res) => {
    console.log(req)
    res.send("Hello! This is the about page")
});
 
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
