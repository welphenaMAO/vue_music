// 使用localstorage 存储商品的Id ,数量.其他由请求获取
var temp = 0;
var str = "";
export function addStorage(id,num){
    if(!window.localStorage){
        alert("浏览器不支持localstorage");
        return false;
    }else{
        var arr = [];
        var storage=window.localStorage;
        temp += num;
        str = "pId"+id+"/num"+temp;
        arr.push(str);
        // 写入商品的Id,num
        storage.setItem("arrObj",arr);
    }
}
// 获取localstorage的信息