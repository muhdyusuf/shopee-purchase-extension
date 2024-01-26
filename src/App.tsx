import {useEffect, useMemo,useState } from "react"
import OrderCard from "./components/order-card"



function App() {

  const [orderArray,setOrderArray]=useState<Order[]|undefined>(undefined)
  const [loading,setLoading]=useState(false)
  const totalSpend=useMemo(()=>{
    if(!orderArray)return 0
    else if(orderArray.length==0)return 0
    else return orderArray.reduce((total,order)=>total+order.total,0)
  },[orderArray])
  
  async function getOrder() {
    const orderArray:Order[] = []

    async function calculate(next:number) {
        const opts = {
            method: 'GET',
            headers: {}
        };

        const response = await fetch('https://shopee.com.my/api/v4/order/get_order_list?limit=5&list_type=3&offset=' + next, opts);
        const body = await response.json()

        const next_offset = body.data.next_offset
        if (next_offset >= 0) {
            for (const detail of body.data.details_list) {
                const total_temp = detail.info_card.final_total / 100000
                const productArray = detail.info_card.order_list_cards[0].product_info.item_groups.map((item:any) => ({ ...item.items[0] }))

                const orderId = detail.info_card.order_id
                const orderReceivedTime = detail.shipping.tracking_info.ctime

                orderArray.push({
                    total: total_temp,
                    orderId,
                    productArray,
                    orderReceivedTime
                })
            }

            await calculate(next_offset)
        }
    }

    await calculate(0)
    return orderArray
}

async function handleGetOrder(){
  setLoading(true)
  getOrder().then(data=>setOrderArray(data)).finally(()=>setLoading(false))
}
useEffect(() => {
  chrome.storage.session.get(['orderData']).then(data=>{
    if (data["orderData"]) {
        setOrderArray(data["orderData"])
    }
  })
}, []);
useEffect(() => {
  if(!orderArray)return
  chrome.storage.session.set({orderData:orderArray})
}, [orderArray]);

chrome.tabs.onRemoved.addListener(()=>{
  chrome.storage.session.clear()
})
  

  return (
  <main
    className='bg-secondary flex flex-col justify-start gap-1 w-[min(100%,400px)] relative'
  >
    <div
      className="p-2"
    >
    <div
      className="flex justify-center"
      >
        <button
          className="button-shopee-primary flex gap-1"
          onClick={handleGetOrder}
          disabled={loading}
          >
          <svg 
            className={`w-4 aspect-square animate-spin ${loading?"block":"hidden"}`}
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          Calculate total
        </button>
    </div>
    {orderArray&&orderArray.length>0&&(
      <ul
        className="flex flex-col gap-2"
      >
        {orderArray.map(order=>(
          <OrderCard 
          key={crypto.randomUUID()}
          order={order}
          />
          ))}
      </ul>
    )}
   </div>
   
<footer
    className="sticky bottom-0 left-0 bg-accent-gradient p-2 flex justify-between items-center text-slate-200"
    >
    <div
      className="flex gap-2 text-xs"
      >
      <p
        className='hover:text-blue-600'
         onClick={()=>chrome.tabs.create({url:"https://github.com/muhdyusuf/shopee-purchase-tracker"})}
      >
        muhdyusuf/shopee-purchase-tracker
      </p>
    </div>


    <p
        className='flex items-center flex-wrap'
    >
        Total :
        <span
        className="text-lg font-bold"
        >
        Rm {totalSpend}
        </span>
    </p>
 

  </footer>
</main>
  )
}

export default App
