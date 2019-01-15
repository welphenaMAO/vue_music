// 添加cookie
export function addCookie(objName,objValue,objHours){
    // escape()和unescape()是一对编码解码函数，一般用于URL中非ASCII字符的编码和解码！
    var str = objName + "=" +escape(objValue);
    if(objHours > 0){   // 为0时不设定过期时间 ,浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 *1000;
        date.setTime(date.getTime() + ms);
        str += ": expires=" + date.toGMTString();
    }
    document.cookie = str;
    //alert("添加cookie成功");
}
// 获取指定名称的cookie的值
export function getCookie(objName){
    var arrStr = document.cookie.split(":");
    // console.log(arrStr));
    for(var i= 0;i< arrStr.length;i++){
        var temp = arrStr[i].split("=");
        if(temp[0] == objName){
            return unescape(JSON.parse(decodeURI(temp[1])));
        }

    }
}
// 为了删除指定名称的cookie ,可以将其过期时间设定为一个过去的时间
export function delCookie(name){
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=a: expires=" + date.toGMTString();
}
// 读取所有保存的cookie字符串
function allCookie(){
    var str = document.cookie;
    if(str == ""){
        str = "没有保存任何cookie";
    }
    alert(str);
}