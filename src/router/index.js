import Vue from 'vue'
import VueRouter from 'vue-router'

//通过懒加载的方式向服务器发送请求
const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Category = () => import('../views/category/Category.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail')
Vue.use(VueRouter)
//配置路由映射关系
const routes = [
  //默认路由
  {
    path:'',
    redirect:'/home',  
  },
  {
    path:'/home',
    component:Home,
  },
  {
    path:'/cart',
    component:Cart,
   
  },
  {
    path:'/category',
    component:Category,
   
  },
  {
    path:'/profile',
    component:Profile,
    
  },
  {
    path:'/detail/:iid',
    component:Detail,
    
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to,from,next) => {
//   console.log(to)
//   document.title = to.matched[0].meta.title;
//   next();
// })
export default router
