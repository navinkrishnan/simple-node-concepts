const router = require("express").Router();
const fetch = require("node-fetch");

router.get("/users/:id", async (req,res)=> {
    console.log("user", req.params.id);
    let d = await fetch(`https://reqres.in/api/users/2`, {
        method: 'GET'
    }).then(data => data.json()).catch(err=>err);
    res.send(d);
});

router.post("/users", async(req, res)=>{
    let d= await fetch("https://reqres.in/api/users?page=2", {
        method: "POST",
        body: JSON.stringify(req.body)
    }).then(data=>data.json());
    res.send(d);
});


function mimicAPI(){
    return new Promise((resolve, reject)=> {setTimeout(()=>{
        resolve("hello") ;
    }, 3000);
});
}

async function getAPI(){
    let result = await mimicAPI();
    console.log(result);
    return result;
}
getAPI();
module.exports = router;