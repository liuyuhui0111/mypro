<template>
  <div class="editAds">
  	<div class="title">
  		收货人信息
  	</div>
	<input type="text" v-model.trim="curData.shrname" placeholder="收货人姓名">
	<input type="text" v-model.num="curData.shrtel" placeholder="收货人电话">
	<div class="title">
  		收货地址信息
  	</div>
	<div class="adslist fbox">
		<div class="prov">
			<ul>
				<li>请选择省</li>
			</ul>
		</div>
		<div class="city">
			<ul>
				<li>请选择市</li>
			</ul>
		</div>
		<div class="area">
			<ul>
				<li>请选择区域</li>
			</ul>
		</div>
	</div>
	<textarea placeholder="请输入详细地址"></textarea>
	<div class="mes">请留下联系方式，如遇订单问题，客服会第一时间与您联系</div>
	<div class="title">
		联系人信息  <i class="iconfont icon-fangxingxuanzhong"></i> 同收货人信息
	</div>
	<input type="text" v-model.trim="curData.lxrname" placeholder="联系人姓名">
	<input type="text" v-model.num="curData.lxrtel" placeholder="联系人电话">
	
  </div>
</template>

<script>
export default {
	props:{
		data:{
			type:Object,
			default:{}
		}
	},
	data(){
		return {
			curData:{
				shrname:"收货人",
				shrtel:"",
				lxrname:"",
				lxrtel:""
			}
		}
	}
	,
	created(){
		console.log(this.$route.query)
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editAds{
	position: fixed;
	background: #fff;
	top: 0.5rem;
	left: 0;
	bottom:0;
	width: 100%;
}
</style>
