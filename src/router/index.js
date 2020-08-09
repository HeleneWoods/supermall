import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>
  import ('../views/home/Home.vue')
const Category = () =>
  import ('../views/category/Category.vue')
const Cart = () =>
  import ('../views/cart/Cart.vue')
const Profile = () =>
  import ('../views/profile/Profile.vue')
const Detail = () =>
  import ('../views/detail/Detail.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '购物街'
    }
  },
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/detail/:id',
    component: Detail,
    meta: {
      title: '商品详情'
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title
  next()
})
