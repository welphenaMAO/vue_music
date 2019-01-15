const express = require("express");
var pool = require("../pool");
const jq = require("../jquery-1.11.3");
const router = express.Router();

router.get("/thatlist",(req,res)=>{
    var url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1542123169999";
    $.ajax({
        url : url,
        type : "get",
        dataType : "jsonp",
        success : function(data){
            console.log(data);
            res.send(data);
        },
        error : function(err){
            console.log("有错误！");
        }
    })
})
module.exports = router;