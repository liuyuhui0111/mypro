<template>
  <div class="tab fbox">
  	<router-link tag="div" class="item" to="/standard">
  	<i class="iconfont icon-shouye"></i><br>
		<span>标准产品</span>
  	</router-link>
  	<router-link tag="div" class="item" to="/product">
  	<i class="iconfont icon-qiapianxingshi"></i><br>
		<span>私人定制</span>
  	</router-link>
  	<router-link tag="div" class="item" to="/shopping">
  	<i class="iconfont icon-gouwuche"></i><br>
		<span>购物车</span>
		<em v-if="shopnum>0" class="shopnum">{{setNum}}</em>
  	</router-link>
  	<router-link tag="div" class="item" to="/my">
  	<i class="iconfont icon-wode"></i><br>
		<span>我的武陵</span>
  	</router-link>
  </div>
</template>

<script>
import {getShopCartNum} from 'api/shopcart'
import {mapMutations} from 'vuex'
export default {
	data(){
		return {
			shopnum:0
		}
	},
 	created(){
 		this._getShopCartNum()
 	},
 	methods:{
 		_getShopCartNum(){
 			// let me = this
 			getShopCartNum().then((res)=>{
 				this.setShopCartNum = res.shopCartNum
 				this.shopnum = res.shopCartNum
 			})
 		},
 		...mapMutations({
 			setShopCartNum:'SET_SHOPCARTNUM'
 		})
 	},
 	computed:{
 		setNum(){
 			if(this.shopnum > 99){
 				return '99+'
 			}else{
 				return this.shopnum
 			}
 		}
 	}
 	

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.tab{
		height: .8rem;
		background: #333;
		color: #fff;
		justify-content: space-around;
		position: fixed;
		bottom: 0;
		width: 100%;
		
	}
	.tab .item{
		padding-top: 0.1rem;
		line-height: 0.3rem;
		display: block;
		width: 25%;
		text-align: center;
		position: relative;
	}
	.router-link-active{
		background: #e83c3a;
	}
	.iconfont{
		font-size: 0.4rem;
	}
	.shopnum{
		position: absolute;
		display: block;
		width: 0.3rem;
		height: 0.3rem;
		line-height: 0.3rem;
		background: #e83c3a;
		color: #fff;
		text-align: center;
		font-size: 0.16rem;
		right: 0.4rem;
		top: 0;
		border-radius: 0.3rem;
		font-style: normal;
		font-weight: bold;
	}
	.router-link-active .shopnum{
		background: #333;
		color: #fff;
	}
</style>
