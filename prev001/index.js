let url = 'http://rapapi.org/mockjsdata/23334/index/hotList'
//请求这个模块   
let axios = require('axios')

axios.get(url,{
  pageNum: 1,
  pageSize: 10
}).then(res=>{
  console.log(res.data.lists)
})

let Mock = require('mockjs')
console.log(Mock.mock({
  "number|1-100.2": 1
}))


