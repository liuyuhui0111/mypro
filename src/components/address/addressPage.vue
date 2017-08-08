<template>
  <div class="addressBox">
    <i @click='back' class="iconfont icon-xiangyou1 back
"></i>
  <scroll class="scroll" :data="addresslist">
    <div>
    <ul class="addresslist">
      <li v-for="item in addresslist">
        <div class="user fbox">
          <span>{{item.lxrname}}</span>
          <span>{{item.lxrtel}}</span>
        </div>
        <div class="ads fbox">
          <span v-if="item.ismr" class="mrdz">[默认地址]</span>
          <p>{{item.prov}}{{item.city}}{{item.area}}{{item.address}}</p>
        </div>
        <div class="btns fbox">
          <span @touchstart.stop="edit(item)" class="edit"><i class="iconfont icon-bianji"></i>编辑</span>
          <span class="del"><i class="iconfont icon-shanchu"></i>删除</span>
        </div>
      </li>
    </ul>
    </div>
  </scroll>
  <span @touchstart.stop="addAds" class="com_btn_sub addAds">添加新地址</span>

  <router-view></router-view>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getAddress,editAddress,addAddress} from 'api/address'
import {comonfn} from 'common/js/mixin'
export default {
  beforeRouteEnter (to, from, next) {
    next()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  beforeRouteLeave (to, from, next) {
    getAddress().then((res)=>{
        this.addresslist = res.data
        next()
      })
  },
  mixins:[comonfn],
  data(){
    return {
      addresslist:[],
      isgo:true,
      isshowEdit:false,
      adsitem:{},
      adstitle:"添加地址"
    }
  },
  created(){  
    this._getAddress()
  },
  computed:{
  },
  components:{
    Scroll
  },
  mounted(){
    this.$nextTick(()=>{
      
    })
  },
  methods:{
    _getAddress(){
      getAddress().then((res)=>{
        this.addresslist = res.data
      })
    },
    addAds(){
      this.$router.push({
        path:'/address/addAddress'  
      })
    },
    edit(item){
      this.$router.push({
        path:`/address/editAddress?id=${item.id}`  
      })
      console.log(item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll{
  position: fixed;
  display: block;
  width: 100%;
  top: 0.5rem;
  bottom: 0.5rem;
  overflow: hidden;
}
.addressBox{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0.5rem;
  left: 0;
  background: #fff;
}
.addresslist li{
  display: block;
  width: 100%;
  box-sizing:border-box;
  padding: 0.1rem;
  border-bottom: 0.1rem solid #ccc;
  line-height: 1.8;
}
.user{
  justify-content: space-between;
}
.mrdz{
  color: #e83c3a;
  margin-right: 0.1rem;
  flex-shrink: 0;
}
.ads{
  border-bottom: 0.01rem solid #333;
  padding-bottom: 0.1rem;
}
.ads p{
  text-align: justify;
}
.addresslist li .btns{
  justify-content: flex-end;
}
.btns span{
  display: block;
  width: 1rem;
  padding: 0.1rem 0;
}
.addAds{
  position: fixed;
  bottom: 0.05rem;
  left: 20%;
}
</style>
