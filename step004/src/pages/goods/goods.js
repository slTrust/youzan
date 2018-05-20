import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin';
import qs from 'qs'
// 加载组件
let {id} = qs.parse(location.search.substr(1))
// 商品详情和 本店成交 选项卡
let detailTab = ['商品详情','本店成交']
new Vue({
    el:'#app',
    data:{
        details:null,
        detailTab,
        tabIndex:0
    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.post(url.details,{id}).then(res=>{
                console.log(res.data.data)
                this.details = res.data.data;
            })
        },
        changeTab(index){
            this.tabIndex = index;
        }
    },
    mixins:[mixin]
})