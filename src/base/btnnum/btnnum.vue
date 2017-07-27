<template>
	<div class="numbtns">
		<div @touchstart="del" class="iconfont icon-jianhao"></div>
		<input @change="checkNum()" ref="inp" v-model.number="num" type="text">
		<div @touchstart="add" class="iconfont icon-jiahao1"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				num:1
			}
		},
		created(){
			this.num = this.val
		},
		props:{
			val:{
				type:Number,
				default:1
			},
			min:{
				type:Number,
				default:1
			},
			max:{
				type:Number,
				default:Number.MAX_VALUE
			},
			dataId:{
				type:String,
				default:""
			}
		},
		methods:{
			add(){
				this.num += 1
			},
			del(){
				this.num -= 1
			},
			checkNum(){
				if(this.num<this.min){
					this.num = this.min
				}else if(this.num>this.max){
					this.num = this.max
				}
				this.$emit('change',this.num,this.dataId)
			}
		},
		watch:{
			num:"checkNum"
		}
	}
</script>

<style scoped>
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
</style>