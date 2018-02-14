<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists">
                <a class="js-no-follow" :href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.css'
    export default {
        name:'swipe',
        // props:['lists'],
        props:{
            lists:{
                // type:Array,
                require:true
            },
            name:{}
        },
        created(){
        },
        mounted(){
            var mySwiper = new Swiper ('.swiper-container', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            })
        },
        // watch:{
        //     //监听lists的值
        //     lists(val,oldVal){
        //         console.log(val,oldVal);
        //         console.log('before nextTick',document.querySelector('.swiper-slide'))
        //         this.$nextTick(()=>{
        //             console.log('nextTick',document.querySelector('.swiper-slide'))
        //         })
        //     }
        // }
    }
</script>

<style>
    .swiper-slide img{
        width:100%;
        height: 100%;
    }
</style>