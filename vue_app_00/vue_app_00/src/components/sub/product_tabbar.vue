<template>
    <nav class="mui-bar mui-bar-tab">
        <router-link to="/user/product/search" class="mui-tab-item" href="#tabbar">
            <span class="mui-icon mui-icon-search"></span>
            <span class="mui-tab-label">搜索</span>
        </router-link>
        <router-link to="/user/product_classify" class="mui-tab-item" href="#tabbar-with-chat">
            <!--<span class="mui-icon-extra mui-icon-extra-class">-->
            <!--</span>-->
            <span class="mui-icon mui-icon-extra mui-icon-extra-class">
                </span>
            <span class="mui-tab-label">分类</span>
        </router-link>
        <router-link to="/user/product_cart" class="mui-tab-item" href="#tabbar-with-contact">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                   <span class="mui-badge">
                      {{$store.getters.optCount==0?numberAll:$store.getters.optCount}}
                   </span>
                </span>
            <span class="mui-tab-label">购物车</span>
        </router-link>
        <a class="mui-tab-item" href="#tabbar-with-map">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label"> 我的</span>
        </a>
    </nav>
</template>

<script>
    export default {
        name: "product_tabbar",
        data(){return {
            numberAll : 0,
            localArr : []
        }},
        methods : {
            proNumner(){
                var storage = window.localStorage;
                var reg = /obj/;
                var arr = [];
                for(var key in storage){
                    if(reg.test(key)){
                        arr.push(key);
                    }
                }
                for(var i in arr){
                    this.localArr.push( JSON.parse(storage.getItem(arr[i]))[0]);
                }
                //console.log(this.localArr);
                // 遍历数组 ,统计合计数量
                for(var key of this.localArr){
                    this.numberAll += key.num;
                }
            }
        },
        created(){
            this.proNumner();
        }
    }
</script>

<style scoped>
    nav{background-color:#202020;}
    nav a{color:white;}
</style>