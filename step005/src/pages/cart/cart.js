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
        // 全选使用计算属性
        allSelected:{
            get(){
                // 购物车里的数据全部查询回来而且店铺为选中状态
                if(this.lists&&this.lists.length){
                    return this.lists.every(shop=>{
                        return shop.checked;
                    })
                }
                return false;
            },
            set(newVal){
                this.lists.forEach(shop=>{
                    shop.checked = newVal;
                    shop.goodsList.forEach(good=>{
                        good.checked = newVal;
                    })
                })
            }
        }
    },
    methods:{
        getList(){
            axios.post(url.cartLists).then(res=>{
                // this.lists = res.data.cartList;
                // this.lists.forEach(shop => {
                //     shop.goodsList.forEach(good =>{
                //         // 设置购物车里的商品为选中状态
                //         good.checked = true;
                //     })
                // });
                // 这样对数据后续进行添加字段checked的时候是无法响应到数据里的(深入响应式原理)

                let lists = res.data.cartList;
                lists.forEach(shop => {
                    // 设置店铺为选中状态(因为底下的商品都选中自然而然店铺也是选中的)
                    shop.checked = true;
                    shop.goodsList.forEach(good =>{
                        // 设置购物车里的商品为选中状态
                        good.checked = true;
                    })
                });
                this.lists = lists;
            })
        },
        // 选中商品
        selectGood(shop,good){
            good.checked = !good.checked;
            // 店铺的选中是根据它下面的商品是否都选中、
            shop.checked = shop.goodsList.every(good=>{
                return good.checked;
            })
        },
        // 选中店铺
        selectShop(shop){
            shop.checked = !shop.checked;
            shop.goodsList.forEach(good=>{
                good.checked = shop.checked;
            })
        },
        // 全选
        selectAll(){
            this.allSelected = !this.allSelected;
        }
        
    },
    mixins:[mixin]
})