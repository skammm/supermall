export default  {
    //mutation的功能就是修改state的状态，完成的事情尽可能的单一
    //逻辑复杂的操作尽量不要放在这里边完成
    
      addCounter(state,payload){
        payload.count++
      },
      addToCart(state,payload){
        payload.checked = false;
        state.cartList.push(payload);
      }
      
    
  }