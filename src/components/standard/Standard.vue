<template>
  <div class="standard">
  	<mheader :isback='isback' :title='title'></mheader>
    <div v-if="swipers.length">
      <swiper>
        <div v-for="item in swipers">
        <a :href="item.href">
          <img :src="item.src" alt="">
        </a>
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
import Mheader from 'components/mheader/mheader'
import Swiper from 'base/swiper/swiper'
import Loading from 'base/loading/loading'
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
  	Mheader,
    Loading
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
