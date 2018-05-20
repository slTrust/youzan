import 'css/common.css';
import './category.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin';

new Vue({
    el:'#app',
    data:{
        topLists:null,
        topIndex:0,
        //其他分类的数据
        subData:null,
        //综合排行
        rankData:null,
    },
    created(){
        this.getTopList();
        this.getSubList(0);
    },
    mounted(){},
    methods:{
        // nav标签数据
        getTopList(){
            axios.post(url.topList).then(res=>{
                this.topLists = res.data.lists;
                console.log(axios)
                console.log(this.topLists)
            })
        },
        // 获取nav子列表数据  综合排行是第一个要单独处理
        getSubList(index,id){
            this.topIndex = index;
            if(index===0){
                this.getRank();
            }else{
                axios.post(url.subList,{id}).then(res=>{
                    this.subData = res.data.data;
                })
            }
        },
        // 综合排行的数据
        getRank(){
            axios.post(url.rank).then(res=>{
                this.rankData = res.data.data;
            })
        },
        toSearch(list){
            // 传递keyword和id
            location.href = `search.html?keyword=${list.name}&id=${list.id}`;
        }
    },
    // 引入混入对象
    mixins:[mixin]
})