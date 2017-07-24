<template>
  <div class="detail">
    <i @click='back' class="iconfont icon-xiangyou1 back
"></i>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  computed:{
    ...mapGetters([
        'shopid'
    ])
  },
  mounted(){
    this.$nextTick(()=>{
      console.log(this.shopid)
    })
  },
  methods:{
    back(){
      this.$router.back()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail{
  position: fixed;
  top: 0.5rem;
  bottom:0.8rem;
  left: 0;
  width: 100%;
  box-sizing:border-box;
  background: #fff;
  z-index: 11;
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
