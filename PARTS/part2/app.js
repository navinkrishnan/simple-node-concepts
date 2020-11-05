const express = require("express");

const app = express();

app.get("/", async (req, res)=> {
    const {user} = req.query;
    if(typeof user != "undefined"){
        await oneSecond();
        res.status(200).send(user.toUpperCase());
    }
    else{
        res.status(400).end();
    }
});

async function oneSecond(){
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    })
}


const {PORT} = process.env;

app.listen(PORT, ()=> {
    console.log("server listening on: ", PORT);
});