import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
Vue.use(Router)

// 登录组件
import AppLogin from "./components/login/app-login.vue";
//  注册歌单列表详情
import MusicInfo from "./components/listInfo/MusicInfo.vue";
// 歌手列表
import SingerList from "./components/singerlist/singerList.vue";
// 个人歌手详情列表
import ProsonList from "./components/singerlist/prosonList.vue";
// 商城详情列表
import Product from "./components/product/product.vue";
// 商城购物车
import ProductDetail from "./components/product/product_detail.vue";
// 商城搜索
import ProductSearch from "./components/search/product_search.vue";
// 结账列表
import ProductCar from "./components/product/shopCart.vue";
// 引入播放组件
import Appplayer from "./components/player/player.vue";
// 引入歌手搜索页
import userSearch from "./components/search/search.vue";
// 引入商品分类页
import ProductClassify from "./components/sub/product_classify.vue";

export default new Router({
  routes: [
    {path:"/",component:HelloContainer},
    {path:"/player",component:Appplayer},
    {path:"/home",component:HelloContainer },
    {path:"/user/login",component:AppLogin},
    {path:"/user/product",component:Product},
    {path:"/user/search",component:userSearch},
    {path:"/user/product_detail",component:ProductDetail},
    {path:"/user/product_cart",component:ProductCar},
    {path:"/user/product_classify",component:ProductClassify},
    {path:"/home/musicinfo",component:MusicInfo},
    {path:"/user/product/search",component:ProductSearch},
    {path:"/singerlist",component:SingerList},
    {path:"/singerlist/proson",component:ProsonList}
  ]
})
