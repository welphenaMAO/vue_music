<template>
    <div class="app-subswiper">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in list" :key="item.id"><img :src="item.img_url"/></mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        data(){
            return {}
        },
        props : ["list"]  // 子组件接收父组件数据
    }
</script>

<style scoped>
    /*<!--banner_style-->*/
    .app-subswiper .mint-swipe{ height:200px; }
    .app-subswiper .mint-swipe img{ width:100%;height:100%; }
</style>