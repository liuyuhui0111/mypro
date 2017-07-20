<template>
  <div class="slider" ref="slider">
  	<div class="slider-group" ref="sliderGroup">
  		<slot></slot>
  	</div>
    <div class="dots">
      <span v-for="(item,index) in dots" :class="{on:currentPageIndex === index}"></span >
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    name: 'slider',
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 3000
      }
    },
    data() {
      return {
        dots: [],
        currentPageIndex: 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()

        if (this.autoPlay) {
          this._play()
        }
      }, 20)

      window.addEventListener('resize', () => {
        console.log(this.slider)
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    destroyed() {
      clearTimeout(this.timer)
    },
    methods: {
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children

        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX
          if (this.loop) {
            pageIndex -= 1
          }
          this.currentPageIndex = pageIndex
          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      _play() {
        let pageIndex = this.currentPageIndex + 1
        if (this.loop) {
          pageIndex += 1
        }
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400)
        }, this.interval)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .slider{
    display: block;
    width: 100%;
    position: relative;
    overflow: hidden;
    min-height: 1px;
  }
  .slider-group{
    display: block;
  }
  .slider-group .slider-item{
    float: left;
    overflow: hidden;
    box-sizing:border-box;
  }
  .slider-group .slider-item a{
    display: block;
    width: 100%;
  }
  .slider-group .slider-item img{
    display: block;
    width: 100%;
  }
  .slider .dots{
    display: block;
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
  }
  .slider .dots span{
    display: inline-block;
    width: 0.12rem;
    height: 0.12rem;
    background: #abcdef;
    opacity: 0.6;
    border-radius: 100%;
    margin:0 0.1rem;
    transition: all 0.3s;
  }
  .slider .dots span.on{
    opacity: 1;
    background: #fedcba;
  }
</style>
