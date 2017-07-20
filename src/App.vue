<template>
  <div id="app">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
    <tab></tab>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
export default {
  name: 'app',
  data(){
    return{
      title:''
    }
  },
  components:{
    Tab
  }
}
</script>

<style>
@import './common/css/reset.css';
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  font-size: .2rem;
  padding-bottom: 0.5rem;
  box-sizing:border-box;
}
</style>
