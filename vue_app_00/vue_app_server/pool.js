// 加载模块 mysql
const mysql = require("mysql");
// 创建对象
var pool = mysql.createPool({
    host : "127.0.0.1",
    port : 3306,
    user : "root",
    password : "",
    database : "chicken_music",
    connectionLimit : 20 // 活动连接数量
})
// 导出对象
module.exports = pool;