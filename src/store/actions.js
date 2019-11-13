export default {
    //异步操作放在action里边
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        let oldItem = null
        for(let item of context.state.cartList){
          if(item.iid === payload.iid){
            oldItem = item;
          }
        }
        if(oldItem){
          context.commit('addCounter',oldItem);
          resolve('当前商品数量加1')
        }else{
          payload.count += 1;
          context.commit('addToCart',payload)
          resolve('添加新的商品')
        }
      })
     

    }
  }