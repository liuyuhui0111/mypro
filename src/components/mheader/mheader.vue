<template>
	<div class="mheader">
		{{title}}
	<router-link tag="div" class="custom" to="/my/custom">
		<span><i class="iconfont icon-kefu"></i>客服</span>
  	</router-link>
	</div>
</template>

<script>
export default {
	data(){
		return {
			title:{
			type:String,
			default:''
			}
		}
	},
	created(){
		this.title = this.$route.name
	},
	watch:{
    '$route' (to, from) {
       this.title = this.$route.name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mheader{
	height: 0.5rem;
	line-height: 0.5rem;
	text-align: center;
	background: #333;
	color: #fff;
	position: fixed;
	top: 0;
	width: 100%;
	display: block;
}

.custom{
	position: absolute;
	display: block;
	right: 0;
	top: 0;
	width: 1rem;
}
.icon-kefu{
	font-size: 0.2rem;
	margin-right: 0.1rem;
}
</style>
