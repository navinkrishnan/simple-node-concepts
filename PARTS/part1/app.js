const express = require("express");

const app = express();

const blacklist = ['127.0.0.1', ':ffff::127.0.0.1'];

app.get("/foo", ipBlocker, (req, res)=>{
    res.status(200).send("foo");
});

app.get("/bar", (req, res)=>{
    res.status(200).send("bar");
});

app.all("*", (_, res)=>{
    res.status(404).end();
});

function ipBlocker(req, res, next){
    const ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress;
    console.log("Request from: ", ip, blacklist.indexOf(ip));
    if(blacklist.indexOf(ip) != -1){
        next();
    }
    else{
        res.status(403).end();
    }
}




const {PORT=4004} = process.env;

app.listen(PORT, ()=> {
    console.log("server listening on: ", PORT);
});