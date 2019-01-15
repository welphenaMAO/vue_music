const express = require("express");
var pool = require("../pool");
var router = express.Router();


router.get("/init",(req,res)=>{
    var $id = req.query.id;
    var  sql = "SELECT sin_imgUrl,id,singerName FROM chicken_singerlist where id = ?";
    pool.query(sql,$id,(err,result)=>{
        //console.log(result);
        res.send(result);
    })
})
router.get("/Individual",(req,res)=>{
    var sid = req.query.id;
    // console.log(sid);
    var sql = "SELECT  chicken_singerlist.singerName,chicken_playsong.sId,chicken_playsong.sName,chicken_playsong.sUrl FROM chicken_singerlist LEFT OUTER JOIN chicken_playsong ON chicken_singerlist.id=chicken_playsong.sKind WHERE chicken_singerlist.id=?";
    pool.query(sql,[sid],(err,result)=>{
        if(err) throw err;
        //console.log(result);
        res.send(result);
    })
})

router.post("/checkSong",(req,res)=>{
    req.on("data",(buf)=>{
        var obj = buf.toString();
        obj = JSON.parse(obj);
        // console.log(obj)

        // 构建sql 语句，检索出该歌手的所有歌曲
        var sql = "SELECT  chicken_singerlist.singerName,chicken_singerlist.id,chicken_playsong.sId,chicken_playsong.sName,chicken_playsong.sUrl FROM chicken_singerlist LEFT OUTER JOIN chicken_playsong ON chicken_singerlist.id=chicken_playsong.sKind WHERE chicken_singerlist.singerName=?";
        pool.query(sql,[obj.value],(err,result)=>{
            //console.log(result.length);
            result.length>0 ? res.send({code:200,data:result}) : res.send({code:404,data:"很抱歉，没有找到该歌手！"});
        })
    })
})












module.exports = router;