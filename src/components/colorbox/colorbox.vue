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
import {comonfn} from 'common/js/mixin'
export default {
  mixins:[comonfn],
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
.colorbox{
  position: fixed;
  top: 0.5rem;
  bottom:0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing:border-box;
  z-index: 11;
}
.scroll-box{
  position: fixed;
  top: 0.5rem;
  bottom: 0;
  overflow: hidden;
  width: 100%;
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

</style>
