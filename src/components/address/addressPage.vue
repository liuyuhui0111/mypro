<template>
  <div class="addressBox">
    <i @click='back' class="iconfont icon-xiangyou1 back
"></i>
 
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getAddress,editAddress,addAddress} from 'api/address'
import {comonfn} from 'common/js/mixin'
export default {
  mixins:[comonfn],
  data(){
    return {
      addresslist:[]
    }
  },
  created(){  
    this._getAddress()
  },
  computed:{
  },
  components:{
  },
  mounted(){
    this.$nextTick(()=>{
      
    })
  },
  methods:{
    _getAddress(){
      getAddress().then((res)=>{
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.addressBox{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
}

</style>
