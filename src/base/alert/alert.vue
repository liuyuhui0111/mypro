<template>
<transition name="tra">
	<div class="cbox">
		<div class="title">{{title}}
		<i @touchstart.stop="close" class="iconfont icon-guanbi1"></i>
		</div>
		<slot>提示信息</slot>
		<div class="btns fbox">
			<span @touchstart.stop="sub" class="sub">确定</span>
		</div>
	</div>
	</transition>	
</template>

<script>
	export default {
		props:{
			ismark:{
				type:Boolean,
				default:true
			},
			transtion:{
				type:Boolean,
				default:true
			},
			title:{
				type:String,
				default:"提示信息"
			}
		},
		methods:{
			sub(){
				this.$emit("sub")
			},
			cancel(){
				this.$emit("cancel")
			},
			close(){
				this.$emit("close")
			}
		}
	}
</script>

<style scoped>

	.cbox{
		position: fixed;
		width: 90%;
		display: block;
		top: 50%;
		left: 5%;
		-webkit-transform: translate3d(0,-50%,0);
		-ms-transform: translate3d(0,-50%,0);
		-o-transform: translate3d(0,-50%,0);
		transform: translate3d(0,-50%,0);
		background: rgba(0,0,0,0.9);
		color: #fff;
	}
	.title{
		display: block;
		position: relative;
		width: 100%;
		text-align: center;
		height: 0.4rem;
		line-height: 0.4rem;
		border-bottom: 0.01rem solid #333;
	}
	.icon-guanbi1{
		position: absolute;
		width: 0.4rem;
		height: 0.4rem;
		right: 0;
		top: 0;
	}
	.btns{
		text-align: center;
		justify-content: space-around;
		padding-bottom: 0.1rem;
	}
	.sub,.cancel{
		display: block;
		width: 2rem;
		height: 0.4rem;
		text-align: center;
		line-height: 0.4rem;
		color: #fff;
		background: #333;
	}
	.sub{
		background: #e83c3a;
	}
	.tra-enter-active, .tra-leave-active {
  transition: all 0.3s;
  -webkit-transform: translate3d(0,-50%,0);
		-ms-transform: translate3d(0,-50%,0);
		-o-transform: translate3d(0,-50%,0);
		transform: translate3d(0,-50%,0);
}
.tra-enter, .tra-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
  -webkit-transform: translate3d(0,-150%,0);
		-ms-transform: translate3d(0,-150%,0);
		-o-transform: translate3d(0,-150%,0);
		transform: translate3d(0,-150%,0);
}
</style>