<template>
  <div class="standard">
  	<mheader :isback='isback' :title='title'></mheader>
    <div>
      <swiper>
        <a v-for="item in swipers" :href="`${item.href}?id=${item.id}`">
          <img :src="item.src" alt="">
        </a>
      </swiper>
    </div>
  </div>
</template>

<script>
import Mheader from 'components/mheader/mheader'
import Swiper from 'base/swiper/swiper'
import {getSwiperData} from 'api/standard'
export default {
  data () {
    return {
      title: '标准产品',
      isback:false,
      swipers:[]
    }
  },
  components:{
    Swiper,
  	Mheader
  },
  created(){
    this._getSwiper()
  },
  methods:{
    _getSwiper(){
      getSwiperData().then((res)=>{
      this.swipers = res.data
       }).catch((err)=>{
          console.log(err)
       })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
