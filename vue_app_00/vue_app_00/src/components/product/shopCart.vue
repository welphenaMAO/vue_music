<template>
    <div class="app-shopCart">
        <!--<mt-header fixed>-->
            <!--<router-link :to="'/user/product_detail?id='+backId" slot="left"><span class="mui-icon mui-icon-back"></span></router-link>-->
            <!--<h1 class="title">购物车({{numberAll}})</h1>-->
        <!--</mt-header>-->
        <header class="mui-bar mui-bar-nav">
            <router-link :to="'/user/product_detail?id='+backId" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
            <!--<h1 class="title">购物车({{numberAll}})</h1>-->
        </header>
        <div class="product">
            <ul>
                <li v-for="(item,i) in localArr" :key="i">
                    <form class="mui-input-group">
                        <div class="mui-input-row mui-checkbox mui-left">
                            <input name="checkbox" value="Item 1" type="checkbox" >
                            <img :src="item.img" alt=""/>
                        </div>
                    </form>
                    <div class="msgBox">
                        <p>{{item.pdesc}}</p>
                        <span class="Bot">[团购]黑*5+红*5</span>
                        <span class="Tr">¥{{item.price}}</span>
                        <div class="cart-btn">
                            <button class="reduce_btn" @click="setNumber(-1,item.id)">-</button>
                            <input class="pro_num" v-model="item.num" readonly>
                            <button class="add_btn" @click="setNumber(+1,item.id)">+</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <nav class="mui-bar mui-bar-tab">
            <!--<div class="mui-card">-->
                <form class="mui-input-group">
                    <div class="mui-input-row mui-checkbox mui-left">
                        <input name="checkbox" value="Item 1" type="checkbox" @click="checkAll()"/>
                        <label>全选</label>
                        <div class="sub">
                            <div class="fon">
                                <p>合计:<i>¥</i><span :title="priceAll">{{priceAll}}</span></p>
                                <h5>已享受免运费</h5>
                            </div>
                            <div class="icon">
                                <p>结算({{numberAll}})</p>
                            </div>
                        </div>
                    </div>
                </form>
            <!--</div>-->
        </nav>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";

    export default {
        name: "shop-cart",
        data(){return {
            backId : "1",  // callback 回调,返回上一个商品
            temp : 0,
            list : [],
            tempId : "", // 用于找到localstorage中的id
            val : 0, // 用于修改localstorage的num数值
            onOff : true, // 开关,用于强赋值操作
            num : 0,
            priceAll : 0,
            numberAll : 0,
            localArr : []   // 存放localstorage的值
        }},
        methods: {
            getCookie(){
                var storage = window.localStorage;
                var reg = /obj/;  // 匹配storage以obj开头的商品
                var arr = [];
                for(var key in storage){
                    if(reg.test(key)){
                        arr.push(key);
                    }
                }
                for(var i in arr){
                    this.localArr.push( JSON.parse(storage.getItem(arr[i]))[0]);
                }
                // 遍历数组 ,统计合计价格
                for(var key of this.localArr){
                    // 商品数量合计
                    this.numberAll += key.num;
                    // 商品价格合计
                    this.priceAll = parseInt( this.priceAll ) + parseInt(key.price)*parseInt(key.num);
                    // 当购物车为空时 ,默认跳转到第一个商品
                    // 有商品时返回到最后添加进购物车的商品详情页
                    key.id==undefined ? this.backId = 1:this.backId = key.id;
                }

            },
            getPromsg(){
                var url = "http://127.0.0.1:3000/user/productMsg?pId="+this.backId;
                this.$http.get(url).then(result=>{
                    this.list = result.body[0];
                })
            },
            setNumber(num,id){
                // 获取到localstorage ,并进行修改
                var storage = window.localStorage;
                var that = JSON.parse(storage.getItem("obj"+id));
                var obj = JSON.parse(storage.getItem("obj"+id))[0];
                // console.log(obj.id);
                // console.log(this.localArr);
                if(num>0){
                    if(obj.id==id){
                        for(var item of this.localArr){
                            //this.priceAll = item.price*item.num; // 存取总价格
                            if(obj.id==item.id){
                                // 在localstorage身上的num 数量进行++操作
                                that[0].num++;
                                // 把实时更新的localstorage的num赋值到localArr数组中的num ,解决了刷新更换值的问题
                                item.num = that[0].num;
                                this.numberAll ++;  // 加减只能进行加一减一操作 ,应在原基础上进行加减
                                this.priceAll = parseFloat(this.priceAll.toFixed(1)) + item.price;
                                // console.log(item.price+":"+item.num);
                                storage.setItem("obj"+obj.id,JSON.stringify(that));
                            }
                        }
                    }
                }else if(num<0){
                    //console.log(this.localArr);
                    if(obj.id==id){
                        for(var item of this.localArr){
                            if(obj.id==item.id){
                                that[0].num--;
                                item.num = that[0].num;
                                this.numberAll --;
                                this.priceAll = parseFloat(this.priceAll.toFixed(1)) - item.price;
                                storage.setItem("obj"+obj.id,JSON.stringify(that));
                                if(that[0].num<1){
                                    if(window.confirm("是否删除该商品?")){
                                        storage.removeItem("obj"+obj.id);
                                        this.localArr.splice(obj.id, 1);
                                        location.reload();
                                    }else{
                                        item.num = 1;
                                        this.numberAll = 1;
                                        this.priceAll = item.price;
                                        that[0].num = 1;
                                        storage.setItem("obj"+obj.id,JSON.stringify(that));
                                    }
                                }
                            }
                        }
                    }
                }
            },
            checkAll(){
            }
        },
        created(){
            this.getCookie();
            this.getPromsg();
        }
    }
