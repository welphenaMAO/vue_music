<template>
 <div class="app-container">
     <mt-header fixed  title="Chicken Music"></mt-header>
     <div class="login" v-if="onOff!=1"><span class="mui-icon mui-icon-person" @click="login()"></span></div>
     <div class="write" v-else>
         <div><img :src="loginData.img_url" ><span>{{loginData.Mname}}</span></div>
         <div><a href="#" @click="singout()">注销</a></div>
     </div>
    <router-view></router-view>
 </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default{
        data(){
            return {
                onOff : "",
                loginData : {}
            }
        },
        methods : {
            login(){
                if(this.$route.query.id!==undefined) {
                    this.$router.push("/user/login?back=" + this.$route.path + "?id=" + this.$route.query.id);
                }else{
                    this.$router.push("/user/login?back=" + this.$route.path);
                }
            },
            isLogin(){
                var url = "http://127.0.0.1:3000/user/islogin";
                this.$http.get(url,{withCredentials:true}).then(result=>{
                    //console.log(result);
                    if(result.body.msg==0){
                        Toast("请先登录!");
                        this.onOff = result.body.msg;
                    }else{
                        this.onOff = result.body.msg;
                        this.loginData = result.body.data;
                        //location.reload();
                    }
            })
            },
            singout(){
                Toast("获取成功!");
                var url = "http://127.0.0.1:3000/user/singout";
                this.$http.get(url,{withCredentials:true }).then(result=>{
                    //console.log(result,"1");
                    location.reload();
            })
            }
        },
        created(){
            this.isLogin();
        }
    }
</script>

<style>
   .app-container{
     position:relative;
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
   }
   /*<!--修改头部样式-->*/
   .app-container{ font-family:"黑体","sans-serif"; }
   .app-container header.mint-header{
       background-color: #202020;
       color:#e0bb58;
       font-size:18px;
       font-family:"Georgia","Arial";
   }
   /*设置头部登录*/
   .app-container  div.login, div.write{
       position:absolute;
       right:10%;
       top:.2em;
       color:#e0bb58;
       z-index:99;
   }
   .app-container div.write{
       display:flex;
       right:2%;
       top:.3em;
   }
   .app-container div.write img{width:26px;height:26px;border-radius:50%;vertical-align:middle;}
   .app-container div.write span{font-size:.2em;}
   .app-container div.write a{font-size:.8em;margin-left:10px;}
   .app-container  div.login span{font-size:30px;}
   .app-container  div.login span{font-size:30px;}

 .mui-bar-tab .mui-tab-item-tao.mui-active {
    color: #007aff;
 }
.mui-bar-tab .mui-tab-item-tao {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon~.mui-tab-label {
   font-size:11px;
   display:block;
   overflow:hidden;
   text-overflow:ellipsis;
}
</style>
