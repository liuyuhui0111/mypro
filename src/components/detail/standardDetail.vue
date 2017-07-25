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
  created(){
    console.log(this.$route.params.id)
  },
  mounted(){
    this.$nextTick(()=>{
      console.log(this.$route.params.id)
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
  bottom:0;
  left: 0;
  width: 100%;
  box-sizing:border-box;
  background: #e5e5e5;
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
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.3rem;
}
</style>
