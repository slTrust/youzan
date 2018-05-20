let url = {
    hotLists:'/index/hotList',  //首页最热商品推荐
    banner:'/index/banner',  //首页轮播
    
    //category
    topList:'/category/topList',
    // category二级分类
    subList:'/category/subList',
    rank:'/category/rank'
}

//开发环境和真实环境的切换
let host = 'http://rapapi.org/mockjsdata/24170'

for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]; 
    }
}

export default url