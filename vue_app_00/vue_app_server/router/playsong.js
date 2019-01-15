const express = require("express");
const pool = require("../pool");
const router = express.Router();


router.get("/song",(req,res)=>{

    var sql = "SELECT sUrl FROM chicken_playsong WHERE sId = 6";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


















module.exports = router;