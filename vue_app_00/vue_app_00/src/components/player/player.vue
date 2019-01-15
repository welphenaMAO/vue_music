<template>
    <!--<div class="app-player">-->
        <!--<div id="playaudio">-->
            <!--<div class="aduioBox">-->
                <!--<div class="aduioPlay">-->
                    <!--<div class="prevIcon"></div>-->
                    <!--<input type="button" class="playBtn"/>-->
                    <!--<div class="nextIcon"></div>-->
                <!--</div>-->
                <!--<div class="progressBar"></div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
    <div>
        <!--<audio src="../../../../音乐链接/阿宝东玲/阿宝,熊汝霖 - 倾国倾城.mp3" controls></audio>-->
        <audio controls autoplay="autoplay">
            <source src="">
            <!--您的浏览器不支持 audio 元素。-->
        </audio>
    </div>
</template>

<script>
    export default {
        name: "player",
        data(){return {
            that : []
        }},
        methods:{
            playSong(){
                var url = "http://127.0.0.1:3000/play/song";
                this.$http.get(url).then(result=>{
                    //console.log(result.body[0]);
                    //this.that = result.body[0];
                    //console.log(this.that.sUrl);
                })
            }
        },
        created(){
            this.playSong();
        }
    }
</script>

<style scoped>
    .app-player{border:1px solid red;margin-top:100px;}
    .app-player .aduioBox{display:flex;}
    .app-player .aduioBox .aduioPlay{display:flex;border:1px solid green;}
    .app-player .aduioBox .aduioPlay div.prevIcon,div.nextIcon{width:34px;height:34px;background:#000 url("../../img/audio.png") no-repeat -26px -128px;margin-top:4px;}
    .app-player .aduioBox .aduioPlay div.nextIcon{background-position:-107px -128px;}
    /*暂停按钮:4px -202px  播放按钮:4px -164px*/
    .app-player .aduioBox .aduioPlay .playBtn{display:inline-block;width:46px;height:44px;background:#000000 url("../../img/audio.png") no-repeat 4px -202px;}
    /*进度君*/
    .app-player .progressBar{border:1px solid yellow;}
</style>