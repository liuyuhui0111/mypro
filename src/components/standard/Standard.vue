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
            <div class="num" @touchstart.stop>
              <span class="cr_c">数量</span>
              <div class="numbtns">
                <div @click="delNum(item)" class="iconfont icon-jianhao"></div>
                <input @focus="curInpIndex=index" ref="inp" v-model.number="item.num" type="text">
                <div @click="addNum(item)" class="iconfont icon-jiahao1"></div>
              </div>
            </div>
            <div class="price">
              <span class="cr_r">￥{{item.price}}/瓶</span>
              <span class="cr_c">销量{{item.cells}}瓶</span>
            </div>
            <div v-if="item.boxcolor.length>0" class="box-color">
              <span class="cr_c">礼盒颜色</span>
              <div @click="item.curbox=item.curbox==='0' ? '1' : '0'" class="btn-color" :class="{on:item.curbox === '0'}">
                <span class="circle"></span>
              </div>
              <span @click="showBox(item)" class="iconfont icon-wenhao"></span>
            </div>
            <div class="btns">
              <div class="add-shop">加入购物车</div>
              <div class="go-buy">立即购买</div>
            </div>

          </div>
        </div>
      </div>
     
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Swiper from 'base/swiper/swiper'
import Loading from 'base/loading/loading'
import {getSwiperData,getShopList} from 'api/standard'
import Scroll from 'base/scroll/scroll'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      title: '标准产品',
      isback:false,
      swipers:[],
      shops:[],
      curInpIndex:0
    }
  },
  components:{
    Swiper,
  	Scroll,
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
    loadImage(){
       if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
    },
    showDetail(item){
      this.$router.push({
        path:`/standard/${item.id}`
      })
      this.setShopid(item.id)
    },
    showBox(item){
      this.$router.push({
        path:'/colorbox'  
      })
      this.setColorbox(item.boxcolor)
    },
    addNum(item){
      item.num += 1;
    },
    delNum(item){
      item.num -= 1;
      if(item.num<1){
        item.num = 1;
      }
    },
    blurInp(){
      this.$refs.inp[this.curInpIndex].blur()
    },
    ...mapMutations({
        setShopid: 'SET_SHOPID',
        setColorbox: 'SET_COLORBOX'
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.standard{
  position: fixed;
  top: 0.5rem;
  bottom:0.8rem;
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
  .fbox{
    justify-content: space-between;
    padding: 0.2rem;
    align-items: center;
    flex-wrap: nowrap;
    background: #fff;
    margin: 0.1rem 0;
  }
  .fbox .lbox{
    display: block;
    box-sizing:border-box;
    width: 40%;
    padding-right:0.1rem;
  }
  .fbox .lbox img{
    width: 100%;
  }
  .fbox .rbox{
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
  .icon-wenhao{
    font-size: 0.3rem;
  }
  
</style>
