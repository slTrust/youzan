
import Vue from 'vue';
import Router from 'vue-router';

// 使用路由
Vue.use(Router);

let routes = [
    {
        path:'/',
        component:require('./components/member.vue')
    }
];

// 创建路由实例
let router = new Router({
    routes
})

// 根组件的注入

new Vue({
    el:'#app',
    router
})