</script>

<style scoped>
    p{margin:0;}
    ul,li{margin:0;padding:0;list-style:none;}
    .app-shopCart{position:relative;}
    .app-shopCart .mui-bar{background-color:transparent;}
    .app-shopCart header a{color:red;}
    .app-shopCart header h1.title{color: #ffc554;font-size:1.1em;line-height:38px;font-weight:normal;font-family:"黑体","微软雅黑";}
    .app-shopCart div.product{position:relative;z-index:10;}
    .app-shopCart div.product ul li{display:flex;position:relative;top:4px;width:100%;background-color: #bdbdbd;}
    .app-shopCart div.product ul li img{ width:50%;height:75%;position:absolute;left:60px;top:50%;margin-top:-30.5px; }
    .app-shopCart div.product ul li form{width:150px;height:80px;}
    .app-shopCart div.product ul li div.msgBox p{margin-left:4px;margin-top:6px;width:60%;height:41px;font-size:.8em;padding:4px 4px 0px 4px;overflow:hidden;text-overflow:ellipsis;line-height:12px;color: #ff4f65;}
    .app-shopCart div.product ul li div.msgBox span.Tr{position:absolute;right:10px;top:8px;color:red;}
    .app-shopCart div.product ul li div.msgBox span.Bot{display:inline-block;margin-left:4px;margin-top:6px;font-size:.6em;vertical-align: bottom;}
    .cart-btn{
        position:absolute;
        display:flex;
        flex-direction:row;
        right:20px;
        bottom:10px;
        width:90px;
    }
    .cart-product-info div .cart-btn .reduce_btn{
        width:35%;
        border-radius:0;
        border-right:0
    }
    .cart-btn .add_btn{
        width:35%;
        border-radius:0;
        border-left:0
    }
    .cart-btn input{
        width:30%;
        border:1px solid #ccc;
        border-radius:none;
        text-align:center
    }
    .app-shopCart div.product ul li div.msgBox input{width:38px;height:33px;text-align:center;}
    .app-shopCart div.product ul li .mui-input-group .mui-input-row{height:80px;width:136px;}
    .app-shopCart div.product ul li .mui-radio input[type='radio'], .mui-checkbox input[type='checkbox']{top:25px;}
    /*<!--底部样式-->*/
    .app-shopCart div.product ul li form{width:136px;}
    nav.mui-bar .mui-input-group{height:100%;position:relative;z-index:99;}
    .mui-radio.mui-left label, .mui-checkbox.mui-left label{padding:0;}
    .app-shopCart .mui-bar  .mui-checkbox.mui-left input{top:10px;color:red;}
    nav.mui-bar .mui-input-group .mui-input-row label{display:inline-block;height:50px;margin-left:54px;line-height: 50px;width:40%;}
    nav.mui-bar .mui-input-group .mui-input-row{display:flex;height:100%;}
    .mui-input-group .mui-input-row:after{background-color:transparent;}
    nav.mui-bar .mui-input-group .mui-input-row div.sub{display:flex;justify-content:space-between;height:50px;}
    /*nav.mui-bar .mui-input-group .mui-input-row div.sub div{width:50%;}*/
    nav.mui-bar .mui-input-group .mui-input-row div.sub h5{font-size:.6em;text-align: left;}
    nav.mui-bar .mui-input-group .mui-input-row div.sub div.fon{padding-right:10px;box-sizing:border-box;}
    nav.mui-bar .mui-input-group .mui-input-row div.sub div.fon p{color: rgba(9, 4, 4, 0.82);margin-top:4px;width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    nav.mui-bar .mui-input-group .mui-input-row div.sub i{font-style:normal;color: #ff200d;}
    nav.mui-bar .mui-input-group .mui-input-row div.sub span{color:#ff362f;font-size:18px;}
    nav.mui-bar .mui-input-group .mui-input-row div.sub div.icon{display:inline-block;width:100px;background-color: red;}
    nav.mui-bar .mui-input-group .mui-input-row div.sub div.icon p{line-height:50px;text-align:center;color:white;font-size:1.2em;}
    nav.mui-bar .mui-input-group:before{background-color:transparent;}
</style>