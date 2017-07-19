<template>
  <div class="swiper">
  	<div class="swiper-contain">
  		<slot></slot>
  	</div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      title: '我的武陵',
      isback:false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .swiper{
    display: block;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
  .swiper-contain{
    display: block;
    width: 300%;
  }
  .swiper-contain a{
    display: block;
    width: 33.33%;
    float: left;
  }
  .swiper-contain a img{
    display: block;
    width: 100%;
  }
</style>
