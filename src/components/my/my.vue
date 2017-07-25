<template>
  <div class="my">
    <router-view></router-view> 
    <tab></tab>
  </div>
 
</template>

<script>
import Tab from 'components/tab/tab'
export default {
	components:{
		Tab
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
