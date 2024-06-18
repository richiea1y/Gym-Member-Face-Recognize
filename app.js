import express from "express";
import path from "path";
import { fileURLToPath } from 'url';




const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const app = express();
const port = 8887;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('users', usersRouter);

app.get("/", (req, res)=>{
    res.send("Hello");
})



app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});

