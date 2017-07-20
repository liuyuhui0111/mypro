<template>
	<div class="loading">
		<img src="./loading.gif">
		<p>{{title}}</p>
	</div>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'正在载入'
			}
		}
	}
</script>

<style scoped>
	.loading{
		width: 100%;
		text-align: center;
	}
	.loading img{
		display: block;
		width: 0.5rem;
		height: 0.5rem;
		margin: 0 auto;
	}
	.loading p{
		display: inline-block;
		text-align: left;
		font-size: 0.2rem;
	}
</style>