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
        lists:null,
        total:0,//总价
        editingShop:null,
        editingShopIndex:-1
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
        },
        // 全部删除的计算属性
        allRemoveSelected:{
            get(){
                if(this.editingShop){
                    return this.editingShop.removeChecked;
                }
                return false;
            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal;
                    this.editingShop.goodsList.forEach(item=>{
                        item.removeChecked = newVal
                    })
                }
                return false;
            }
        },
        // 结算时选中的商品和个数
        selectLists(){
            if(this.lists&&this.lists.length){
                let arr = [];
                let total = 0;
                this.lists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total;
                return arr;
            }
            return []
        },
        // 删除操作的商品个数
        removeLists(){
            if(this.editingShop){
                let arr = [];
                this.editingShop.goodsList.forEach(good=>{
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
                return arr;
            }
            return []
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
                    // 店铺的可编辑状态 默认是不可以编辑的
                    shop.editing = false;
                    shop.editingMsg = '编辑';
                    // 店铺删除时的状态
                    shop.removeChecked = false;

                    shop.goodsList.forEach(good =>{
                        // 设置购物车里的商品为选中状态
                        good.checked = true;
                        // 设置店铺里商品的删除状态
                        good.removeChecked = false;
                    })
                });
                this.lists = lists;
            })
        },
        // 选中商品
        selectGood(shop,good){
            // 根据编辑状态来设置  是删除/选中的操作
            let attr = this.editingShop ?'removeChecked':'checked';
            good[attr] = !good[attr];
            // 店铺的选中是根据它下面的商品是否都选中、
            shop[attr] = shop.goodsList.every(good=>{
                return good[attr];
            })
        },
        // 选中店铺
        selectShop(shop){
            // 根据编辑状态来设置  是删除/选中的操作
            let attr = this.editingShop ?'removeChecked':'checked';
            shop[attr] = !shop[attr];
            shop.goodsList.forEach(good=>{
                good[attr] = shop[attr];
            })
        },
        // 全选
        selectAll(){
            // 根据编辑状态来设置  是删除/选中的操作
            let attr = this.editingShop ?'allRemoveChecked':'allSelected';
            this[attr] = !this[attr];
        },
        // 店铺的编辑
        edit(shop,shopIndex){
            // 当前店铺可编辑
            shop.editing = !shop.editing;
            shop.editingMsg = shop.editing?'完成':'编辑';
            // 其他店铺不可编辑
            this.lists.forEach((item,idx)=>{
                if(shopIndex!==idx){
                    item.editing = false;
                    item.editingMsg = shop.editing?'':'编辑';
                }
            })
            this.editingShop = shop.editing?shop:null;
            this.editingShopIndex = shop.editing?shopIndex:-1;
        },
        // 减少商品
        reduce(good){
            if(good.number===1) return 
            // 数据库里先查询还有没有货然后在进行 增加
            axios.post(url.cartReduce,{id:good.id,number:1}).then(res=>{
                good.number--
            })
        },
        // 增加商品
        add(good){
            // 数据库里先查询还有没有货然后在进行 增加
            axios.post(url.cartAdd,{id:good.id,number:1}).then(res=>{
                good.number++
            })
        }
        
    },
    mixins:[mixin]
})