import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import mixin from 'js/mixin';

new Vue({
    el:'.container',
    data:{
        lists:null
    },
    created(){
        this.getList();
    },
    computed:{

    },
    methods:{
        getList(){
            axios.post(url.cartLists).then(res=>{
                this.lists = res.data.cartList
            })
        }
    },
    mixins:[mixin]
})