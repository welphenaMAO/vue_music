import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'


// 2.引入vue-resource
import  VueResource  from 'vue-resource'
// 2.1 注册组件库
Vue.use(VueResource)

Vue.config.productionTip = false
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

// 1.导入Home导航条组件
import { Header,Swipe,SwipeItem,Lazyload,IndexList,IndexSection,Button } from "mint-ui";
// 2.导入menu切换组件
import { Navbar,TabItem } from "mint-ui";
// 注册懒加载组件
Vue.use(Lazyload);
// 注册索引列表
Vue.component(IndexList.name,IndexList);
Vue.component(IndexSection.name,IndexSection);

// 1.注册当前项目中的<mt-header>标签
Vue.component( Header.name,Header );
// 2.注册menu组件
Vue.component( Navbar.name,Navbar );
Vue.component( TabItem.name,TabItem );
// 3.注册<mt-swipe>及<mt-swipe-item>
Vue.component( Swipe.name,Swipe );
Vue.component( SwipeItem.name,SwipeItem );
// 4.注册Button
Vue.component( Button.name,Button );

// 5.创建Vuex示例对象
  // 5.1 下载安装Vuex  npm i vuex  -D
import Vuex from "vuex";
// 5.2 注册Vuex实例
Vue.use(Vuex);
// 5.3 创建Vuex实例对象
var store = new Vuex.Store({
    state: {count:0},
    mutations: {
      increment(state,c){
        state.count += parseInt(c);
        // 修改共享数据二个方法
      },
      substract(state){
        state.count--; // 参数共享数据属性
      },
      initialiseStore(state){
          // 检查local值 ,便于同步更新
          // if(localStorage.getItem("obj")){}
      }
    },
    getters: {
      optCount: function(state){
          return state.count;  // 返回共享数据
      }
    }
})

// 6. 创建一个自定义指令
Vue.directive("focus",{
    inserted(elem){
        elem.focus();
    }
})
// 引入localstorage
import {addStorage} from "./util/local";
Vue.prototype.$Store = {
    addStorage,
}
// 引入自定义的vueTouch
//import {vueTouch} from "./util/vueTouch";

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
