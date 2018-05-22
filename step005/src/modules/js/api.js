let url = {
    hotLists:'/index/hotList',  //首页最热商品推荐
    banner:'/index/banner',  //首页轮播
    
    //category
    topList:'/category/topList',
    // category二级分类
    subList:'/category/subList',
    rank:'/category/rank',
    // search搜素接口
    searchList:'/search/list',
    // 商品详情
    details:'/goods/details',
    // 成交记录
    deal:'/goods/deal',
    // 加入购物车
    addCart:'/cart/add',
    // 购物车模块
    cartLists:'/cart/list',
    cartReduce:'/cart/reduce',
    cartRemove:'/cart/remove',
    // 删除多个
    cartMremove:'/cart/mremove' 
}

//开发环境和真实环境的切换
let host = 'http://rapapi.org/mockjsdata/24170'

for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]; 
    }
}

export default url