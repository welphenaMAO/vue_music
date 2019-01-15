// app.js 加载模块
const express = require("express");
const pool = require("./pool");
const bodyParse = require("body-parser");
// 引入session模块,cookie模块
const cookieParser = require("cookie-parser");
const session = require("express-session");
// 导入
const init = require("./router/singerList");
const login = require("./router/islogin");
const product = require("./router/product");
// 导入local函数
const local = require("./router/localMsg");
// 导入歌曲列表
const song = require("./router/playsong");

// 2.创建express对象
var app = express();


app.use(cookieParser());  // 使用cookie
// 设置session
app.use(session({
    secret : "secret", // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized : false,  // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000*60*3  //设置session 的有效时间 ,单位为毫秒
    }
}))

// 2.1 引入跨域模块
const cors = require("cors");
// 2.2配置那个程序允许跨域访问
app.use(cors({
    origin : ["http://localhost:3001","http://127.0.0.1:3001","https://y.qq.com:8080"],
    credentials : true
}))
app.use(bodyParse.urlencoded({
    extended : false  // querystring
}))



// 4.监听端口
app.listen(3000,()=>{
    console.log("The port is listening...");
})
// 把轮播图放到服务器
app.get("/imglist",(req,res)=>{
    var obj = [
        {id : 1,img_url : "http://127.0.0.1:3000/img/banner/300.jpg"},
        {id : 2,img_url : "http://127.0.0.1:3000/img/banner/301.jpg"},
        {id : 3,img_url : "http://127.0.0.1:3000/img/banner/302.jpg"},
        {id : 4,img_url : "http://127.0.0.1:3000/img/banner/303.jpg"}
    ];
    res.send(obj);
})
// 导入歌单
app.get("/songlist",(req,res)=>{
    // 参数   当前页码    页大小(一页显示几行数据)
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    //console.log(res.query);
    //console.log(pno);
    var sql = "SELECT COUNT(id) AS Cid FROM chicken_songlist";
    var obj = {};   // 保存发送客户端数据
    var progress = 0; // 为了防止两个res.send中的一个执行结束
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        //console.log(result[0].Cid); // 18 拿到歌单列表的数量
        var cid = Math.ceil(result[0].Cid/pageSize);  // 拿歌单总数除于参数中的pageSize
        obj.pageSize = cid;
        progress += 50;
        if(progress==100)
            res.send(obj);
        //console.log(obj)
    })
    // 2.2 查找当前页的内容
    var sql = " SELECT id,title,compose,img_url";
        sql += " FROM chicken_songlist";
        sql += " LIMIT ?,?";
    // 设置分页变量 pageSize 为每一页显示多少条数据
    var offset = parseInt((pno-1)*pageSize);
    // 设置分页偏移量
    pageSize = parseInt(pageSize);
    pool.query(sql,[offset,pageSize],(err,result)=>{
        if(err) throw err;
        //console.log(result); // 拿到分页后的结果
        obj.data = result;
        progress += 50;
        if(progress==100)
            res.send(obj);
    })
})
// 根据Id查询歌单中每一项的详细信息
app.post("/initlist",(req,res)=>{
    req.on("data",(buf)=>{
        // 架构sql语句SELECT * FROM `chicken_songlist` WHERE id = 1
        var obj = buf.toString();
        obj = JSON.parse(obj);
        //console.log(obj); // 拿到{id : 2}
        var id = obj.id;
        //console.log(id);
        var sql = "SELECT * FROM chicken_songlist WHERE id=?";
        pool.query(sql,[id],(err,result)=>{
            if(err) throw err;
            var obj = result;
            res.send(obj);
        })
    })
})

app.post("/singerList",function(req,res){
    var sql = "SELECT id,sin_imgUrl,singerName FROM chicken_singerlist";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        //console.log(result);
        res.send(result);
    })
});

// 3.指定静态目录 ，服务器指定目录最好是绝对路径
app.use(express.static(__dirname + "/public"));

// 挂载
app.use("/singer",init);
app.use("/user",login);
app.use("/user",product);
app.use("/cart",local);
app.use("/play",song);