const express = require("express");
const httpProxy = require("http-proxy");
const app = express();

const proxy = httpProxy.createProxyServer();

app.get("/", (req, res)=> {
    const {url} = req.query;
    console.log("Getting data from", url);
    proxy.web(req, res, {target: url}, function(err){
        console.log("error", err);
        res.send(err).end();
        });
});

proxy.on('proxyRes', function(proxyRes, req, res) {
    console.log("Response came", proxyRes);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
});


const {PORT} = process.env;

app.listen(PORT, ()=> {
    console.log("server listening on: ", PORT);
});