<template>
  <div class="shopping">
  <i @click='back' class="iconfont icon-xiangyou1 back
"></i>
  	<tab></tab>
	<div class="shoplist" v-if="shoplists.length>0">
		<div class="topbtns">
			<span class="editads">编辑地址</span>
			<span class="del">删除</span>
		</div>
		<scroll :data="shoplists" class="scroll" ref="scroll">
		<div>
		<div v-for="item in shoplists" :ref="item.lineid" :data-id="item.lineid" class="item">
			<div v-if="item.address" :data-id="item.address.adsid" class="address fbox">
				<span><i class="iconfont icon-zuobiao"></i>收货地址:</span>
				<div>{{item.address.mes}}</div>
			</div>
			<div class="list">
				<div :ref="shop.scartid" v-for="shop in item.shoplist" class="shop fbox">
					<div class="lbox" href="javascript:">
						<i @touchstart="shop.ischk = !shop.ischk" :data-id="shop.scartid" class="iconfont" :class="[{'icon-yuanxingweixuanzhong' : !shop.ischk},{'icon-yuanxingxuanzhong' : shop.ischk}]"></i>
		            	<a :href="shop.href"><img v-lazy="shop.src"></a>
		            </div>
		            <div class="rbox">
		            	<div class="type">{{shop.shopType}}</div>
		            	<div class="ritem fbox">
		            		<span class="name">{{shop.name}}</span>
		            		<span class="vol">{{shop.vol}}%Vol</span>
		            	</div>
		            	<div v-if="shop.product" class="dztitle ellipsis"><i class="iconfont icon-dingzhi"></i>{{shop.product.proTitle}}</div>
		            	<div v-if="shop.product" class="dztext ellipsis"><i class="iconfont icon-wenben1"></i>{{shop.product.proText}}</div>
		            	<div v-if="shop.boxcolor.length>0" class="boxcolor fbox">
		            	<span>礼盒颜色:黑色</span>
		            	<span class="cr_r">选颜色</span>
		            	</div>
		            	<div class="price fbox">
		            		<span class="cr_r">&yen;{{shop.price}}</span>
		            		<btnnum @change="getnum" :val="shop.num" :dataId="shop.scartid"></btnnum>	
		            	</div>
		            </div>
				</div>
			</div>
		</div>
		</div>
		</scroll>
		<div class="footbtns fbox">
			<div class="lfbox fbox">
			<span class="chkall"><i class="iconfont icon-yuanxingweixuanzhong"></i>
			全选</span>
			<div class="gobuyNum">
				合计:&yen;0 <br>
				共:0瓶	
			</div>
			</div>
			<div class="gobuy">
				去结算<span>(0)</span>
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
import {comonfn,standard} from 'common/js/mixin'
import Scroll from 'base/scroll/scroll'
export default {
	mixins:[comonfn,standard],
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
				console.log(this.shoplists)
			})
		},
		ischkd(id){
			console.log(id)
			return false
		}
	},
	components:{
		Tab,
		Scroll
	},
	computed:{
		
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll,
.shoplist,
.shopping{
	display: block;
	position: fixed;
	top: 0.5rem;
	bottom: 0.8rem;
	width: 100%;
}
.scroll,
.shoplist{
	text-align: center;
	overflow: hidden;
}
.scroll{
	top: 0.8rem;
	bottom: 1.3rem;
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
	justify-content: flex-start;
	padding: 0.1rem;
	background: #fff;
	font-size: 0.2rem;
	border-bottom: 0.03rem solid #e5e5e5;
}
.address span{
	width: 30%;
	margin-right: 0.1rem;
}
.shop{
	justify-content: space-between;
	align-items: center;
	width: 100%;
	box-sizing:border-box;
	padding: 0.1rem 0.2rem;
	border-bottom: 0.03rem solid #e5e5e5;
}
.lbox{
	position: relative;
	padding: 0 0.3rem;
	width: 40%;
	box-sizing:border-box;
}
.lbox img{
	width: 100%;
	height: auto;
}
.lbox .iconfont{
	position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.26rem;
    top: 50%;
    left: -0.2rem;
	-webkit-transform: translate3d(0,-50%,0);
	-ms-transform: translate3d(0,-50%,0);
	-o-transform: translate3d(0,-50%,0);
	transform: translate3d(0,-50%,0);
}
.rbox{
	text-align: left;
	width: 60%;
	box-sizing:border-box;
	line-height: 1.8;
}
.type{
	background: #e83c3a;
	color: #fff;
	width: 1rem;
	text-align: center;
}
.boxcolor{
	justify-content: space-between;
}
.ritem{
	justify-content: flex-start;
	align-items: flex-start;
}
.ritem .name{
	display: inline-block;
	max-width: 2.8rem;
	margin-right: 0.1rem;
}
.icon-dingzhi,.icon-wenben1{
	margin-right: 0.1rem;
}
.boxcolor{
	color: #999;
}
.cr_r{
	font-weight: bold;
}
.boxcolor .cr_r{
	display: inline-block;
	width: 1rem;
	text-align: right;
}
.topbtns{
	position: fixed;
	top: 0.5rem;
	width: 100%;
	height: 0.3rem;
	line-height: 0.3rem;
	text-align: right;
	z-index: 11;
}
.topbtns span{
	display: inline-block;
	width: 1rem;
	text-align: center;
	background: #e83c3a;
	color: #fff;
	margin-right: 0.5rem;
}
.footbtns{
	position: fixed;
	bottom: 0.8rem;
	height: 0.5rem;
	line-height: 0.5rem;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	box-sizing:border-box;
	padding-left:0.16rem;
}
.lfbox{
	width: 50%;
	align-items: center;
}
.chkall{
	display: block;
	margin-right: 0.5rem;
}
.chkall .iconfont{
	font-size: 0.26rem;
}
.gobuyNum{
	text-align: left;
	line-height: 0.25rem;
}
.gobuy{
	height: 100%;
	background: #e83c3a;
	color: #fff;
	text-align: center;
	width: 1.6rem;
}
</style>
