import 'css/common.css'
import './search.css'

import Vue from 'vue';
import axiso from 'axios';
import url from 'js/api.js';
import qs from 'qs'
// 加载组件
import Foot from 'components/Foot.vue'

//解析参数
let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
    el:'.container',
    data:{
        searchList:null,
        keyword
    },
    created(){
        console.log(this.keyword)
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            axiso.post(url.searchList,{keyword,id}).then(res=>{
                console.log(res)
                this.searchList = res.data.lists;
            })
        }
    }
})