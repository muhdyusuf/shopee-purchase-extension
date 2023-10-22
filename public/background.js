// function injectModal() {
//   const modalUrl = chrome.runtime.getURL("index.html");
//   fetch(modalUrl)
//     .then((response) => response.text())
//     .then((html) => {
//       chrome.document.body.insertAdjacentHTML("beforeend", html);
//       const modal = document.querySelector(".modal");
//       modal.style.display = "block";
      
//       const closeButton = document.querySelector(".close");
//       closeButton.addEventListener("click", () => {
//         modal.style.display = "none";
//       });
//     });
//   }
let orderData

chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
  if(request.method==="addData"){
    orderData=request.orderData
 
  }
  if(request.method==="redirect"){
    chrome.tabs.create({url:request.url})
    
  }
  else{
    sendResponse({orderData})
  }
  

});

