<template>
  <div class="custom">
  	<mheader :isback='isback' :title='title'></mheader>
  </div>
</template>

<script>
import Mheader from 'components/mheader/mheader'
export default {
  data () {
    return {
      title: '客服',
      isback:true
    }
  },
  components:{
  	Mheader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
