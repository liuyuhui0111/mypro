<template>
  <div class="detail">
    <i @click='back' class="iconfont icon-xiangyou1 back
"></i>
    <scroll @scroll="scroll" ref="scroll" :listenScroll="listenScroll" :pullup="pullup" class="scroll" :data="banners">
      <div>

        <div class="swiper-box" v-if="banners.length">
              <swiper ref="swiper">
                <div v-for="item in banners">
                  <img @load="loadImage" class="needsclick" :src="item">
                </div>
              </swiper>
        </div>
        <div class="shop_intro">
            <div class="name">
              {{shops.name}}
              &nbsp;
              {{shops.vol}}%Vol
            </div>
            <div class="price">
              ￥{{shops.price}}
            </div>
            <div class="cr_c">
              {{shops.fhmes}}
              <br>
              销量：{{shops.cells}}
            </div>
        </div>
        <div v-if="imgSrc.length>0" class="shop_datail_img">
          <h3>商品详情</h3>
          <img @load="loadImage1" v-for="item in imgSrc" :src="item">
        </div>
      </div>
    </scroll>
      <router-link ref="shopping" to="/shopping" class="shopping" :class="{on:isShowShopping}">
          <i class="iconfont icon-gouwuche"></i>
          <span v-if="shopCartNum>0">{{getShopnum}}</span>
      </router-link>
      <div class="footer fbox">
          <div @touchstart.stop="isDialog=true" class="add-shop">加入购物车</div>
          <div class="go-buy">立即购买</div>
      </div>
      <transition name="slider-top">  
      <div :class="{on:isDialog}" class="dialog">
        <div class="dialog-show">
          <div class="img">
            <img :src="banners[0]">
          </div>
          <div class="trbox">
            <span class="price">￥{{shops.price}}</span>
           <span> 销量：{{shops.cells}}</span>
          </div>
          <i class="iconfont icon-guanbi1" @touchstart.stop="isDialog=false"></i>
          <div class="botbox">
            <div class="num">
              <span>数&emsp;&emsp;量</span>
              <btnnum @change="getnum" :dataId="detailShop.id"></btnnum>
            </div>
            <div class="boxcolor">
              礼盒颜色 
              <span :class="{on:isColor}" @touchstart="isColor = true">黑色</span>
              <span :class="{on:!isColor}" @touchstart="isColor = false">红色</span>
            </div>
            <div class="btn-sub" @touchstart.stop="_addShop()">确定</div>
          </div>
        </div>
      </div>
      </transition>
  </div>
</template>

