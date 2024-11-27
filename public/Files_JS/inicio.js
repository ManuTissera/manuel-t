
const aside = document.querySelector('.aside');
const menu_burger = document.querySelector('.menu_burger');
const close_aside = document.querySelector('.close_aside');

const total_sell_inicio = document.querySelector('.total_sell_inicio');
const total_buy_inicio = document.querySelector('.total_buy_inicio');

let URLQuery = window.location.origin;

const sumTotalVentasFn = async () =>{

   let petitionSum = await fetch(`${URLQuery}/sum_total_ventas`).then(res=>res.json()).then(data=>data);
  

   total_sell_inicio.textContent = `${petitionSum[0].total_ventas_formateado}`
}

const sumTotalComprasFn = async () =>{

   let petitionSum = await fetch(`${URLQuery}/sum_total_compras`).then(res=>res.json()).then(data=>data);

   total_buy_inicio.textContent = `${petitionSum[0].total_compras}`

}

sumTotalVentasFn();
sumTotalComprasFn();

menu_burger.addEventListener("click",()=>{
   aside.style.left = "0rem";
})

close_aside.addEventListener("click",()=>{
   aside.style.left = "-100%";

})

// const totalVentas = 1175451005;

// const totalFormateado = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
// }).format(totalVentas);

// console.log(totalFormateado); // Salida: $1,175,451,005.00