import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 8887;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("<h1>Homepage</h1>");
})


app.post("/store-data", (req, res) => {
    const jsonData = req.body;
    // Here, you would typically store the jsonData in a database
    console.log(jsonData);
    res.send('Data received and stored');
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}...`);
});

// function validateJsonFormat(req, res, next) {
//     const expectedFormat = {
//         member_name: 'string',
//         member_gender: 'string',
//         member_phone: 'number',
//         member_age: 'number',
//         member_city: 'string',
//         encoding: 'array'
//     };

//     const keys = Object.keys(expectedFormat);
//     for (let key of keys) {
//         if (typeof req.body[key] !== expectedFormat[key]) {
//             return res.status(400).send(`Invalid data format for ${key}. Expected ${expectedFormat[key]}`);
//         }
//     }
//     next();
// }