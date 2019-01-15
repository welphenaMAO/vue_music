// 使用localstorage 存储商品的Id ,数量.其他由请求获取
export function addStorage(name,obj){
    if(!window.localStorage){
        alert("浏览器不支持localstorage");
        return false;
    }else{
        var storage = window.localStorage;
        storage.setItem(name,obj);
    }
}