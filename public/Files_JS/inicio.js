
const href_text = document.querySelector('a[name="inicio"]')

const total_sell_inicio = document.querySelector('.total_sell_inicio');
const total_buy_inicio = document.querySelector('.total_buy_inicio');
const total_venta_eft = document.querySelector('.total_venta_eft');
const total_venta_tar = document.querySelector('.total_venta_tar');


let URLQuery = window.location.origin;
href_text.style.backgroundColor = '#f0f5fb';


const sumTotalVentasFn = async () =>{

   let petitionSum = await fetch(`${URLQuery}/sum_total_cajas`).then(res=>res.json()).then(data=>data);
  

   total_sell_inicio.textContent = `${petitionSum[0].total_cajas_formateado}`
}

const sumTotalComprasFn = async () =>{

   let petitionSum = await fetch(`${URLQuery}/sum_total_compras`).then(res=>res.json()).then(data=>data);

   total_buy_inicio.textContent = `${petitionSum[0].total_compras}`

}

const sumTotalVentaEftFn = async () =>{

   let petitionSum = await fetch(`${URLQuery}/total_caja_eft`).then(res=>res.json()).then(data=>data);

   total_venta_eft.textContent = `${petitionSum[0].total_efectivo}`

}

const sumTotalVentaTarFn = async () =>{
   
   let petitionSum = await fetch(`${URLQuery}/total_caja_tar`).then(res=>res.json()).then(data=>data);

   total_venta_tar.textContent = `${petitionSum[0].total_tarjeta}`

}

sumTotalVentasFn();
sumTotalComprasFn();
sumTotalVentaEftFn();
sumTotalVentaTarFn();




console.log('Esta tambien funcion')

// const totalVentas = 1175451005;

// const totalFormateado = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
// }).format(totalVentas);

// console.log(totalFormateado); // Salida: $1,175,451,005.00