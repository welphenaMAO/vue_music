const express = require("express");
const pool = require("../pool");
const router = express.Router();


router.get("/product",(req,res)=>{
    var sql = "SELECT * FROM chicken_product ORDER BY pKind ASC";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        var obj = [],objAudio = [],objIp = [],objMusical = [],objAcc = [];
        var backObj = {};
        for(var key of result){
            if(key.pKind==10){
                obj.push(key);
            }else if(key.pKind==20){
                objAudio.push(key);
            }else if(key.pKind==30){
                objIp.push(key);
            }else if(key.pKind==40){
                objMusical.push(key);
            }else if(key.pKind==50){
                objAcc.push(key);
            }
        }
        backObj.floor10 = obj;
        backObj.floor20 = objAudio;
        backObj.floor30 = objIp;
        backObj.floor40 = objMusical;
        backObj.floor50 = objAcc;
        res.send(backObj);
    });
});

router.get("/productMsg",(req,res)=>{
    // console.log(req.query.pId);
    var id = req.query.pId;
    var sql = "SELECT * FROM `chicken_product` WHERE pId = ?";
     pool.query(sql,[id],(err,result)=>{
         if(err) throw err;
         // console.log(result);
        res.send(result);
     })
})

// 商品检索
router.post("/checked",(req,res)=>{
    // console.log(req.query);
    // 模拟数据

    req.on("data",(buf)=> {

    var simu = [
        {pId: 13, pName: "耳机"},
        {pId: 11, pName: "黑胶日历"},
        {pId: 42, pName: "欧美音乐人"},
        {pId: 29, pName: "尤克里里"},
        {pId: 16, pName: "蓝牙耳机"},
        {pId: 13, pName: "氧气耳机"},
        {pId: 17, pName: "蓝牙一体耳机"},
        {pId: 2, pName: "记事本"},
        {pId: 1, pName: "手账"},
        {pId: 10, pName: "卡通钢笔"},
        {pId: 47, pName: "针织帽"},
        {pId: 12, pName: "运动耳机"}
    ];

    var obj = buf.toString();
    obj = JSON.parse(obj);
    var val = obj.value;

        if (val == "耳机"){
            res.send({code: 200, msg: {pId: 10, pName: "耳机"}});
        }else if(val == "黑胶日历") {
            res.send({code: 200, msg: {pId: 11, pName: "黑胶日历"}});
        }else if(val == "欧美音乐人") {
            res.send({code: 200, msg: {pId: 42, pName: "欧美音乐人"}});
        }else if(val == "尤克里里") {
            res.send({code: 200, msg: {pId: 29, pName: "尤克里里"}});
        }else if(val == "蓝牙耳机") {
            res.send({code: 200, msg: {pId: 16, pName: "蓝牙耳机"}});
        }else if(val == "氧气耳机") {
            res.send({code: 200, msg: {pId: 13, pName: "氧气耳机"}});
        }else if(val == "蓝牙一体耳机") {
            res.send({code: 200, msg: {pId: 17, pName: "蓝牙一体耳机"}});
        }else if(val == "记事本") {
            res.send({code: 200, msg: {pId: 2, pName: "记事本"}});
        }else if(val == "手账") {
            res.send({code: 200, msg: {pId: 1, pName: "手账"}});
        }else if(val == "鱼笔") {
            res.send({code: 200, msg: {pId: 9, pName: "鱼笔"}});
        }else if(val == "针织帽") {
            res.send({code: 200, msg: {pId: 47, pName: "针织帽"}});
        }else if(val == "运动耳机"){
            res.send({code: 200, msg: {pId: 12, pName: "运动耳机"}});
        }else{
            res.send({code: 400,msg:"很抱歉,没有找到该商品!"});
        }
    })
})











module.exports = router;