<template>
  <div class="standard">
    <mheader :isback='isback' :title='title'></mheader>
  </div>
</template>

<script>
import Mheader from 'components/mheader/mheader'
export default {
  data () {
    return {
      title: '私人定制',
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
