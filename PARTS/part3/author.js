const express = require("express");

const app= express();

app.get("/:id", (req, res)=>{
    const {id} = req.params;
    if(typeof id == "undefined"){
        res.status(400).end();
    }
    if(id == "1"){
        res.status(200).send({id: 1, author: "abc"}).end();
    }
    else if(id == "3"){
        res.status(200).send({id:3, author: "JKS"}).end();
    }
    else{
        res.status(404).end();
    }
});

const {PORT=8088} = process.env
app.listen(PORT, ()=> {
    console.log("server listening on :", PORT);
})