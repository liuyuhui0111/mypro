<template>
	<div class="mheader">
	<i v-if='isback' @click='back' class="iconfont icon-xiangyou1 back
"></i>
		{{title}}
	<router-link tag="div" class="custom" to="/my/custom">
		<span><i class="iconfont icon-kefu"></i>客服</span>
  	</router-link>
	</div>
</template>

<script>
export default {
	props:{
		title:{
			type:String,
			default:'标准产品'
		},
		isback:{
			type:Boolean,
			default:false
		}
	},
	methods:{
		back(){
			this.$router.back()
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../common/font/iconfont.css';
.mheader{
	height: 0.5rem;
	line-height: 0.5rem;
	text-align: center;
	background: #333;
	color: #fff;
}
.back{
	position: absolute;
	left: 0;
	-webkit-transform: rotate(180deg);
	-ms-transform: rotate(180deg);
	-o-transform: rotate(180deg);
	transform: rotate(180deg);
	display: block;
	width: 0.5rem;
	text-align: center;
	font-size: 0.3rem;
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
