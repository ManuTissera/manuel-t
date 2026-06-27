
const btn_add_title = document.querySelector('.btn_add_title');


arrHojas = ['avgearm','avgearnings','conf_board','cpi_mom','cpi_sub_mom','cpi_sub_yoy','cpi_yoy','dgo_mom','dgo_s_mom','ex_hosa',
    'ex_hosa_mom','gdp','inv_cruds_iea','ipi','iprim','iprix','labforpart','mpi_ism','newjobclaims','new_hosa_mom','new_ho_sa','nmpi_ism',
    'nofarmpay','nonfarmpriv','pce_anual','pce_mom','pce_per','pce_yoy','per_spend','phila_fim','pig_gdp','pmi_index','pmi_manfact',
    'pmi_service','pmi_syp','ppi','ppi_sub','ret_sales','riforectast','sales_r_mom','unemprate','us_un_ben_rene'];
    
const addTitle = (new_name,new_ac,new_value) =>{

    fetch(`http://localhost:3025/add_titles`,{
        method:'POST',
        body:JSON.stringify({
            "new_name":`${new_name}`,
            "new_ac":`${new_ac}`,
            "new_value2":`${new_value}`
        }),
        headers:{'Content-type':'application/json'}
    })
    .then(res=>res.text())
    .then(res=>console.log(res));
};

const addTitleFn = () =>{

    nombres = [
        'Índice de precios del sector manufacturero ISM',
        'Índice de precios de exportación (Mensual)',
        'Cambio del empleo no agrícola ADP',
        'Confianza del consumidor de The Conference Board',
        'Gasto personal (Mensual)',
        'Indice de precios de bienes y servicios incluidos en el PIB (Trimestral) (2T)',
        'Índice de precios de exportación (Mensual)',
        'Índice de Precios de Importación (Mensual)',
        'Índice de Precios del Gasto en Consumo Personal (PCE) (Mensual)',
        'Índice de precios PCE (Anual)',
        'Índice de producción industrial (Mensual)',
        'Índice ISM de empleo en el sector no manufacturero',
        'Índice ISM de precios del sector no manufacturero',
        'Índice manufacturero de la Fed de Filadelfia',
        'Ingresos medios por hora (interanual) (Anual)',
        'Ingresos medios por hora (Mensual)',
        'Inventarios de petróleo crudo de la AIE',
        'IPC (Anual)',
        'IPC (Mensual)',
        'IPC subyacente (Anual)',
        'IPC subyacente (Mensual)',
        'IPP (Mensual)',
        'IPP subyacente (Mensual)',
        'Nóminas no agrícolas',
        'Nóminas privadas no agrícolas',
        'Nuevas peticiones de subsidio por desempleo',
        'Pedidos de bienes duraderos (Mensual)',
        'Pedidos de bienes duraderos (subyacente) (Mensual)',
        'PIB (Trimestral) (2T)',
        'PMI compuesto de S&P Global',
        'PMI de servicios',
        'PMI manufacturero',
        'PMI manufacturero del ISM',
        'PMI no manufacturero del ISM',
        'Precios del gasto en consumo personal subyacente (Anual)',
        'Precios del gasto en consumo personal subyacente (Mensual)',
        'Previsiones de ventas de la industria minorista (Mensual)',
        'Renovaciones de los subsidios por desempleo',
        'Tasa de desempleo',
        'Tasa de participación laboral',
        'Ventas de viviendas de segunda mano',
        'Ventas de viviendas de segunda mano (Mensual)',
        'Ventas de viviendas nuevas',
        'Ventas de viviendas nuevas (Mensual)',
        'Ventas minoristas (Mensual)',
        'Ventas minoristas subyacentes (Mensual)'];
    
    
        let acronimos = [
            'MPI-(ISM)',
            'IPRIX',
            'Ch_e_Na_ADP',
            'Conf-Board',
            'Per-Spend',
            'PIG-GDP',
            'IPREM',
            'IPRIM',
            'PCE-Per',
            'PCE-Anual',
            'IPI',
            'NMENM-(ISM)',
            'NMPI-(ISM)',
            'Phila-FIM',
            'AvgEarning',
            'AvgEar(M)',
            'Inv-Crud-IEA',
            'CPI-YoY',
            'CPI-MoM',
            'CPI-Sub-YoY',
            'CPI-Sub-MoM',
            'PPI',
            'PPI-Sub',
            'NoFarmPay',
            'NonFarmPriv',
            'NewJobClaims',
            'DGO-MoM',
            'DGO(S)-MoM',
            'GDP',
            'PMI-SyP',
            'PMI-Service',
            'PMI-Manfact',
            'PMI_man_ISM',
            'PMI_no_man_ISM',
            'PCE-YoY',
            'PCE-MoM',
            'RIForectast',
            'US-Un_Ben_Rene',
            'UnempRate',
            'LabForPart',
            'Ex-HoSa',
            'Ex-HoSa-MoM',
            'New-Ho_Sa',
            'New-HoSa-MoM',
            'Ret-Sales',
            'Sales-R-MoM'];

    for(let i = 0;i < nombres.length;i++ ){
        
        let titile = nombres[i].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        let acron = acronimos[i];
        let valo = null;

        //console.log(titile, ' ', acron);
        //addTitle('Manuel','Tissera','Lo+');
        addTitle(titile,acron,valo);
    }

}


btn_add_title.addEventListener("click",()=>{
    console.log('Fijate que estas apretando cualquier cosa, salame!')
    //+addTitleFn();
})

