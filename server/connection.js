const fs = require('fs')

let raw = fs.readFileSync('inText')

let obj = JSON.parse(raw);

const { MongoClient } = require("mongodb");

const uri =
    "";
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();

       const  coll = client.db("SiciliaMia").collection("API_WRITETO");

        const result = await coll.insertMany(obj.entries)

        // insertion tracking in the console
        console.log(result.insertedIds)

    } finally {

        await client.close();
    }
}

connect().catch(console.dir);
