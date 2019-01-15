// 写一个localMsg函数 ,用于存储购物车信息
const express = require("express");
const pool = require("../pool.js");
var router = express.Router();


// 实时更新购物车信息
router.post("/carMsg",(req,res)=>{
    req.on("data",(buf)=>{
        var obj = buf.toString();
        obj = JSON.parse(obj);
        res.send(obj);
    })
})





























module.exports = router;