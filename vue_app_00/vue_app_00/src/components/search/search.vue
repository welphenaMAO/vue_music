<template>
    <div class="app-search">
        <mt-header fixed>
            <router-link to="/home" slot="left"><span class="mui-icon mui-icon-back"></span></router-link>
        </mt-header>
        <div class="search-box">
            <div class="wrap">
                <a><span class="mui-icon mui-icon-search"></span></a>
                <!--使用自定义指令focus,必须加上v-->
                <input type="text" v-focus placeholder="搜索" v-model="InpValue" @blur="checkPro()">
            </div>
            <div class="hidden" :class="InpValue!=''?'show':''">
                <ol>
                    <li v-for="item in showList[0]" v-if="onOff?'show':''" @click="handleClick(item.id)">
                        {{item.sName}}
                    </li>
                    <li v-else>{{showList}}</li>
                </ol>
            </div>
        </div>
        <div class="searchRes">
            <p>热门搜索</p>
            <ul>
                <li>白雪</li>
                <li>戴爱玲</li>
                <li>蔡健雅</li>
                <li>James Horner</li>
                <li>祁隆</li>
                <li>海鸣威</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    export default {
        name: "product_search",
        data(){return {
            InpValue: "",
            showList: [],
            onOff : false
        }},
        methods: {
            checkPro(){
                if(this.InpValue!=="") {
                    var url = "http://127.0.0.1:3000/singer/checkSong";
                    this.$http.post(url,{value: this.InpValue}).then(result=>{
                        // console.log(result);
                        this.showList = [];
                    if(result.body.code==200){
                        this.showList.push(result.body.data);
                        //console.log(this.showList[0].id);
                        this.onOff = true;
                    }else{
                        this.showList="很抱歉,没有找到该商品!";
                        this.onOff = false;
                    }
                })
                }
            },
            handleClick(i){
                this.$router.push("/singerlist/proson?id="+i);
            }
        },
        created(){
        }
    }
</script>

<style scoped>
    ol,ul,li{margin:0;padding:0;}
    ol{list-style:none;}
    .app-search{height:500px;}
    .app-search  .search-box{position:relative;text-align:center;width:96%;height:40px;margin:10px auto;}
    .app-search .mui-bar{background-color:transparent;}
    .app-search  .search-box  div.wrap{width:100%;height:100%;}
    .app-search  .search-box a{position:absolute;left:1em;top:50%;margin-top:-12px;}
    .app-search  .search-box input{border-radius:20px;padding-left:50px;box-sizing:border-box;line-height:32px;background-color:#ddd;font-size:.9em;border:none;background:rgba(0,0,0,.1);}
    .app-search  .search-box .hidden{position:absolute;z-index:99;width:96%;left:50%;margin-left:-48%;}
    .app-search  .search-box .hidden ol{background-color:white;display:none;}

    .app-search  .search-box .hidden.show ol{display:block !important;}

    .app-search  .search-box .hidden ol li{text-align:left;max-width:100%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;padding-top:4px;height:34px;border-bottom:1px solid #c8c7cc;margin-left:16px;}
    .app-search .searchRes p{margin:0;width:96%;margin:10px auto;font-size:1em;}
    .app-search .searchRes ul{width:96%;margin:0 auto;}
    .app-search .searchRes ul li{display:inline-block;color:#9d9d9d;font-size:1.1em;font-weight:normal;font-family:"STSong","微软雅黑";border:1px solid #8f8f94;padding:0 10px;border-radius:30px;height:40px;text-align:center;line-height:40px;box-sizing:border-box;margin:5px 5px;max-width:96%;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;background-color:#fff;}
</style>