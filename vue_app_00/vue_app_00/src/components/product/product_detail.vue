<template xmlns="http://www.w3.org/1999/html">
    <div class="app-car">
        <mt-header fixed>
            <router-link to="/user/product" slot="left"><span class="mui-icon mui-icon-back"></span></router-link>
        </mt-header>
        <!--1:商品轮播区域-->
        <div class="mui-card">
            <!--<swiper-box :list="imglist"></swiper-box>-->
            <img :src="msg.pImg" alt=""/>
        </div>
        <!--2:商品购买区域-->
        <div class="mui-card" v-cloak>
            <div class="mui-card-header">{{msg.pDesc}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>￥{{parseInt(msg.price)+10}}</del>
                        销售价:<span class="now">￥{{msg.price}}</span>
                    </p>
                    <div>
                        购买数量:
                        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="product_Btn(-1)">-</button>
                            <input id="test" class="mui-input-numbox" type="number" v-model="num"/>
                            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="product_Btn(+1)">+</button>
                        </div>
                    </div>
                    <p class="car">
                        <mt-button type="primary" size="small" @click="jumpCart">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCarTo(msg.pId)">加入购物车</mt-button>
                    </p>
                </div>
            </div>
            <div class="mui-card-footer"></div>
        </div>
        <!--3:商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{msg.pId}}</p>
                    <p>商品颜色:热情红</p>
                    <p>商品运免:免</p>
                </div>
            </div>
            <div class="mui-card-footer"></div>
        </div>
        <tabbar-wrap></tabbar-wrap>
    </div>
</template>

<script>
    import swiper from "../sub/swiper.vue";
    import tabbar from "../sub/product_tabbar.vue";

    export default {
        name: "product_car",
        data(){return {
            imglist : [],
            msg : [],
            num : 1,
            arrObj : [],
            objMsg : {},
            count : 0
        }},
        methods : {
            getImglist(){
                var url = "http://127.0.0.1:3000/imglist";
                this.$http.get(url).then(result=>{
                    this.imglist = result.body;
                })
            },
            getPromsg(){
                var url = "http://127.0.0.1:3000/user/productMsg?pId="+this.$route.query.id;
                this.$http.get(url).then(result=>{
                    // console.log(result.body);
                    this.msg = result.body[0];
                })
            },
            addCarTo(i){
                // 把商品信息储起来
                // 商品Id
                this.objMsg.id = i;
                this.count += this.num;
                // 商品数量
                this.objMsg.num = this.count;
                // 商品图片
                this.objMsg.img = this.msg.pImg;
                // 商品信息
                this.objMsg.pdesc = this.msg.pDesc;
                // 商品价格
                this.objMsg.price = this.msg.price;
                this.arrObj = [];
                this.arrObj.push(this.objMsg);
                this.$Store.addStorage("obj"+i,JSON.stringify(this.arrObj));  // SJON字符串
                // 实时更新商品数量
                var count = this.num;
                this.$store.commit("increment", count);
            },
            product_Btn(i){
                if (this.num < 999&&i>0)
                    this.num++;
                else if (this.num > 1)
                    this.num--;
                this.num = this.num;
            },
            jumpCart(){
                this.$router.push("/user/product_cart")
            }
        },
        created(){
            this.getImglist();
            this.getPromsg();
        },
        updated(){
            // this.getPromsg();
        },
        components : {
            "swiper-box" : swiper,
            "tabbar-wrap" : tabbar
        }
    }
</script>

<style scoped>
    .app-car .mui-card img{width:100%;height:220px;}
    .mui-card .mui-card-content-inner .car{margin-top:1em;}
    .mui-card .mui-card-content-inner .car button{margin-left:5px;}
    .mui-card .mui-bar{background-color:transparent;}
</style>