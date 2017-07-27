import {mapGetters, mapMutations, mapActions} from 'vuex'
import Btnnum from 'base/btnnum/btnnum'
export const standard = {
	data(){
		return {
			nums:[],
			isCanSub:true
		}
	},
	components:{
		Btnnum
	},
	methods:{
		blurInp(){
	        let inp = this.$el.querySelectorAll("input")
	        for (var i = 0; i < inp.length; i++) {
	        	inp[i].blur()
	        }
    	},
    	getnum(n,id){
        	this.nums[id] = n
    	},
		loadImage(){
	       	if (!this.checkloaded) {
	          this.checkloaded = true
	          this.$refs.scroll.refresh()
	        }
   		},
	    ...mapActions([
	        'setShopCartNum'
	    ])
	}

}