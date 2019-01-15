<template>
    <div class="app-prosonlist">
        <mt-header fixed :title="`${initObj.singerName}`">
            <router-link :to="`${sinPath}`" slot="left" @click="getDefault()"><span class="mui-icon mui-icon-back"></span></router-link>
        </mt-header>
        <div class="singerimg">
            <img :src="initObj.img_url" />
            <!--随机播放-->
            <div class="icon">
                <p>随机播放全部{{tasks}}</p>
            </div>
        </div>
        <ul>
            <li v-for="item in initSong" :key="item.sId">
                <div class="box">
                    <img src="../../img/laba.png" :class="ind==item.sId?'show':''" alt=""/>
                    <div>
                        <span>{{item.sName}}</span>
                        <p>{{item.singerName}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default {
        name: "proson-list",
        data(){
            return {
                sinPath : {},
                id : "",
                initObj : { img_url : "",singerName : "" },
                initSong : [],
                ind : 0
            }
        },
        methods : {
            initGet(){
                this.sinPath = this.$route.path.slice(0,11);
                this.id = this.$route.query.id;
                var url = "http://127.0.0.1:3000/singer/init?id="+this.id;
                this.$http.get(url,{id : this.sinPath}).then(result=>{
                    this.initObj.img_url = result.body[0].sin_imgUrl;
                    this.initObj.singerName = result.body[0].singerName;
                })
            },
            IndividualSongs(){
               // console.log(this.id)
                var url = "http://127.0.0.1:3000/singer/Individual?id="+this.id;
                this.$http.get(url).then(result=>{
                    this.initSong = result.body;
                    this.ind = result.body[0].sId;
                })
            }
        },
        created(){
            this.initGet();
            this.IndividualSongs();
        },
        props : ["tasks"]
    }
</script>

<style scoped>
    ul,li{margin:0;padding:0;list-style:none;}
    p{margin:0;}
    .app-prosonlist ul li{border-bottom:1px solid #d3d3d3;padding:4px 0px 4px 0px;box-sizing:border-box;}
    .app-prosonlist ul li div.box{width:100%;position:relative;}
    .app-prosonlist ul li div.box div{padding-left:30px;}
    .app-prosonlist ul li img{display:none;width:1.4em;height:1.4em;position:absolute;top:50%;left:4px;margin-top:-0.62em;}
    .app-prosonlist ul li img.show{display:block;}
    .app-prosonlist .singerimg{position:relative;}
    .app-prosonlist .singerimg div.icon{position:absolute;left:50%;margin-left:-15%;width:30%;height:30px;border:2px solid #ffae15;border-radius:18px;bottom:30px;cursor:pointer;}
    .app-prosonlist .singerimg div.icon p{text-align:center;font-size:.8em;line-height:30px;color:#ffc613;}
    .app-prosonlist div.singerimg img{width:100%;height:280px;vertical-align:bottom;}
</style>