<template>
  <div id="app">
  <mheader></mheader>

  <keep-alive>
    <router-view></router-view>
  </keep-alive>
    <tab></tab>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import Mheader from 'components/mheader/mheader'
export default {
  components:{
    Tab,
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
