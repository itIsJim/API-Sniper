
const fs = require('fs')

let raw = fs.readFileSync('server/inText')

let obj = JSON.parse(raw);

const express = require("express")


const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json(obj)
})
console.log(obj);

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
})
