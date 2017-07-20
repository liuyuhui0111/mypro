<template>
  <div class="standard">
  	<mheader :isback='isback' :title='title'></mheader>
    <div class="swiper-box" v-if="swipers.length">
      <swiper ref="swiper">
        <div v-for="item in swipers">
        <a :href="item.href">
          <img :src="item.src">
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
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": "fetchDate"
  },
  methods:{
    _getSwiper(){
      getSwiperData().then((res)=>{
      this.swipers = res.data
       }).catch((err)=>{
          console.log(err)
       })
    },
    fetchDate(){
      this.$refs.swiper.refresh()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .swiper-box{
    width: 100%;
    min-height: 1px;
  }
</style>