<script>
import Swiper from 'base/swiper/swiper'
import {mapGetters,mapActions} from 'vuex'
import * as Config from 'api/config.js'
import Scroll from 'base/scroll/scroll'
import {standard,comonfn} from 'common/js/mixin'
import {addShop} from 'api/standard'
export default {
  mixins:[standard,comonfn],
  data () {
    return {
      banners:[],
      imgSrc:[],
      listenScroll:true,
      pullup:true,
      isShowShopping:false,
      shops:{},
      isColor:true,
      isDialog:false
    }
  },
  components:{
    Swiper,
    Scroll
  },
  created(){
    if(this.detailShop.id !== this.$route.params.id){
      this.$router.back()
    }else{
      this._init()
    }
  },
  methods:{
    
    scroll(pos){
      this.isShowShopping = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        this.isShowShopping = false;
      },1500)
    },
    _init(){
      let arrBanner = []
      let arrDetailImg = []
      for (let i = 0; i < Config.DETAIL_BANNER.length; i++) {
        arrBanner.push(Config.DETAIL_BANNER[i]+this.$route.params.id+'.png')
      }
      for (let i = 0; i < Config.DETAIL_SRC.length; i++) {
        arrDetailImg.push(Config.DETAIL_SRC[i]+this.$route.params.id+'.jpg')
      }
      this.banners = arrBanner
      this.imgSrc = arrDetailImg
      this.shops = this.detailShop
    },
    loadImage1(){
      this.checkloaded = true
      this.$refs.scroll.refresh()
    },
    _addShop(){
      if(!this.isCanSub) return
      let data = {
        id:this.detailShop.id,
        boxid:this.isColor ? Config.BLACKBOX : Config.REDBOX,
        num:this.nums[this.detailShop.id] ? this.nums[this.detailShop.id] : 1
      }
      this.isCanSub = false
      addShop(data).then((res)=>{
        this.isCanSub = true
        if(res.success){
        this.setShopCartNum(data.num)
        this.isDialog = false
        }
      })
    },
  },
  computed:{
    ...mapGetters([
      'detailShop',
      'shopCartNum'
    ]),
    getShopnum(){
      if(this.shopCartNum > 99){
        return '99+'
      }else{
        return this.shopCartNum
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail{
  position: fixed;
  top: 0.5rem;
  bottom:0;
  left: 0;
  width: 100%;
  box-sizing:border-box;
  background: #e5e5e5;
  z-index: 11;
}
.scroll{
  position: fixed;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 100%;
  overflow: hidden;
}

.swiper-box{
    width: 100%;
    min-height: 1px;
  }
.shop_datail_img,
.shop_intro{
  width: 96%;
  display: block;
  box-sizing:border-box;
  background: #fff;
  padding: 0.1rem;
  margin: 0.1rem auto;
}
.price{
  font-size: 1.5em;
  color:#e83c3a;
  font-weight: bold;
}
.shop_datail_img img{
  display: block;
  width: 100%;
}
.cr_c{
  font-size: 0.7em;
  color:#666;
}
.shop_datail_img h3{
  font-size: 0.24rem;
  border-bottom: 0.01rem solid #ccc;
  line-height: 0.4rem;
  font-weight: normal;
}
.footer{
  position: fixed;
  background: #e5e5e5;
  bottom: 0;
  left:2%;
  width: 96%;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  justify-content: space-around;
  align-items: center;
  z-index: 11;
  box-sizing:border-box;
  color: #fff;
}
.add-shop{
  display: block;
  height: 100%;
  background: #e83c3a;
  width: 45%;
}
.go-buy{
  display: block;
  height: 100%;
  background: #333;
  width: 45%;
}
.shopping{
  transition: all 0.6s;
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transform: scale(1);
  display: block;
  position: fixed;
  right: 0.2rem;
  bottom: 0.6rem;
  width: 0.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border-radius: 100%;
  text-align: center;
  background: #333;
}
.icon-gouwuche{
  color: #fff;
  font-size: 0.3rem;
}
.shopping.on{
  opacity: 0;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
}
.shopping span{
  position: absolute;
  right: -0.1rem;
  top: -0.05rem;
  color: #fff;
  background: #e83c3a;
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
  border-radius: 100%;
  font-size: 0.12rem;
}
.dialog{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  top: 0;
  left: 0;
  z-index: 12;
  transition: all 0.3s;
  -webkit-transform: translate3d(-100%,0,0);
  -ms-transform: translate3d(-100%,0,0);
  -o-transform: translate3d(-100%,0,0);
  transform: translate3d(-100%,0,0);
}

.dialog.on{
  -webkit-transform: translate3d(0,0,0);
  -ms-transform: translate3d(0,0,0);
  -o-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
}
.dialog-show{
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: block;
}
.dialog-show .img{
  width: 2rem;
  height: 2rem;
  position: absolute;
  border: 0.02rem solid #ccc;
  background: #fff;
  top: -0.2rem;
  left: 0.2rem;
}
.dialog-show .img img{
  display: block;
  width: 100%;
}
.dialog-show .trbox{
  position: relative;
  float: right;
  height: 2rem;
  line-height: 0.5rem;
  text-align: left;
  width: 4rem;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  align-items: flex-start;
  flex-flow: column;
  justify-content: center;
}
.icon-guanbi1{
  position: absolute;
  right: 0;
  top: 0;
  width: 0.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.3rem;
}
.botbox{
  width: 100%;
  box-sizing:border-box;
  padding: 0.2rem;
  border-top: 0.02rem solid #333;
  clear: both;
  display: block;
  font-size: 0.2rem;
}
.btns,
.num{
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  align-items: center;
}
.num{
    margin: 0.1rem 0;
  }
.btns{
  justify-content: space-between;
}
 .numbtns{
    width: 2rem;
    height: 0.4rem;
    margin-left: 0.3rem;
    line-height: 0.4rem;
    text-align: center;
    border: 0.01rem solid #ccc;
    position: relative;
    display: block;
    box-sizing:border-box;
    padding: 0 0.4rem;
  }
  .numbtns input{
    font-size: 0.2rem;
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .numbtns .icon-jianhao{
    border-right: 0.01rem solid #ccc;
    width: 0.4rem;
    position: absolute;
    left: 0;
    top: 0;
  }
  .numbtns .icon-jiahao1{
    border-left: 0.01rem solid #ccc;
    width: 0.4rem;
    position: absolute;
    right: 0;
    top: 0;
  }
  .boxcolor span{
    display: inline-block;
    width: 1rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    border: 0.01rem solid #ccc;
    margin-left: 0.24rem;
    box-sizing:border-box;
    border-radius: 0.04rem;
  }
  .boxcolor span.on{
    border-color: #e83c3a;
    background: #e83c3a;
    color: #fff;
  }
  .btn-sub{
    display: block;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background: #333;
    color: #fff;
    margin-top: 0.2rem;
  }
</style>
