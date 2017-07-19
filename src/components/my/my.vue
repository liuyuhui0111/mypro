<template>
  <div class="standard">
  	<mheader :isback='isback' :title='title'></mheader>
  </div>
</template>

<script>
import Mheader from 'components/mheader/mheader'
// import axios from 'axios'
export default {
  data () {
    return {
      title: '我的武陵',
      isback:false
    }
  },
  components:{
  	Mheader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
