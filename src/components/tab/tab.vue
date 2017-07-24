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
		<em>{{setNum}}</em>
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
			shopnum:1
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
 		}
 	},
 	computed:{
 		setNum(){
 			if(this.shopnum > 99){
 				return '99+'
 			}else{
 				return this.shopnum
 			}
 		}
 	},
 	...mapMutations({
 		setShopCartNum:'SET_SHOPCARTNUM'
 	})

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
	}
	.router-link-active{
		background: #e83c3a;
	}
	.iconfont{
		font-size: 0.4rem;
	}
</style>
