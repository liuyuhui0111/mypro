<template>
  <div class="colorbox">
    <i @click='back' class="iconfont icon-xiangyou1 back
"></i>
  <div class="scroll-box">
  <scroll ref="scroll" class="scroll" :data="colorbox">
    <div>
      <div v-if="colorbox.length>0" class="imgbox">
        <img @load="imgLoad()" @click="selectBox()" v-for="item in colorbox" :src="item.src" :alt="item.name">
      </div>
    </div>
  </scroll>
  </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      imgs:[]
    }
  },
  computed:{
    ...mapGetters([
        'colorbox'
    ])
  },
  components:{
    Scroll
  },
  mounted(){
    this.$nextTick(()=>{
      if(this.colorbox.length<=0){
        this.$router.back()
      }
    })
  },
  methods:{
    back(){
      this.$router.back()
    },
    selectBox(){
      this.$router.back()
    },
    imgLoad(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroll-box,
.colorbox{
  position: fixed;
  top: 0.5rem;
  bottom:0.8rem;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing:border-box;
  z-index: 11;
}
.scroll-box{
  overflow: hidden;
}
.scroll{
  height: 100%;
  overflow: hidden;
  box-sizing:border-box;
  background: #fff;
}

.imgbox img {
  display: block;
  width: 100%;
  height: auto;
  margin-bottom: 0.2rem;
  box-sizing:border-box;
}
.imgbox img:nth-last-child(1){
  margin-bottom: 0;
}
.back{
  position: absolute;
  left: 0;
  top: -0.5rem;
  color: #fff;
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  display: block;
  width: 0.5rem;
  text-align: center;
  font-size: 0.3rem;
}

</style>
