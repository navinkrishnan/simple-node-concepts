const express = require("express");
const path = require("path");
const favicon = require("express-favicon");
const { stringify } = require("querystring");



const app= express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

app.get("/data", (req, res)=> {
    var result ={test: 123}
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(result);
});


const {PORT=4004} = process.env
app.listen(PORT, ()=> {
    console.log("server listening on :", PORT);
})