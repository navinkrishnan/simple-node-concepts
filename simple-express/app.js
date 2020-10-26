const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const streamifier = require("streamifier");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const fetch = require("node-fetch");
const router = require('./route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/ui", express.static("ui"));
app.use(fileUpload());

app.get("/", (_, res) => {
    res.send("ok");
});

app.post("/", (req, res) => {
    console.log("query params", req.query);
    console.log("json data: ", req.body);
    res.end('ok');

});

app.put("/upload", (req, res) => {
    const file = req.files && req.files;
    console.log(req.files);
    let readStream = streamifier.createReadStream(file.data);
    let writeStream = fs.createWriteStream(`./inside/${file.name}`);
    readStream.pipe(writeStream);
    res.end("done");
});

app.get("/downlaod", (req, res) => {
    if(!req.query.file) res.end(404);
    let readStream = fs.createReadStream(`./inside/${req.query.file}`);
    readStream.pipe(res);
});

app.use("/api", verifyToken, router);

app.get("/token", async (req, res)=> {
    let token = await jwt.sign({'user': 'navin'}, 'secretkey', {expiresIn: '2m'});
    res.send(token);
})

function verifyToken(req, res, next){
    console.log(typeof req.headers['authorization']);
    if(typeof req.headers['authorization'] != 'undefined'){
        req.token = req.headers['authorization'].split(' ')[1];
        next();
    }
    else{
        res.sendStatus(401);
    }
    
}

const PORT = process.env.PORT || 4004;

app.listen(PORT, ()=> {
    console.log("Server listening on: ", PORT);
});