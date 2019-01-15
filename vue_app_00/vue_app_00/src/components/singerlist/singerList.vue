<template>
    <div class="app-singerlist">
        <mt-header fixed>
            <router-link to="/" slot="left"><span class="mui-icon mui-icon-back"></span></router-link>
        </mt-header>
        <mt-index-list>
            <mt-index-section v-for="(item,i) in list" :key="i" :tasks="i" :index="singerIndex[i]">
               <div class="singerlist" @click="skipSinger(item.id)">
                   <img :src="item.sin_imgUrl"/>
                   <h5>{{item.singerName}}</h5>
               </div>
            </mt-index-section>
        </mt-index-list>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        name: "singer-list",
        data(){  return {
            singerIndex : ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            list : []
        }},
        methods : {
            getUrl(){
                var url = "http://localhost:3000/singerList";
               this.$http.post(url).then(result=>{
                   //console.log(result.body);
                   this.list = result.body;
               })
            },
            skipSinger(i){
                this.$router.push('/singerlist/proson?id='+i);
                //alert(i);
            }
        },
        created(){
            this.getUrl();
        }
    }
</script>

<style scoped>
    .app-singerlist header.mui-bar{background-color:transparent;}
    .app-singerlist div.singerlist{display:inline-block;vertical-align:middle;width:100%;}
    .app-singerlist div.singerlist img{display:inline-block;vertical-align:middle;width:80px;height:80px;border-radius:50%;}
    .app-singerlist div.singerlist h5{display:inline-block;vertical-align:middle;line-height:100px;margin-left:20px;}
</style>