<template>
  <div class="standard">

  	<mheader :isback='isback' :title='title'></mheader>
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
        <div v-for="item in shops" class="fbox">
          <a class="lbox" :href="item.href">
            <img v-lazy="item.src">
          </a>
          <div class="rbox">
            <div class="name">
              <span>{{item.name}}</span>
              <span>{{item.vol}}%Vol</span>
            </div>
            <div class="num">
              <span class="cr_c">数量</span>
              <span class="iconfont icon-jianhao"></span>
              <input type="num" min="1" value="1">
              <span class="iconfont icon-jiahao1"></span>
            </div>
            <div class="price">
              <span class="cr_r">￥{{item.price}}/瓶</span>
              <span class="cr_c">销量{{item.cells}}瓶</span>
            </div>
            <div v-if="item.boxcolor.length>0" class="box-color">
              <span class="cr_c">礼盒颜色</span>
              <div class="btn-color">
                <span class="circle"></span>
              </div>
              <span class="iconfont icon-wenhao"></span>
            </div>

          </div>
        </div>
      </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Mheader from 'components/mheader/mheader'
import Swiper from 'base/swiper/swiper'
import Loading from 'base/loading/loading'
import {getSwiperData,getShopList} from 'api/standard'
import Scroll from 'base/scroll/scroll'
export default {
  data () {
    return {
      title: '标准产品',
      isback:false,
      swipers:[],
      shops:[]
    }
  },
  components:{
    Swiper,
    Mheader,
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
        console.log(res.data)
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.standard{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
    padding-bottom: 1rem;
  }
  .btn-color:after{
    content: "黑色"
  }
  .btn-color.on:after{
    content: "红色"
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
  .rbox .name{
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.25rem;
  }
  .cr_c{
    color: #888;
  }
  .iconfont{
  font-size: 0.2rem;
}
</style>
