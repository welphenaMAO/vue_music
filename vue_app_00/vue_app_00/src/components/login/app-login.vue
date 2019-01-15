<template>
    <div class="app-login">
        <form id='login-form' class="mui-input-group">
            <div class="mui-input-row">
                <label>账号:</label>
                <input v-model="unameValue" id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号" >
            </div>
            <div class="mui-input-row">
                <label>密码:</label>
                <input v-model="upwdValue" id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
            </div>
            <button id='login' type="button" class="mui-btn mui-btn-block mui-btn-primary" @click="verify(+1)">登录</button>
            <button id='register' type="button" class="mui-btn mui-btn-block mui-btn-grey" @click="verify(-1)">注册</button>
        </form>
    </div>
</template>

<script>
    import {Toast} from "mint-ui"
    export default {
        name: "app-login",
        data(){return {
            unameValue : "",
            upwdValue : "",
            back : "",
            num : 3
        }},
        methods : {
            verify(i){
                //alert("获取到!");
                //console.log(this.unameValue + ":" + this.upwdValue);
                if(i>0){
                    //console.log(this.unameValue);
                    //console.log(this.upwdValue);
                    var url = "http://127.0.0.1:3000/user/signin";
                    var obj = { Mname:this.unameValue,Mpwd:this.upwdValue };
                    this.$http.post(url,obj,{withCredentials:true}).then(result=>{
                        //console.log(result);
                        if(result.body.code == 1){
                            var timer = setInterval(()=>{
                                Toast("登录成功,"+this.num+"秒后返回到来时的页面!");
                                this.num --;
                                if(this.num<0){
                                    clearInterval(timer);
                                    this.$router.push(this.$route.query.back);
                                    location.reload();
                                }
                            },1000);
                        }else{
                            Toast("用户名或密码错误 ,请重新输入!");
                        }
                    })
                }else{
                    //Toast("获取到注册按钮...");
                    var url = "http://127.0.0.1:3000/user/register";
                    var obj = {Mname:this.unameValue,Mpwd:this.upwdValue};
                    this.$http.post(url,obj).then(result=>{
                        //console.log(result.body.code)
                        if(result.body.code=="404"){
                            Toast("用户已存在,请重新输入!");
                            this.unameValue = "";
                            this.upwdValue = "";
                        }else if(result.body.code == 400 || result.body.code==405){
                            Toast("用户名/密码不能为空!");
                        }else{
                            Toast("注册成功!");
                            this.$router.push(this.$route.query.back);
                            location.reload();
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    #login{margin-bottom:0;padding:10px 0;}
    #register{margin-bottom:0;padding:10px 0;}
</style>