/*49417137-5bac-49b0-b654-b28554979102*/


async function fetchCryptoData(){
    const response = await fetch(new Request("https://api.livecoinwatch.com/coins/list"), {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        "x-api-key": "49417137-5bac-49b0-b654-b28554979102",
      }),
      body: JSON.stringify({
        currency: "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,
        limit: 10,
        meta: true,
      }),
    });


      /*format website can read: JSON*/

      const data = await response.json();
      console.log("My API response", data);
      updateCryptoList(data);

}

function updateCryptoList(CryptoData){

    const container = document.querySelector("#allCryptoContainer");

      //* container.innerHTML("");

      CryptoData.forEach((coin)=>{
        const cryptoRow = document.createElement("a");
        cryptoRow.classList.add("singularCrypto");
        const PriceChange = coin.delta.day.toFixed(2);
        const changeClass = PriceChange > 0 ? "green-bg" : "red-bg";
      
        cryptoRow.innerHTML = `
        <div><img class="logoImage" src="${coin.webp64}"></div>  
                <div>${coin.name}</div>
                <div class="PriceContainer">
                <div>$${coin.rate.toFixed(2)}</div>
                <div class = "priceChangeColumn ${changeClass}"> 
                <p class = "priceChange"> ${PriceChange > 0 ? "+" : ""}${PriceChange} </p>
                </div>
              </div>`;

        container.appendChild(cryptoRow);
        
      })
    
    }



document.addEventListener("DOMContentLoaded", fetchCryptoData); //*Calls function when page is loaded