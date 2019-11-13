import Toast from './Toast'
const obj = {};

obj.install = function(Vue){
    console.log('------')
    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //2.创建组件对象
    const toast = new toastContrustor();
    //3.将组件对象手动挂载到某个元素上
    toast.$mount(document.createElement('div'))
    //4.toast.$el就是对应的div
    document.body.appendChild(toast.$el);
    Vue.prototype.$toast = toast;
    
}

export default obj;