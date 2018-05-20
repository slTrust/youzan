import 'css/common.css'
import './search.css'

import Vue from 'vue';
import axiso from 'axios';
import url from 'js/api.js';
import qs from 'qs'

import mixin from 'js/mixin';

import Velocity from 'velocity-animate'

//按需引入
import { InfiniteScroll  } from 'mint-ui';
Vue.use(InfiniteScroll)

//解析参数
let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
    el:'.container',
    data:{
        // 搜索列表
        searchList:null,
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoaded:false, //是否全部加载
        // 搜索关键词
        keyword,
        // 回到顶部
        isShow:false,
       
    },
    created(){
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            if(this.allLoaded) return;
            this.loading  = true;
            axiso.post(url.searchList,{keyword,id}).then((res)=>{
               
                let currentList = res.data.lists;
                //判断所有数据是否加载完毕
                if(currentList.length <this.pageSize){
                    this.allLoaded = true;
                }
                if(this.searchList){
                    this.searchList = this.searchList.concat(currentList);
                }else{
                    //第一次请求数据
                    this.searchList = currentList;
                }

                this.loading = false;
                this.pageNum++;
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