
interface Order{
    productArray:OrderItem[],
    total:number,
    orderId:string,
    orderReceivedTime:Date
  
}

interface OrderItem{
      model_name:string
      name:string,
      item_price:number,
   
}