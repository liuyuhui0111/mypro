<template>
  <div class="tab fbox">
  	<router-link tag="div" class="item" to="/standard">
		<span>标准产品</span>
  	</router-link>
  	<router-link tag="div" class="item" to="/product">
		<span>私人定制</span>
  	</router-link>
  	<router-link tag="div" class="item" to="/shopping">
		<span>购物车</span>
  	</router-link>
  	<router-link tag="div" class="item" to="/my">
		<span>我的武陵</span>
  	</router-link>
  </div>
</template>

<script>
export default {
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tab{
		height: 50px;
		line-height: 50px;
		background: #333;
		color: #fff;
		justify-content: space-around;
		position: fixed;
		bottom: 0;
		width: 100%;
		font-size: 20px;
	}
	.tab .item{
		display: block;
		width: 25%;
		text-align: center;
	}
	.router-link-active{
		background: #e83c3a;
	}
</style>
