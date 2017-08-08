import Vue from 'vue'
import Router from 'vue-router'
import Standard from 'components/standard/standard'
import Product from 'components/product/product'
import Shopping from 'components/shopping/shopping'
import My from 'components/my/my'
import Custom from 'components/custom/custom'
import StandardDetail from 'components/detail/standardDetail'
import AddressPage from 'components/address/addressPage'
import AddAds from 'components/address/addAddress'
import EditAds from 'components/address/editAddress'
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
          component:StandardDetail,
          meta:{
            keepAlive:true
          }
        }
      ],
      meta:{
        keepAlive:true
      }
    },
    {
      name:'私人定制',
      path: '/product',
      component: Product,
      meta:{
        keepAlive:true
      }
    },
    {
      name:'购物车',
      path: '/shopping',
      component: Shopping,
      meta:{
        keepAlive:true
      }
    },
    {
      name:'盒子预览',
      path:'/colorbox',
      component:Colorbox,
      meta:{
        keepAlive:true
      }
    },
    {
      name:'地址列表',
      path:'/address',
      component:AddressPage,
      children:[
        {
          name:'编辑地址',
          path:'editAddress',
          component:EditAds,
          meta:{
            keepAlive:true
          }
        },
        {
          name:'添加地址',
          path:'addAddress',
          component:AddAds,
          meta:{
            keepAlive:true
          }
        }
      ],
      meta:{
        keepAlive:false
      }
    },
    {
      name:'我的武陵',
      path: '/my',
      component: My,
      children:[
        {
          name:'客服',
          path:'custom',
          component:Custom,
          meta:{
            keepAlive:true
          }
        }
      ],
      meta:{
        keepAlive:true
      }
    }
  ]
})
