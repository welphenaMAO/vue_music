<template>
    <div class="app-product">
        <mt-header fixed>
            <router-link to="/" slot="left"><span class="mui-icon mui-icon-back"></span></router-link>
        </mt-header>
        <!--1:商品轮播区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper-box :list="imglist"></swiper-box>
                </div>
            </div>
        </div>
        <!--商品列表-->
        <div class="product">
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
        </div>
        <!--商城底部导航栏-->
        <tabbar-wrap></tabbar-wrap>
    </div>
</template>

<script>
    // 引入轮播图组件
    import {Toast} from "mint-ui";
    import swiper from "../../components/sub/swiper.vue";
    import tabbar from "../sub/product_tabbar.vue";
    export default {
        name: "product",
        data(){ return {
            productStat : [],
            productAudio : [],
            imglist : [],
            loadingText : "",
            onOff : true
        } },
        methods : {
            getProduct(){
                var url = "http://127.0.0.1:3000/user/product";
                this.$http.get(url).then(result=>{
                    this.productStat = result.body.floor10;
                    this.productAudio = result.body.floor20;
                })
            },
            getImglist(){
              var url = "http://127.0.0.1:3000/imglist";
              this.$http.get(url).then(result=>{
                  this.imglist = result.body;
              })
            },
            showLoad(){
                //console.log(1);
                if( this.onOff ){
                    this.loadingText = "折合<<";
                    this.onOff = false;
                }else{
                    this.loadingText = "展开>>";
                    this.onOff = true;
                }
            }
        },
        created(){
            this.getImglist();
            this.getProduct();
            this.showLoad();
        },
        components : {
            "swiper-box" : swiper,
            "tabbar-wrap" : tabbar
        }
    }
</script>

<style scoped>
    .product .show{display:none;}
    .product div.showDiv{display:block;}
    .app-product header.mui-bar{background-color:transparent;}
    .product .loading{text-align:center;color:red;font-size:20px;background-color:#ddd;line-height:30px;cursor:pointer;}
    .product .center h1,ul{margin:0;}
    .product .center h1{text-align:center;font-size:1em;font-weight:normal;font-family:"Times New Roman","微软雅黑";color: #ff5319;}
    .product .center{width:100%;}
    .product .center ul{width:100%;overflow:auto;white-space:nowrap;list-style:none;padding:0;}
    .product .center ul li{display:inline-block;width:25%;box-sizing:border-box;height:100px;border:1px solid #b9bfbe;border-left:none;}
    .product .center ul li img{width:100%;height:100%;}
    .product .center ul li p{margin:0;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .product .center ul li p.price{color:#FF3728;}
</style>