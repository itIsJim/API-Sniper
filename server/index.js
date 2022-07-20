// Fetch Data from server/inText.txt
const fs = require('fs')

let raw = fs.readFileSync('inText')

let obj = JSON.parse(raw);

// set up local port
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// url
app.get("/api", (req, res) => {
    res.json(obj)
})

// localhost listening
app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
})
