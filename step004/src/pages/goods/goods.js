import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
// 加载定义的动画
import './goods_transition.css'

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin';
import qs from 'qs'
import Swiper from 'components/Swiper.vue'
// 加载组件
let {id} = qs.parse(location.search.substr(1))
// 商品详情和 本店成交 选项卡
let detailTab = ['商品详情','本店成交']
new Vue({
    el:'#app',
    data:{
        details:null,
        detailTab,
        tabIndex:0,
        dealLists:null,//成交记录
        bannerLists:null,
        skuType:1,
        showSku:false,//弹出层
    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.post(url.details,{id}).then(res=>{
                this.details = res.data.data;
                this.bannerLists = [];
                this.details.imgs.forEach(item => {
                    this.bannerLists.push({
                        clickUrl:'',
                        image:item
                    }) 
                });
                console.log(this.bannerLists)
            })
        },
        changeTab(index){
            this.tabIndex = index;
            if(index){
                this.getDeal()
            }
        },
        getDeal(){
            axios.post(url.deal,{id}).then(res=>{
                this.dealLists = res.data.data.lists;
            })
        },
        chooseSku(type){
            this.skuType = type;
            this.showSku = true;
        }
    },
    //弹出层出现的时候禁止内容区域滚动
    watch:{
        showSku(val,oldVal){
            document.body.style.overflow = val?'hidden':'auto';
            document.querySelector('html').style.overflow = val?'hidden':'auto';    
            document.body.style.height = val?'100%':'auto';
            document.querySelector('html').style.height = val?'100%':'auto';    
        }
    },
    mixins:[mixin],
    components:{
        Swiper
    }
})