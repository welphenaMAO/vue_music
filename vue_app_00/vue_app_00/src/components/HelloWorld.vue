<template>
  <div class="app-helloContainer">
    <!--top_nav-->
    <mt-header fixed  title="Chicken Music"></mt-header>
    <!--login-->
    <!--<div class="login"><span class="mui-icon mui-icon-person" @click="login()"></span></div>-->
    <!--&lt;!&ndash;<div id="aleady" class="aleady"><img src=""/><span>当当</span><span>注销</span></div>&ndash;&gt;-->
    <!--tab_menu-->
    <mt-navbar class="page-part">
      <mt-tab-item :id="i" v-for="(item,i) in titledata" :key="i"><router-link :to="i==1?'/singerlist':i==2?'/user/product':i==3?'/user/search':''" :class="`${i==doMove?'active':''}`" ><div @click="border_bg(i)">{{item}}</div></router-link></mt-tab-item>

      <!--<mt-tab-item id="2">歌手</mt-tab-item>-->
      <!--<mt-tab-item id="3">排行</mt-tab-item>-->
      <!--<mt-tab-item id="3">搜索</mt-tab-item>-->
      <div class="icon_bottom" :class="`${doMove==doMove?todos[doMove]:''}`"></div>
    </mt-navbar>
    <!--swipe banner-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in list" :key="item.id"><img :src="item.img_url"/></mt-swipe-item>
    </mt-swipe>
    <div class="center">热门歌单推荐</div>
    <!--New_list-->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="task in music_list" :key="task.id">
        <router-link :to="'/home/MusicInfo?id='+task.id">
          <img class="mui-media-object mui-pull-left" :src="task.img_url">
          <div class="mui-media-body">
            {{task.compose}}
            <p class='mui-ellipsis'>{{task.title}}</p>
          </div>
        </router-link>
      </li>
      <button type="button" class="mui-btn mui-btn-block mui-btn-outlined" @click="getMore()">加载更多...</button>
    </ul>
    <footer>
      1234
    </footer>
  </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        data() {
            return {
                // 遍历头部
                titledata: ["推荐", "歌手", "商城", "搜索"],
                doMove: 0,  // 移动
                todos: ["doMove_0", "doMove_25", "doMove_50", "doMove_75"],
                list: [],// 定义一个数组接收服务器端数据
                music_list: [], // 歌单数组
                pageIndex: 0,  // 属性显示当前的页数是
                pageSize: 5,  // 页大小 ，一页几条数据
                pageCount: 5,
                musicData: [],
                hasMore: true    // 是否存在下一页数据
            }
        },
        methods: {
            getImg() {
                var url = "http://127.0.0.1:3000/imglist";
                this.$http.get(url).then(result => {
                    // 获取到服务器的数据
                    //console.log(result.body);
                    this.list = result.body;
            })
            },
            getMore() {
                this.pageIndex++;
                // 判断是否有下一页数据
                this.hasMore = this.pageIndex <= this.pageCount;
                // 如果没有下一页数据停止函数执行
                if (!this.hasMore)
                    return;
                // 构建url
                var url = "http://127.0.0.1:3000/songlist";
                url += "?pno=" + this.pageIndex + "&pageSize=" + this.pageSize;
                this.$http.get(url).then(result => {
                    //console.log(result.data.data); // 拿到数据
                    // concat 拼接数组 ,将二个数组拼接新数组
                    var rows = this.music_list.concat(result.data.data);
                this.music_list = rows;
                // 保存总页数
                //console.log(result.body);
                this.pageCount = result.body.pageSize;
            })
            },
            border_bg(i) {
                //alert(i);
                this.doMove = parseInt(i);
            },
            login() {
                this.$router.push("/user/islogin");
            },
            lodingMove(a){

            }
        },
        created() {
            this.getImg();
            this.getMore();
            //this.isLogin();
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app-helloContainer{ font-family:"黑体","sans-serif"; }
  .app-helloContainer header.mint-header{ background-color: #202020;color:#e0bb58;font-size:18px;font-family:"Georgia","Arial"; }
  /*Login*/
  /*设置头部登录*/
  /*#aleady, .app-helloContainer  div.login{*/
    /*position:absolute;*/
    /*right:10%;*/
    /*top:.2em;*/
    /*color:#e0bb58;*/
    /*z-index:99;*/
  /*}*/
  /*!*already*!*/
  /*.app-helloContainer  div.login span{font-size:30px;}*/
  /*<!--tab-->*/
  .app-helloContainer div.mint-navbar{ background-color: #202020;position:relative; }
  .app-helloContainer div.mint-navbar div.icon_bottom{transition:all 1s linear;position:absolute;width:25%;height:4px;background-color:#e0e00e;bottom:0;}
  /*deMove*/
  .app-helloContainer div.mint-navbar div.doMove_0{left:0;}
  .app-helloContainer div.mint-navbar div.doMove_25{left:25%;}
  .app-helloContainer div.mint-navbar div.doMove_50{left:50%;}
  .app-helloContainer div.mint-navbar div.doMove_75{left:75%;}
  .app-helloContainer div.mint-navbar a.mint-tab-item a{ color:#fff; }
  /*.app-helloContainer div.mint-navbar a.mint-tab-item a{}*/
  .app-helloContainer div.mint-navbar a.mint-tab-item a.active{color:#e0e00e;width:100%;}
  /*center_font*/
  .app-helloContainer div.center{ text-align:center;color:#e0bb58;font-size:14px;line-height:30px;background-color: #202020; }
  /*<!--banner_style-->*/
  .app-helloContainer .mint-swipe{ height:200px; }
  .app-helloContainer .mint-swipe img{ width:100%;height:100%; }
</style>