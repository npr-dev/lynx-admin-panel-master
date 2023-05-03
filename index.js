const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("./build"));
app.all("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
});
app.listen(process.env.PORT || 3000, (_) => console.log("started at 3000"));