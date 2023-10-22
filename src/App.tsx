import { useEffect,useState } from "react"

interface IOrder{
  productArray:IItem[],
  total:number

}
interface IItem{
    model_name:string
    name:string,
    item_price:number,
 

}

function App() {

  const [orderAray,setOrderArray]=useState<IOrder[]|[]>([])
  const [orderTotal, setOrderTotal] = useState<number>(0)
  console.log(orderAray)
  useEffect(()=>{
    (async()=>{const response =await chrome.runtime.sendMessage({method:"getStatus"})
    if(response?.orderData){
      const {orderData}=response
      console.log(orderData.orderAray)

      console.log(orderData.orderAray)
      setOrderArray(orderData.orderArray)
      setOrderTotal(orderData.total)
    }})()
  
  },
  [])

  function redirect(url:string){
    chrome.runtime.sendMessage({method:"redirect",url})
  }

  return (
    <main
      className="min-w-min w-[400px] p-4 rounded-lg  bg-[#f5f5f5] shadow-md relative pb-24"
    > 
    
      {orderAray.length===0?(
        <div
          className="w-full aspect-video animate-pulse text-[6rem] flex justify-center items-center text-center"
        >
          loading
        </div>
      ):(
      <table
        className="w-full flex flex-col gap-2 border-spacing-y-2"
      >
        <thead
          className="w-full"
        >
          <tr>
            <th>
              #
            </th>
            <th>
              Product
            </th>
            <th>
              total price
            </th>
          </tr>
        </thead>
        <tbody>
          {orderAray.map((order,index)=>(
            <tr
              key={crypto.randomUUID()}
            >
            <td>{index+1}</td>

            <td
              className="flex flex-col"
            >{
              order.productArray.map(item=>(
                <div
                  className="flex justify-between"
                >
                    <p>{item.name}</p>
                    <p>Rm{item.item_price/100000}</p>
                
                </div>    
              ))  
            }</td>

           
            <td>Rm{order?.total}</td>
          </tr>
          ))}
          
        </tbody>
        
      </table>
      )}
      <footer
        className="grid grid-cols-[2fr,1fr] fixed bottom-0 left-0 w-full bg-shopee p-2 h-24 place-content-center text-slate-200"
      >
        <div
          className="flex gap-2"
        >
          <p>
            design by 
            <span
              className="hover:underline hover:text-blue-400 ml-2"
              onClick={()=>redirect("https://github.com/muhdyusuf/shopee-purchase-extension")}
            >
              muhd yusuf
            </span>
          </p>
        </div>

        <div
          className="flex"
        >
            <p>
              total :
              <span
                className="text-lg font-bold ml-2"
              >
                Rm {orderTotal}
              </span>
            </p>
        </div>
        {/* <DarkMode/> */}
      </footer>

      
    </main>
  )
}

export default App
