<template>
  <div class="detail">
  	<mheader :isback='isback' :title='title'></mheader>
  </div>
</template>

<script>
import Mheader from 'components/mheader/mheader'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      title: '标准产品详情',
      isback:true
    }
  },
  computed:{
    ...mapGetters([
        'shopid'
    ])
  },
  mounted(){
    this.$nextTick(()=>{
      console.log(this.shopid)
    })
  },
  components:{
  	Mheader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  background: #fff;
}
</style>
