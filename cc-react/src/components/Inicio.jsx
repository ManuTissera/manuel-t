
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../CSS-Files/inicio.css';

let URLhost = (window.location.hostname === 'localhost')?'http://localhost:3111':''

const InicioFn = () =>{


   const [sumTotalCaja,setSumTotalCaja] = useState('');
   const [sumTotalCompra,setSumTotalCompra] = useState('');
   const [sumCajaEft,setSumCajaEft] = useState('');
   const [sumCajaTar,setSumCajaTar] = useState('');

   useEffect(()=>{
      const sumTotalCajasFn = async () =>{

         try{

            let petitionSum = await fetch(`${URLhost}/sum_total_cajas`).then(res=>res.json()).then(data=>data);
            console.log(petitionSum[0],'---sumTotalCajasFnn    1')
            setSumTotalCaja(petitionSum[0]['total_cajas_formateado'])
         }catch(err){
            console.error('Error fetch /sumTotalCajasFn')
         }
      }
      
      const sumTotalComprasFn = async () =>{
      
         try{

            let petitionSum = await fetch(`${URLhost}/sum_total_compras`).then(res=>res.json()).then(data=>data);
            console.log(petitionSum[0],'----sumTotalComprasFn ------  2')
            setSumTotalCompra(petitionSum[0]['total_compras'])
         }catch(err){
            console.error('Error fetch /sumTotalComprasFn')
         }
      
      }
      
      const sumCajaEftFn = async () =>{
      
         try{

            let petitionSum = await fetch(`${URLhost}/total_caja_eft`).then(res=>res.json()).then(data=>data);
            console.log(petitionSum[0],'.....sumCajaEftFn  .----- 3')
            setSumCajaEft(petitionSum[0]['total_efectivo'])
         }catch(err){
            console.error('Error fetch /sumCajaEftFn')
         }
      
      }
      
      const sumCajaTarFn = async () =>{
         
         try{

            let petitionSum = await fetch(`${URLhost}/total_caja_tar`).then(res=>res.json()).then(data=>data);
            console.log(petitionSum[0],'--...--sumCajaTarFn  -----   4')
            setSumCajaTar(petitionSum[0]['total_tarjeta'])   
         }catch(err){
            console.error('Error fetch /sumCajaTarFn')
         }
      
      }
      sumTotalCajasFn()
      sumTotalComprasFn()
      sumCajaEftFn()
      sumCajaTarFn()
   },[URLhost])



   return(
      <main className="main main_inicio">
      <h2 className="h2_main_inicio">Estadisticas del comercio</h2>
      <div className="container_boxs">
         <section className="box_exibition">
            <article className="article_box_exibition_container">
               <h4 className="h4_box_exibition">Ventas</h4>
               <p className="total_inicio total_sell_inicio">{`${sumTotalCaja}`}</p>
            </article>
            <article className="article_box_exibition_container">
               <article className="article_box_exibition">
                  <p className="p_article_box_exibition">Efectivo</p>
                  <p className="value_detail_inicio total_Caja_eft">{`${sumCajaEft}`}</p>
               </article>
               <article className="article_box_exibition">
                  <p className="p_article_box_exibition">Tarjeta</p>
                  <p className="value_detail_inicio total_Caja_tar">{`${sumCajaTar}`}</p>
               </article>
            </article>
         </section>
         <section className="box_exibition">
            <article className="article_box_exibition_container">
               <h4 className="h4_box_exibition">Compras</h4>
               <p className="total_inicio total_buy_inicio">{`${sumTotalCompra}`}</p>
            </article>
            <article className="article_box_exibition_container_buy">
               <Link to={`table/compras`} className="btn_rounded_long">Ver detalles de compras</Link>   
            </article>
         </section>
      </div>
   </main>


   )
}

export default InicioFn