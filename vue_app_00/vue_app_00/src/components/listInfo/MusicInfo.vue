<template>
    <div class="app-listinfo">
        <header class="mui-bar mui-bar-nav">
            <router-link class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" to="/home"></router-link>
            <!--<h1 class="mui-title"></h1>-->
            <p class="title_list">{{list.title}}</p>
            <ul class="img_bg">
                <li>
                    <img v-lazy="list.img_url">
                </li>
            </ul>
        </header>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        name: "music-info",
        data(){
            return { list : [] }
        },
        methods : {
            initlist(){
                // 发送ajax请求
                //alert("歌单列表加载成功！");
                var url = "http://127.0.0.1:3000/initlist";
                var id = this.$route.query.id;
                this.$http.post(url,{id : id}).then(result=>{
                    //console.log(result.body[0]); // 得到服务器返回数据
                    this.list = result.body[0];
                })
                //console.log(this.$route.query);
            },
            fn(){
                alert("获取成功！");
            }
        },
        created(){
            this.initlist();
        }
    }
</script>
<style scoped>
    .app-listinfo .mui-bar .mui-action-back{margin-right:0px;}
    .app-listinfo .mui-bar p.title_list{line-height:44px;margin-left:10px;width:300px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;/*加宽度width属来兼容部分浏览*/position:relative;z-index:100;color:#f2f200;font-size:16px;font-weight:bold;}
    .app-listinfo .mui-bar ul.img_bg{position:absolute;left:0;top:0;width:100%;margin:0;padding:0;}
    .app-listinfo .mui-bar ul.img_bg li{list-style:none;width:100%;height:250px;}
    .app-listinfo .mui-bar ul.img_bg img{width:100%;height:100%;}
</style>



