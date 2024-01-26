import {FC} from 'react'

interface orderCardProps {
 order:Order,
}

const OrderCard:FC<orderCardProps>=({
    order,

})=>{
 return(
    <li
        key={order.orderId}
        className="rounded-md bg-primary p-4 shadow-sm"
    >
    <div
        className='flex justify-between border-b pb-1 mb-2'
        >
        <p>
            Order#{order.orderId}
        </p>
        <h6
            className='font-bold'
            >
            RM{order.total}
        </h6>
    </div>
    <ul
        className='list-decimal flex flex-col gap-1'
        >
        {order.productArray.map(product=>(
            <li
        key={crypto.randomUUID()}
        className='flex justify-between text-sm'
        >
            <p>{product.name}</p>
            <p>RM{product.item_price/100000}</p>
        </li>
        ))} 
    </ul>
    
    </li>
)}

export default OrderCard