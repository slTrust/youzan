import Address from 'js/addressService.js'
export default {
    data() {
      return {
        name: '',
        tel: '',
        provinceValue: -1,
        cityValue: -1,
        districtValue: -1,
        address: '',
        id: '',
        type: '',
        instance:'',
        addressData:require('js/address.json'),
        cityList:null,
        districtList:null,
      }
    },
    created() {
        let query = this.$route.query
        this.type = query.type;
        this.instance = query.instance;
        console.log(this.addressData)
    },
    methods:{
      add(){
        // 需要做合法性校验
        let {name,tel,provinceValue,cityValue,districtValue,address} = this;
        let data = {name,tel,provinceValue,cityValue,districtValue,address}
        if(this.type==='add'){
          Address.add(data).then(res=>{
            this.$router.go(-1)
          })
        }
      }
    },
    watch:{
      // 级联  省份切换  市对应切换
      provinceValue(val){
        if(val === -1) return 
        let list = this.addressData.list;
        let index = list.findIndex(item=>{
          return item.value === val
        })
        // 设置当前省对应的 市列表
        this.cityList = list[index].children;
        // 重置 市区
        this.cityValue = -1;
        this.districtValue = -1;
      },
      // 市 变化 
      cityValue(val){
        if(val === -1) return 
        let list = this.cityList;
        let index = list.findIndex(item=>{
          return item.value === val
        })
        // 设置当前省对应的 市列表
        this.districtList = list[index].children;
        this.districtValue = -1;
      }
    }
}