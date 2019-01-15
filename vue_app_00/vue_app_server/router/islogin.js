const express = require("express");
var pool = require("../pool");
const router = express.Router();
// 引入MD5
//const md5 = require("md5-node");
//var that;
router.post("/signin",(req,res)=>{
    req.on("data",(buf)=>{
        var obj = buf.toString();
        obj = JSON.parse(obj);
        var $uname = obj.Mname;
        var $upwd = obj.Mpwd;
        //console.log($uname,$upwd)
        if($uname==""){
            res.send({code:400,msg:"用户名称不能为空!"});
            return;
        }
        if($upwd==""){
            res.send({code:405,msg:"用户密码不能为空!"});
            return;
        }
        var sql = "SELECT Mid,Mname,Avatar as imgUrl FROM chicken_user WHERE Mname=? AND Mpwd=md5(?)";
        pool.query(sql,[$uname,$upwd],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                req.session.Mid = result[0].Mid;
                //console.log(req.session.Mid);
                res.send({code: 1, msg: "登录成功~"});
            }else {
                //req.session.Mid = null;
                res.send({code: 0, msg: "登录失败!"});
            }
        })
    })
})
router.get("/islogin",(req,res)=>{
    var mid = req.session.Mid;
    //console.log(mid,"mid");
    if(mid){
        var sql = "SELECT Mid,Mname,Avatar as img_url FROM  chicken_user WHERE Mid=?";
        pool.query(sql,[mid],(err,result)=>{
            if(err) throw err;
                res.send({msg : 1,data : result[0]});
        })
    }else{
        res.send({msg : 0});
    }
})
router.get("/singout",(req,res)=>{
    req.session.Mid = undefined;
    res.end();
})
// 注册 新用户
const md5 = require("md5-node");
router.post("/register",(req,res)=>{
    req.on("data",(buf)=> {
    var obj = buf.toString();
    obj = JSON.parse(obj);
    //console.log(obj);
    var uname = obj.Mname;
    var upwd = obj.Mpwd;
    if (uname == "") {
        res.send({code: 400, msg: "用户名不能为空!"});
        return;
    }
    if (upwd == "") {
        res.send({code: 405, msg: "用户密码不能为空!"});
        return;
    }
    var checkuname = "SELECT Mname FROM chicken_user";
    pool.query(checkuname,(err,result)=>{
        if(err) throw err;
        //console.log(result);
        // 循环遍历对比
        var num = 0;
        for(var i=0;i<result.length;i++){
            //console.log(result[i].Mname);
            if(uname==result[i].Mname){
                res.send({code:404});
                return;
            }else{
                num++;
                if(num==1) {
                    var sql = "INSERT INTO chicken_user(Mname,Mpwd,Avatar) VALUES(?,?,'http://127.0.0.1:3000/img/login/code_0/code_0.jpg')";
                    pool.query(sql, [uname, md5(upwd), null], (err, result)=>{
                        if(err) throw err;
                        result.affectedRows > 0 ? res.send({ok: 1}) : res.send({ok: 0});
                        //console.log(result);
                    })
                }
                return;
            }
        }
    })
    })
})

// 检索数据库
module.exports = router;