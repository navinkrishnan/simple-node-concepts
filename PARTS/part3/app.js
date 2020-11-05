const express = require("express");

const axios = require("axios");

const app= express();

app.get("/:id", async (req, res)=>{
    const {id} = req.params;

    if(typeof id == "undefined"){
        return res.status(400).end();
    }
    const {BOOK_APP_PORT, AUTHOR_APP_PORT} = process.env;
    if(typeof BOOK_APP_PORT == "undefined" || typeof AUTHOR_APP_PORT == "undefined"){
        res.status(400).end();
        return;
    }
    let booksUrl = `http://localhost:${BOOK_APP_PORT}/${id}`;
    let authorUrl = `http://localhost:${AUTHOR_APP_PORT}/${id}`;

    let bookRes = await axios(booksUrl).catch(err => err.response);
    let authorRes = await axios(authorUrl).catch(err => err.response);

    if(typeof bookRes == "undefined" || typeof authorRes == "undefined"){
        res.status(400).end();
        return;
    }

    if(bookRes.status != "200" || authorRes.status != "200"){
        return res.status(404).end();
    }
    const result = {...bookRes.data, ...authorRes.data}
    return res.status(200).send(result).end();

});

const {PORT=4004} = process.env
app.listen(PORT, ()=> {
    console.log("server listening on :", PORT);
})