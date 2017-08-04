<template>
  <div class="shopping" @touchstart="blurInp">
  <i @click='back' class="iconfont icon-xiangyou1 back
"></i>
  	<tab></tab>
	<div class="shoplist" v-if="shoplists.length>0">
		<div class="topbtns">
			<router-link tag="span" to="/address" class="editads">编辑地址</router-link>
			<span class="del" @touchstart="delshowfn">删除</span>
		</div>
		<scroll @scroll="getPagePos" :listenScroll="isScroll" :data="shoplists" class="scroll" ref="scroll">
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
		            		<div class="numbtns">
			                <div @touchstart="del(shop)" class="iconfont icon-jianhao"></div>
			                <input @change="checkNum(shop)" v-model.number="shop.num" type="text">
			                <div @touchstart="add(shop)" class="iconfont icon-jiahao1"></div>
			              </div>	
		            	</div>
		            </div>
				</div>
			</div>
		</div>
		</div>
		</scroll>
		<div class="footbtns fbox">
			<div class="lfbox fbox">
			<span @touchstart="ischkAll=!ischkAll" class="chkall"><i class="iconfont" :class="[{'icon-yuanxingxuanzhong' : ischkAll},{'icon-yuanxingweixuanzhong' : !ischkAll}]"></i>
			全选</span>
			<div class="gobuyNum">
				合计:&yen;{{isAllPrice}} <br>
				共:{{isAllNum}}瓶	
			</div>
			</div>
			<div @touchstart.stop="gobuy" class="gobuy">
				去结算<span>({{isAllNum}})</span>
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
	<confirm @sub="delsub" @close="delclose" @cancel="delcancel" v-show="delshow">
		<div class="delmes">确定要删除选中商品么?</div>
	</confirm>
	<alert @sub="hidealert" @close="hidealert" v-show="isalert">
		<div class="delmes">没有选中商品</div>
	</alert>
	<router-view></router-view>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import Confirm from 'base/confirm/confirm'
import Alert from 'base/alert/alert'
import {getShopCartList} from 'api/shopcart'
import {mapMutations,mapActions,mapGetters} from 'vuex'
import {comonfn} from 'common/js/mixin'
import Scroll from 'base/scroll/scroll'
export default {
	mixins:[comonfn],
	components:{
		Tab,
		Scroll,
		Confirm,
		Alert
	},
	data(){
		return {
			shoplists:[],
			ischkAll:true,
			min:1,
			max:Number.MAX_VALUE,
			delshow:false,
			isalert:false,
			gobuynum:0,
			isScroll:true,
			pagey:0
		}
	},
	created(){
		this._getShopCartList()
	},
	computed:{
		...mapGetters([
	      'shopCartPageY'
    	]),
		isAllNum(){
			return this.getAllNum()
		},
		isAllPrice(){
			return this.getAllPrice()
		}
	},
	watch:{
		ischkAll() {
			this._chkall()
		},
	    $route () {
		    this._getShopCartList()
			this.$refs.scroll.scrollTo(0,this.shopCartPageY,0)
	    }
	},
	mounted(){
	},
	methods:{
		_getShopCartList(){
			getShopCartList().then((res)=>{
				this.shoplists = res.data
				this._setShopCartNum()
			})
		},
		delshowfn(){
			if(this.isAllNum>0){
				this.delshow = true
			}else{
				this.isalert = true
			}
		},
		getPagePos(pos){
			this.pagey = pos.y
			this.setShopPageY(this.pagey)
		},
		del(item){
	      item.num -= 1
	      this.checkNum(item)
	    },
	    checkNum(item){
	      if(item.num<this.min){
	        item.num = this.min
	      }
	      if(item.num>this.max){
	        item.num = this.max
	      }
	      this._setShopCartNum()
	    },
	    gobuy(){
	    	if(this.isAllNum<1){
				this.isalert = true
			}else{
				console.log("去结算页面")
			}
	    },
	    add(item){
	      item.num += 1
	      this.checkNum(item)
	    },
	    _setShopCartNum(){
	    	let shops = this.shoplists
	    	let num = 0
	    	for (let i = 0; i < shops.length; i++) {
	    		let obj = shops[i].shoplist
	    		for (let j = 0; j < obj.length; j++) {
	    			num += obj[j].num
	    		}
	    	}
	    	console.log(num)
	    	this.setShopNum(num)
	    },
	    delsub(){
	    	
	    	let shops = this.shoplists
	    	let num = 0
	    	for (let i = 0; i < shops.length; i++) {
	    		let obj = shops[i].shoplist
	    		for (let j = 0; j < obj.length; j++) {
	    			if(obj[j].ischk){
	    				obj.splice(j,1)
	    				j -= 1
	    			}
	    		}
	    		if(obj.length<1){
	    			shops.splice(i,1)
	    			i -= 1
	    		}
	    	}
	    	this.shoplists = shops
	    	this.$refs.scroll.refresh()
	    	this._setShopCartNum()
	    	this.delshow=false
	    },
	    delcancel(){
	    	console.log("cancel")
	    	this.delshow=false
	    },
	    hidealert(){
	    	this.isalert=false
	    },
	    delclose(){
	    	console.log("close")
	    	this.delshow=false
	    },
	    blurInp(){
	        let inp = this.$el.querySelectorAll("input")
	        for (var i = 0; i < inp.length; i++) {
	          inp[i].blur()
	        }
    	},
	    getAllNum(){
	    	let shops = this.shoplists
	    	let num = 0
	    	for (let i = 0; i < shops.length; i++) {
	    		let obj = shops[i].shoplist
	    		for (let j = 0; j < obj.length; j++) {
	    			if(obj[j].ischk){
	    				num += obj[j].num
	    			}
	    		}
	    	}
	    	this.gobuynum = num
	    	return num
	    },
	    _chkall(){
	    	let shops = this.shoplists
	    	for (var i = 0; i < shops.length; i++) {
	    		let obj = shops[i].shoplist
	    		for (let j = 0; j < obj.length; j++) {
	    			obj[j].ischk = this.ischkAll
	    		}
	    	}
	    },
	    getAllPrice(){
	    	let shops = this.shoplists
	    	let price = 0
	    	for (var i = 0; i < shops.length; i++) {
	    		let obj = shops[i].shoplist
	    		for (let j = 0; j < obj.length; j++) {
	    			if(obj[j].ischk){
	    				price += obj[j].num*obj[j].price
	    			}
	    		}
	    	}
	    	return price.toFixed(2)
	    },
	    ...mapMutations(
	       { setShopNum:'SET_SHOPCARTNUM'}
	    ),
	    ...mapMutations(
	       { setShopPageY:'SET_SHOPCARTPAGEY'}
	    )

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
.delmes{
	text-align: center;
	width: 100%;
	padding: 0.1rem;
	box-sizing:border-box;
}
</style>
