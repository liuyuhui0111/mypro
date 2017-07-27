<template>
  <div class="standard" @touchstart="blurInp">

    <scroll ref="scroll" class="scroll" :data="shops">
      <div>
      <div class="swiper-box" v-if="swipers.length">
        <swiper ref="swiper">
          <div v-for="(item,index) in swipers">
          <a :href="item.href">
            <img @load="loadImage" class="needsclick" :src="item.src">
          </a>
          </div>
        </swiper>
      </div>
      <div class="shop-list">
        <div v-for="(item,index) in shops" class="fbox">
          <a @click="showDetail(item)" class="lbox" :href="item.href">
            <img v-lazy="item.src">
          </a>
          <div class="rbox">
            <div class="name">
              <span>{{item.name}}</span>
              <span>{{item.vol}}%Vol</span>
            </div>
            <div class="num">
              <span class="cr_c">数量</span>
              <btnnum :ref="item.id" :dataId="item.id" @change="getnum"></btnnum>
            </div>
            <div class="price">
              <span class="cr_r">￥{{item.price}}/瓶</span>
              <span class="cr_c">销量{{item.cells}}瓶</span>
            </div>
            <div v-if="item.boxcolor.length>0" class="box-color">
              <span class="cr_c">礼盒颜色</span>
              <div @touchstart.stop="colorChange(item)" class="btn-color" :class="{on:item.curbox === '0'}">
                <span class="circle"></span>
              </div>
              <span @click.stop="showBox(item)" class="iconfont icon-wenhao"></span>
            </div>
            <div class="btns">
              <div @touchstart="_addShop(item)" class="add-shop">加入购物车</div>
              <div @touchstart.stop="_goBuy(item)" class="go-buy">立即购买</div>
            </div>

          </div>
        </div>
      </div>
     
      </div>
    </scroll>
    <tab></tab>
    <router-view class="detail-box"></router-view>
  </div>
</template>

<script>
import Tab from 'components/tab/tab'
import Swiper from 'base/swiper/swiper'
import Loading from 'base/loading/loading'
import {getSwiperData,addShop,getShopList} from 'api/standard'
import Scroll from 'base/scroll/scroll'
import {mapMutations,mapActions} from 'vuex'
import {standard} from 'common/js/mixin'
export default {
  mixins: [standard],
  data () {
    return {
      swipers:[],
      shops:[],
      curInpIndex:0
    }
  },
  components:{
    Swiper,
  	Scroll,
    Tab,
    Loading
  },
  created(){
    this._getSwiper()
    this._getShopList()
  },
  methods:{
    _getSwiper(){
      getSwiperData().then((res)=>{
      this.swipers = res.data
       }).catch((err)=>{
          console.log(err)
       })
    },
    _getShopList(){
      getShopList().then((res)=>{
        this.shops = res.data
      }).catch((err)=>{
        console.log(err)
      })
    },
    colorChange(item){
      item.curbox = item.curbox==='0' ? '1' : '0'
    },
    showDetail(item){
      this.$router.push({
        path:`/standard/${item.id}`
      })
      this.setDetailShop(item)
    },
    showBox(item){
      this.$router.push({
        path:'/colorbox'  
      })
      this.setColorbox(item.boxcolor)
    },
    _addShop(item){
      if(!this.isCanSub) return
      let data = {
        id:item.id,
        boxid:item.curbox,
        num:this.nums[item.id] ? this.nums[item.id] : 1
      }
      this.isCanSub = false
      addShop(data).then((res)=>{
        this.isCanSub = true
        if(res.success){
        this.setShopCartNum(data.num)
        }
      })
    },
    _goBuy(item){
      if(!this.isCanSub) return
      let data = {
        id:item.id,
        boxid:item.curbox,
        num:item.num
      }
    },
    ...mapMutations({
        setColorbox: 'SET_COLORBOX'
    }),
    ...mapActions([
        'setDetailShop'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.standard{
  position: fixed;
  top: 0.5rem;
  padding-bottom:0.8rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  box-sizing:border-box;
}
  .swiper-box{
    width: 100%;
    min-height: 1px;
  }
  .scroll{
    height: 100%;
    box-sizing:border-box;
    overflow: hidden;
  }
  .shop-list{
    background: #ecebeb;
    overflow: hidden;
  }
  .btn-color{
    background: #333333;
    color: #fff;
    position: relative;
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    display: block;
    width: 0.8rem;
    height: 0.4rem;
    padding: 0 0.1rem;
    border-radius: 0.4rem;
    text-align: left;
  }
  .btn-color .circle{
    -webkit-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    display: block;
    width: 0.36rem;
    height: 0.36rem;
    background: #fff;
    border-radius: 0.36rem;
    position: absolute;
    top: 0.02rem;
    left: 0.62rem;
  }
  .btn-color.on{
    text-align: right;
    background: #e83c3a;
  }
  .btn-color.on .circle{
    left:0.02rem;
  }
  .btn-color:after{
    content: "黑色";
  }
  .btn-color.on:after{
    content: "红色";
  }
  .shop-list .fbox{
    justify-content: space-between;
    padding: 0.2rem;
    align-items: center;
    flex-wrap: nowrap;
    background: #fff;
    margin: 0.1rem 0;
  }
  .shop-list .fbox .lbox{
    display: block;
    box-sizing:border-box;
    width: 40%;
    padding-right:0.1rem;
  }
  .shop-list .fbox .lbox img{
    width: 100%;
  }
  .shop-list .fbox .rbox{
    display: block;
    width: 60%;
    font-size: 0.2rem;
    line-height: 1.8;
    color: #000;
  }
  .btns,
  .box-color,
  .price,
  .num,
  .name{
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    align-items: center;
  }
  .name{
    font-size: 0.25rem;
    justify-content: space-between;
  }
  .num{
    margin: 0.1rem 0;
  }
  .btns,
  .box-color,
  .price{
    justify-content: space-between;
  }
  .go-buy,
  .add-shop{
    display: block;
    width: 50%;
    box-sizing:border-box;
    text-align: center;
    color: #fff;
  }
  .add-shop{
    background: #333;
  }
  .go-buy{
    background: #e83c3a;
  }
  .cr_r{
    color: #e83c3a;
    font-weight: bold;
    font-size: 1.5em;
  }
  .cr_c{
    color: #888;
  }
  
  .icon-wenhao{
    font-size: 0.3rem;
  }
  
</style>
