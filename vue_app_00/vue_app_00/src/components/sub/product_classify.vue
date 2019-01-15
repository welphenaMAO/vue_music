<template>
    <div class="app-product_classify">
        <mt-header fixed>
            <router-link to="/user/product" slot="left"><span class="mui-icon mui-icon-back"></span></router-link>
        </mt-header>
        <div class="product">
            <!--文具-->
            <div class="center product_stat">
                <h1>文具</h1>
                <ul>
                    <li v-for="(item,i) in productStat" :key="item.pId">
                        <router-link :to="{path:'/user/product_detail',query:{id:item.pId}}">
                            <img :src="item.pImg"/>
                            <p>{{item.pDesc}}</p>
                            <p class="price">¥:{{item.price}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!--数码影音-->
            <div class="center product_audio">
                <h1>数码影音</h1>
                <ul>
                    <li v-for="(item,i) in productAudio" :key="item.pId">
                        <router-link :to="{path:'/user/product_detail',query:{id:item.pId}}">
                            <img :src="item.pImg"/>
                            <p>{{item.pDesc}}</p>
                            <p class="price">¥:{{item.price}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!--IP周边-->
            <div class="center product_ip">
                <h1>IP周边</h1>
                <ul>
                    <li v-for="(item,i) in productIp" :key="item.pId">
                        <router-link :to="{path:'/user/product_detail',query:{id:item.pId}}">
                            <img :src="item.pImg"/>
                            <p>{{item.pDesc}}</p>
                            <p class="price">¥:{{item.price}}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!--<p class="loading" @click="showLoad()">{{loadingText}}</p>-->
            <!--乐器-->
            <div class="show showDiv">
                <div class="center product_musical">
                    <h1>乐器</h1>
                    <ul>
                        <li v-for="(item,i) in productMusical" :key="item.pId">
                            <router-link :to="{path:'/user/product_detail',query:{id:item.pId}}">
                                <img :src="item.pImg"/>
                                <p>{{item.pDesc}}</p>
                                <p class="price">¥:{{item.price}}</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <!--服饰配件-->
                <div class="center product_acc">
                    <h1>服饰配件</h1>
                    <ul>
                        <li v-for="(item,i) in productAcc" :key="item.pId">
                            <router-link :to="{path:'/user/product_detail',query:{id:item.pId}}">
                                <img :src="item.pImg"/>
                                <p>{{item.pDesc}}</p>
                                <p class="price">¥:{{item.price}}</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <!--loading-->
            <div class="loadMsg" :class="onOff?'hidden':'show'" @click="loading()">
                加载更多...
            </div>
            <p class="loadBot" :class="onOff?'show':'hidden'">没有更多了...</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "product_classify",
        data(){return {
            productStat : [],
            productAudio : [],
            productIp : [],
            productMusical : [],
            productAcc : [],
            onOff : false
        }},
        methods : {
            getProduct(){
                var url = "http://127.0.0.1:3000/user/product";
                this.$http.get(url).then(result=>{
                    //console.log(result);
                    this.productStat = result.body.floor10;
                    this.productAudio = result.body.floor20;
                    this.productIp = result.body.floor30;
                    this.productMusical = result.body.floor40;
                    this.productAcc = result.body.floor50;
            })
            },
            loading(){
                this.onOff = true;
            }
        },
        created(){
            this.getProduct();
        }
    }
</script>

<style scoped>
    .product .show{display:none;}
    .product div.showDiv{display:block;}
    .app-product header.mui-bar{background-color:transparent;}
    .product .loading{text-align:center;color:red;font-size:20px;line-height:30px;cursor:pointer;}
    .product div.loadMsg{position:absolute;bottom:0;left:0;line-height:40px;width:100%;text-align:center;background-color:white;}
    .product p.loadBot{margin-bottom:0;line-height:30px;}
    .product .loadBot.hidden,.product div.hidden{display:none;text-align:center;}
    .product .loadBot.show,.product div.show{display:block;text-align:center;}
    .product .center h1,ul{margin:0;}
    .product .center h1{text-align:center;font-size:1em;font-weight:normal;font-family:"Times New Roman","微软雅黑";color: #ff5319;line-height:30px;border-bottom:1px solid #b9bfbe;}
    .product .center{width:100%;margin-bottom:10px;background-color:white;}
    .product .center ul{width:100%;overflow:auto;white-space:nowrap;list-style:none;padding:0;}
    .product .center ul li{display:inline-block;width:25%;box-sizing:border-box;height:100px;}
    .product .center ul li img{width:100%;height:100%;}
    .product .center ul li p{margin:0;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .product .center ul li p.price{color:#FF3728;}
</style>