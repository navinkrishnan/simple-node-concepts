const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const streamifier = require("streamifier");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const fetch = require("node-fetch");
const router = require('./route');
const axios = require("axios");
const ipfilter = require("ipfilter");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/ui", express.static("ui"));
app.use(fileUpload());

const blcklist = ['127.0.0.1'];

app.use("/", ipfilter(blcklist));

app.get("/", (req, res) => {
    console.log(req.connection.remoteAddress, req.ip, req.socket.remoteAddress);
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

app.get("/remote", async (req, res)=> {
    // var result = await fetch("http://localhost:3000/1").then(data => {
    //     return {
    //         status: data.status,
    //         cdata: await data.text()
    //     }
    // })
    // .catch(err=> {
    //     console.log(err);
    //     return {
    //         status: err.status,
    //         data: err.response
    //     }
    // });

    var result1 = await axios("http://localhost:3000/1").catch(err=>{console.log("catch axios error", err); return err.response});
    var result2 = await axios("http://localhost:3000/2").catch(err=>{console.log("catch axios error", err); return err.response});
    var result3 = await axios("http://localhost:3000/3").catch(err=>{console.log("catch axios error", err); return err.response});
    var result4 = await axios("http://localhost:3050/3").catch(err=>{console.log("catch axios error", err); return err.response});
    
    // result1 & 4
    if(typeof result1 == "undefined" || typeof result4 == "undefined"){
        res.sendStatus(500).end();
    }
    else if(result1.status != "200" || result3.status != "200"){
        res.sendStatus(404).end()
    }
    else
    res.send({status: result.status, data: result.data});
});

app.get("/delay", async (req, res)=> {
    let canRespond = await oneSecond();
    res.send("ok");
});

app.all("*", (_, res)=>{
    res.sendStatus(404);
})

async function oneSecond(){
    return new Promise((resolve)=> {
        setTimeout(resolve, 5000);
    })
}

const PORT = process.env.PORT || 4004;

app.listen(PORT, ()=> {
    console.log("Server listening on: ", PORT);
});