import {debounce} from 'common/utils'
export const itemListenerMixin = {
    mounted(){
        //事件总线(因为两个组件之间没有联系，涉及到非父子组件之间的通信)
        const refresh = debounce(this.$refs.scroll.refresh,300)
     this.itemListener = () => {
         refresh()
      }
     this.$bus.$on('itemImageLoad', this.itemListener);
    }
}
//解决多个组件有共用代码的问题
import BackTop from 'components/content/backtop/BackTop'
export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return{
            isShow:false,
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0,500);
        },
    }
}