import 'css/common.css';
import './index.css';

import Vue from 'vue';
import axiso from 'axios';
import url from 'js/api.js';

import Foot from 'components/Foot.vue'

//按需引入
import { InfiniteScroll  } from 'mint-ui';
Vue.use(InfiniteScroll)

let app = new Vue({
    el:'#app',
    data:{
        lists:null, //最热商品数据
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoaded:false //是否全部加载
    },
    created(){
       this.getList();
    },
    methods:{
        getList(){
            if(this.allLoaded) return;
            this.loading  = true;
            axiso.post(url.hotLists,{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then((res)=>{
                let currentList = res.data.lists;
                //判断所有数据是否加载完毕
                if(currentList.length <this.pageSize){
                    this.allLoaded = true;
                }
                if(this.lists){
                    this.lists = this.lists.concat(currentList);
                }else{
                    //第一次请求数据
                    this.lists = currentList;
                }

                this.loading = false;
                this.pageNum++;
            })
        }
    },
    components:{
        Foot
    }
})