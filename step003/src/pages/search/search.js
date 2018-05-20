import 'css/common.css'
import './search.css'

import Vue from 'vue';
import axiso from 'axios';
import url from 'js/api.js';
import qs from 'qs'

import mixin from 'js/mixin';

import Velocity from 'velocity-animate'

//解析参数
let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
    el:'.container',
    data:{
        searchList:null,
        keyword,
        // 回到顶部
        isShow:false
    },
    created(){
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            axiso.post(url.searchList,{keyword,id}).then(res=>{
                console.log(res)
                this.searchList = res.data.lists;
            })
        },
        move(){
            // 如果滚动距离超过100 就显示回到顶部
            console.log(document.body.scrollTop)
            if(document.body.scrollTop > 100){
                this.isShow = true;
            }else{
                this.isShow = false;
            }
        },
        toTop(){
            Velocity(document.body, "scroll", { duration: 1000 })
        }
    },
    // 引入混入对象
    mixins:[mixin]
})