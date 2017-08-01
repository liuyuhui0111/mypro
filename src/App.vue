<template>
  <div id="app">
  <mheader></mheader>
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Mheader from 'components/mheader/mheader'
export default {
  components:{
    Mheader
  }
}
</script>

<style>
@import './common/css/reset.css';
@import './common/font/iconfont.css';
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-size: .2rem;
  padding:0 0 0.8rem 0;
  box-sizing:border-box;
}
.iconfont{
  font-size: 0.2rem;
}
</style>
