const express = require("express");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const streamifier = require("streamifier");
const fs = require("fs");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileupload());

// To server static context for UI from public folder
app.use("/ui", express.static('public'));

// Upload file with streamify
// curl http://localhost:3000/upload -F file=@sample.txt -X POST
app.post("/upload", (req, res)=>{
    let files = req.files;
    console.log("files", req.files);
    console.log("Received", files.file.name, files.file.mimetype);
    let readStream = streamifier.createReadStream(files.file.data);
    let timestamp = new Date().getTime();
    let writeStream =fs.createWriteStream(`./uploads/${timestamp}-${files.file.name}`);
    readStream.pipe(writeStream)
    readStream.on("end", ()=> {
        res.send("Done upload");
    });
});

// curl -X GET http://localhost:3000/download?filename=sample.txt --output file.txt
app.get("/download", (req, res)=> {
    let filename = req.query.filename;
    console.log(filename);
    fs.access(`./uploads/${filename}`, fs.constants.F_OK, (err)=> {
        if(!err){
            const readStream = fs.createReadStream(`./uploads/${filename}`);
            // If to download as file, include below header
            // res.setHeader('Content-disposition', 'attachment;filename=myfile.text');
            readStream.pipe(res);
        }
        else{
            res.status(404).send("File not found");
        }
    })
    
});

// const file = fs.createWriteStream("./big.file");

// for(let i=0; i<=1e6;i++){
//     file.write("abc 123");
// }

// file.end();

// app.get("/", (req, res)=>{
//     let src = fs.createReadStream('./big.file');
//     src.on("data", (chunk) => {

//     });
//     src.pipe(res);
// });

// const zlib = require("zlib");
// app.get("/", (req, res)=>{
//     let src = fs.createReadStream('./big.file');

//     src.pipe(zlib.createGzip()).pipe(res)

// });

// const {spawn} = require("child_process")
// const child = spawn("pwd");
// child.on("exit", (code, signal) => {
//     console.log(`code ${code} and signal ${signal}`);
// })
// child.on("message", (msg, handler)=>{
//      console.log(`msg ${msg} and handler ${handler}`);
// })
// process.stdin.pipe(child.stdin)
// child.stdout.on("data", (chunk)=>{
//     console.log(`data: ${chunk}`);
// })
// try{
// console.log(asdad);
// }
// catch(err){
//     console.log(err);
// }

// process.on("unhandled")

// const events = require("events");
// const emitter = new events.EventEmitter();
// .once() to listen only once
// emitter.on("/ping/data", (data) => {
//     console.log(data);
// })

// emitter.emit("/ping/data", {msg: "hello"});

// const sqlite3 = require("sqlite3").verbose();
// let db = new sqlite3.Database(":memory:", err=> {
//     if(err) console.error(err)

//     console.log("connected to DB");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server listening on: ", process.env.HOST, PORT);
});