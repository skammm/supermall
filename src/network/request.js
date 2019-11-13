import axios from 'axios'
export function request(config){
    //创建axios的实例
    const instance = axios.create({
        baseURL:'http://106.54.54.237:8000',
        timeout:50000
    })
    //axios拦截器
    instance.interceptors.request.use(config => {
        return config;
    },err => {
        console.log(err)
    })
    instance.interceptors.response.use(res => {
        return res;
    },err => {
        console.log(err)
    })
    //发送真正的网络请求
    return instance(config)
}