<template>
  <div id="app">
    <router-view></router-view>
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
}
</style>
