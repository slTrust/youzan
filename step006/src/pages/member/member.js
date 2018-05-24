import './member.css'
import Vue from 'vue';
import Router from 'vue-router';

// 使用路由
Vue.use(Router);

let routes = [
    {
        path:'/',
        component:require('./components/member.vue')
    },
    {
        path:'/address',
        component:require('./components/address.vue'),
        children:[
            // 地址默认查看的是列表  所有要有个  空path指向地址列表页面all
            // {
            //     path:'',
            //     component:require('./components/all.vue'),
            // },

            // 还可以重定向的方式  展示列表页面
            {
                path:'',
                // component:require('./components/all.vue'),
                redirect:'all'
            },
            // 地址列表
            {
                path:'all',
                name:'all',
                component:require('./components/all.vue'),
            },
            // 地址编辑表单  新增和编辑
            {
                path:'form',
                name:'form',
                component:require('./components/form.vue'),
            }
            
        ]
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

