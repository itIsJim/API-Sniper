const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://jim:iyKSu9sSVGuz4uuc@cluster0.xk6wlqd.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const fs = require('fs')

let raw = fs.readFileSync('inText')

let obj = JSON.parse(raw);

async function connect() {
    try {
        await client.connect();

       const  coll = client.db("SiciliaMia").collection("API_WRITETO");


        const result = await coll.insertMany(obj.entries)


    } finally {

        await client.close();
    }
}
connect().catch(console.dir);