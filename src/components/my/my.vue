<template>
  <div class="standard">
  	<mheader :isback='isback' :title='title'></mheader>
  </div>
</template>

<script>
import Mheader from 'components/mheader/mheader'
import axios from 'axios'
export default {
  data () {
    return {
      title: '我的武陵',
      isback:false
    }
  },
  components:{
  	Mheader
  },
  created(){
    console.log(1)

  axios.get("http://localhost:8080/static/data.json")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
