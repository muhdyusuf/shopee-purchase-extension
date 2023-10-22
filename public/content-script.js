
let total = 0;
let order = 0;
let orderArray=[]

async function calculate(next){
	let opts = {
		method: 'GET',      
		headers: {}
	};
	fetch('https://shopee.com.my/api/v4/order/get_order_list?limit=5&list_type=3&offset='+next, opts)
    .then(res=>res.json())
	.then(body=>{
		let next_offset = body.data.next_offset;
		if(next_offset >= 0){
			body.data.details_list.map(detail=> {
				var total_temp = detail.info_card.final_total / 100000;
				total += total_temp;
				order++;

				
                const productArray=detail.info_card.order_list_cards[0].product_info.item_groups.map(item=>({...item.items[0]})	
				)

				console.log(productArray)
				
				

                const orderId=detail.info_card.order_id

                const orderReceivedTime=detail.shipping.tracking_info.ctime

                orderArray.push({
                    total:total_temp,
                    orderId,
                    productArray,
                    orderReceivedTime
                })

	    			// console.log(order + ":", "RM " + total_temp + " - ", productName);
			})
			calculate(next_offset);
		} else {
	
            chrome.runtime.sendMessage({
				method:"addData",
				orderData:{
				orderArray,total:Math.round(total*100)/100
			 }});
			 return
			
	}});
}

calculate(0)





