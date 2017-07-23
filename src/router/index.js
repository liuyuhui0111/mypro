import Vue from 'vue'
import Router from 'vue-router'
import Standard from 'components/standard/standard'
import Product from 'components/product/product'
import Shopping from 'components/shopping/shopping'
import My from 'components/my/my'
import Custom from 'components/custom/custom'
import StandardDetail from 'components/detail/standardDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/standard'
    },
    {
      path: '/standard',
      component: Standard,
      children:[{
        path:':id',
        component:StandardDetail
      }]
    },
    {
      path: '/product',
      component: Product
    },
    {
      path: '/shopping',
      component: Shopping
    },
    {
      path: '/my',
      component: My,
      children:[
        {
          path:'custom',
          component:Custom
        }
      ]
    }
  ]
})
