    import Vue from 'vue'
    import App from './App.vue'
    import router from './router'
    import store from './store'
    import toast from 'components/common/toast/index'
    import FastClick from 'fastclick'
    
    import Router from 'vue-router'
    const routerPush = Router.prototype.push
    Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
    }



    Vue.use(toast)
    Vue.config.productionTip = false
    //注册事件总线事件，所有组件都继承自vue实例
    Vue.prototype.$bus = new Vue()
    //解决移动端的300ms的延迟
    FastClick.attach(document.body);
    new Vue({
      router,
      store,
     
      render: h => h(App)
    }).$mount('#app')
