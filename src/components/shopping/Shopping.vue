<template>
  <div class="shopping">
  <i @click='back' class="iconfont icon-xiangyou1 back
"></i>
  	<tab></tab>
	<div class="shoplist" v-if="shoplists.length>0">
		<div class="item">
			<div class="address fbox">
				<span><i class="iconfont icon-zuobiao"></i>收货地址:</span>
				<div>北京学院路北京学院路北京学院路北京学院路北京学院路北京学院路北京学院路北京学院路</div>
			</div>
			<div class="list">
				<div class="shop">
					<a class="lbox" href="javascript:">
						<span>定制版</span>
		            	<img src="../../common/images/1.jpg">
		            </a>
		            <div class="rbox">
		            	<div class="ritem">
		            		<span class="name">武陵</span>
		            		<span class="vol">53%Vol</span>
		            	</div>
		            </div>
				</div>
			</div>
		</div>
	</div>
	<div class="shoplist no" v-else>
		<router-link to="/standard" tag="div" class="noshop">
			<i class="iconfont icon-gouwuche"></i>
			购物车暂无商品<br>
			去选选心仪的商品吧
		</router-link>
	</div>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import {getShopCartList} from 'api/shopcart'
import {comonfn} from 'common/js/mixin'
export default {
	mixins:[comonfn],
	data(){
		return {
			shoplists:[]
		}
	},
	created(){
		this._getShopCartList()
	},
	methods:{
		_getShopCartList(){
			getShopCartList().then((res)=>{
				this.shoplists = res.data
			})
		}
	},
	components:{
		Tab
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shoplist,
.shopping{
	display: block;
	position: fixed;
	top: 0.5rem;
	bottom: 0.8rem;
	width: 100%;
}
.shoplist{
	text-align: center;
	overflow: hidden;
}
.shoplist.no{
	background: #e5e5e5;
}
.noshop{
	display: inline-block;
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate3d(-50%,-50%,0);
	-ms-transform: translate3d(-50%,-50%,0);
	-o-transform: translate3d(-50%,-50%,0);
	transform: translate3d(-50%,-50%,0);
}
.noshop .icon-gouwuche{
	display: block;
	font-size: 1rem;
	color: #666;
}
.address{
	text-align: left;
	align-items: flex-start;
	justify-content: space-between;
	padding: 0.1rem;
	background: #fff;
	font-size: 0.2rem;
	border-bottom: 0.03rem solid #e5e5e5;
}
.address span{
	width: 30%;
}
</style>
