import Vue from 'vue'
import Router from 'vue-router'
import Standard from 'components/standard/standard'
import Product from 'components/product/product'
import Shopping from 'components/shopping/shopping'
import My from 'components/my/my'
import Custom from 'components/custom/custom'
import StandardDetail from 'components/detail/standardDetail'
import Colorbox from 'components/colorbox/colorbox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/standard'
    },
    {
      name:'标准产品',
      path: '/standard',
      component: Standard,
      children:[
        {
          name:'商品详情',
          path:':id',
          component:StandardDetail
        }
      ]
    },
    {
      name:'私人定制',
      path: '/product',
      component: Product
    },
    {
      name:'购物车',
      path: '/shopping',
      component: Shopping
    },
    {
      name:'盒子预览',
      path:'/colorbox',
      component:Colorbox
    },
    {
      name:'我的武陵',
      path: '/my',
      component: My,
      children:[
        {
          name:'客服',
          path:'custom',
          component:Custom
        }
      ]
    }
  ]
})
