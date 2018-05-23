<template>
    <div class="container " style="min-height: 597px;">
        <!-- 地址存在则循环渲染 -->
        <div class="block-list address-list section section-first js-no-webview-block"
            v-if="lists&&lists.length">
            <!-- 默认地址isDefault -->
            <a class="block-item js-address-item address-item " 
                v-for="list in lists"   
                :key="list.id"             
                @click="toEdit(list)"
                :class="{'address-item-default':list.isDefault}"
            >
                <div class="address-title">{{list.name}} {{list.tel}}</div>
                <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
                <a class="address-edit" href="javascript:;"></a>
            </a>
          
        </div>
        <!-- 没有地址给予提示 -->
        <div  v-if="lists&&!lists.length">
            没有地址，请添加
        </div>
        <div class="block stick-bottom-row center">
            <!-- 标签式导航  to="/address/form" -->
            <!-- 传递参数的方式 :to="{name:'form',query:{type:'add'}}" -->
            <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
                :to="{name:'form',query:{type:'add'}}">
                新增地址
            </router-link>
        </div>
    </div>
</template>

<script>
    import Address from 'js/addressService.js'
    export default{
        data(){
            return {
                lists:null
            }
        },
        created(){
            Address.list().then(res=>{
                this.lists = res.data.lists
            })
        },
        methods:{
            toEdit(list){
                // 每个子组件都可以通过 this.$router拿到注入的路由
                // this.$router.push({path:'/address/form'})
                
                // 编程式 携带参数导航
                this.$router.push(
                    {   
                        name:'form',
                        query:{
                            type:'edit',
                            instance:list
                        }
                    })
            }
        }
    }
</script>

