const express = require("express");
const app = express();

app.get("/:id", (req, res)=>{
    const {id} = req.params;
    if(id == 1) res.send({status: "up"});
    else if(id == 2) res.sendStatus(404);
    else res.sendStatus(500);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log("Server listening on: ", PORT);
});