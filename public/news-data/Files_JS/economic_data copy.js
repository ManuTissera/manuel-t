
const container_content_table_economic_calenda = document.querySelector('.container_content_table_economic_calenda');

// ==================================  ELEMENTOS FORMULARIO =====================================

const btn_add_new_ec = document.querySelector('.btn_add_new_ec');
const container_form_ec = document.querySelector('.container_form_ec');
const inp_form_date = document.querySelector('.inp_form_date');
const select_form_hour = document.querySelector('.select_form_hour');
const inp_form_actual = document.querySelector('.inp_form_actual');
const inp_form_expected = document.querySelector('.inp_form_expected');
const inp_form_previous = document.querySelector('.inp_form_previous');
const container_select_from_title = document.querySelector('.container_select_from_title');
const btn_form_add = document.querySelector('.btn_form_add');
const btn_form_add_cancel = document.querySelector('.btn_form_add_cancel');

// ===================================    ELEMENTO FILTER   ===============================================

const btn_filter_close = document.querySelector('.btn_filter_close');
const select_filter = document.querySelector('.select_filter');
const filter_day_from = document.querySelector('.filter_day_from');
const filter_month_from = document.querySelector('.filter_month_from');
const filter_year_from = document.querySelector('.filter_year_from');
const filter_day_to = document.querySelector('.filter_day_to');
const filter_month_to = document.querySelector('.filter_month_to');
const filter_year_to = document.querySelector('.filter_year_to');
const filter_error_p = document.querySelector('.filter_error_p');
const btn_filter = document.querySelector('.btn_filter');
const article_filter_table = document.querySelector('.article_filter_table');
const btn_apply_filter = document.querySelector('.btn_apply_filter');

// ===================================    FOOTER TABLE   ===============================================

const section_foot_select = document.querySelector('.section_foot_select');
const check_foot = document.querySelectorAll('.check-foot');

const select_form_title = document.querySelector('.select_form_title');

let herokuHost = 'https://newsdata-a69c2abdc5b9.herokuapp.com/'


let numberResult = 25;
let resultShow = 25;

const validateWhere = () =>{

  const fromFilter = `${filter_year_from.value}-${(filter_month_from.value).padEnd(2,0)}-${(filter_day_from.value).padStart(2,0)}`;
  const toFilter = `${filter_year_to.value}-${(filter_month_to.value).padEnd(2,0)}-${(filter_day_to.value).padStart(2,0)}`;

  if(fromFilter.includes('--')){
    if(toFilter.includes('--')){
      console.log('No se agrrgaron filtros')
    }else{
      article_filter_table.style.display = "none";
      return `WHERE ec.publication_date < '${toFilter}';`;
    }
  }else{
    if(toFilter.includes('--')){
      article_filter_table.style.display = "none";
      return `WHERE ec.publication_date > '${fromFilter}';`;
    }else{
      if(fromFilter > toFilter){
        filter_error_p.style.display = 'block';
      }else{
        console.log('Es menor y correcto')
        article_filter_table.style.display = "none";
        return `WHERE ec.publication_date > '${fromFilter}' AND ec.publication_date < '${toFilter}';`;
      }
    }
  }


}

const filterFn = async () =>{

    const fromFilter = `${filter_year_from.value}-${(filter_month_from.value).padEnd(2,0)}-${(filter_day_from.value).padStart(2,0)}`;
    const toFilter = `${filter_year_to.value}-${(filter_month_to.value).padEnd(2,0)}-${(filter_day_to.value).padStart(2,0)}`;

    console.log(`Desde ${fromFilter} to ${toFilter}`)

    // const petitionFilter = await fetch(`http://localhost:3000/filter_news_calendar`,{
    //                 method:'POST',
    //                 body:JSON.stringify({
    //                     "from":`${fromFilter}`,
    //                     "to":`${toFilter}`
    //                 }),
    //                 headers:{'Content-type':'application/json'}}).then(res=>res.json()).then(res=>res);

    // console.log(petitionFilter);
            
    // container_content_table_economic_calenda.innerHTML = '';

    // const documentFragmentFilter = document.createDocumentFragment();

    // for(news of petitionFilter){
                
    //         let date = ((news.publication_date).match(/\w+\-(\w+)\-(\w{2})/ig)).join();
    //         let year = (date.match(/\w{4}/g)).join()
    //         let month = (date.match(/\-\w{2}\-/g)).join()
    //         let day = (date.match(/\-\w{2}/g)[1]).match(/\w{2}/g)[0];
    //         let title = (news.new_name)
    //         let value = news.new_value;
    //         let actual = news.actual_value;
    //         let expected = news.expected_value;
    //         let previous = news.previous_value;
    //         let site = news.new_site;

    //         let li = document.createElement('li');
    //         li.classList.add("row_table_ec");
        
    //         li.innerHTML= `
    //                         <div class="table-cell ec-date">${day+month+year}</div>
    //                         <div class="table-cell ec-name">${title}</div>
    //                         <div class="table-cell ec-import">${value}</div>
    //                         <div class="table-cell ec-actual">${actual}</div>
    //                         <div class="table-cell ec-expected">${expected}</div>
    //                         <div class="table-cell ec-previos">${previous}</div>
    //                         <div class="table-cell"><a class="link_web_new" href="${site}"><img src="../Assets/world_link.svg" alt=""></a></div>
    //                         <div class="table-cell"><a class="link_table" href="./tabla.html?${news.id_new_name}"><img src="../Assets/table_edit.svg" alt=""></a></div>
                        
    //         `
    //         documentFragmentFilter.appendChild(li);

    // };
    // container_content_table_economic_calenda.appendChild(documentFragmentFilter);

}

const insertDataForm = async (select) =>{

    console.log(`CORREGIR      2024-09-18 Inventarios de petróleo crudo de la AIE 0.8330  0.9000 -6.8730`)

    // fetch(`http://localhost:3000/add_new_news`,{
    //     method: 'POST',
    //     body: JSON.stringify({
    //         "publication_date":`${inp_form_date.value}`,
    //         "publication_time":`${select_form_hour.value}`,
    //         "actual_value":`${inp_form_actual.value}`,
    //         "expected_value":`${inp_form_expected.value}`,
    //         "previous_value":`${inp_form_previous.value}`,
    //         "id_new_name":`${select.value}`
    //     }),
    //     headers:{'Content-Type': 'application/json'}
    // }).then(res=>res.text()).then(res=>console.log(res));

    const datos = `
            inp_form_date = ${inp_form_date.value}
            select_form_hour = ${select_form_hour.value}
            inp_form_actual = ${inp_form_actual.value}
            inp_form_expected = ${inp_form_expected.value}
            inp_form_previous = ${inp_form_previous.value}
            inp_form_id_new_name = ${select.value}

            ----------------------------------------------------

            "publication_date":${inp_form_date.value}
            "publication_time":${select_form_hour.value}
            "actual_value":${inp_form_actual.value}
            "expected_value":${inp_form_expected.value}
            "previous_value":${inp_form_previous.value}
            "id_new_name":${select.value}
        `;
        console.log(datos)
}

const viewDataNews = async () =>{


    let petition = await fetch(`http://localhost:3000/view_news`).then(res=>res.json()).then(res=>res);

    for(let news of petition){

        const option_form_name = document.createElement("OPTION");
        option_form_name.textContent = news.new_name;
        option_form_name.value = news.id_new_name;

    select_form_title.appendChild(option_form_name);
        //console.log(news);
    }

    // container_select_from_title.appendChild(select_form_title)

    btn_form_add.addEventListener("click",()=>{
        insertDataForm(select_form_title)
    })
}

const viewNewsCalendar = async (show,quant) =>{

    
    let petition = await fetch(`https://newsdata-a69c2abdc5b9.herokuapp.com/view_news_calendar`,{
                        method:'POST',
                        headers: {'Content-type':'application/json'}
                    }).then(res=>res.json()).then(res=>res)

    container_content_table_economic_calenda.innerHTML = '';

    let numShow = (show == undefined) ? 25 : show
    let numQuant = (quant == undefined) ? 0 : numShow - quant

    const documentFragmentNews = document.createDocumentFragment();

            for(let i = numQuant; i < numShow; i++){

                let news = petition[i];
                        
                try{
                    let date = ((news.publication_date).match(/\w+\-(\w+)\-(\w{2})/ig)).join();
                    let year = (date.match(/\w{4}/g)).join()
                    let month = (date.match(/\-\w{2}\-/g)).join()
                    let day = (date.match(/\-\w{2}/g)[1]).match(/\w{2}/g)[0];
                    let title = (news.new_name)
                    let value = news.new_value;
                    let actual = news.actual_value;
                    let expected = news.expected_value;
                    let previous = news.previous_value;
                    let site = news.new_site;

                    let li = document.createElement("li");
                    li.classList.add('row_table_ec');

                    li.innerHTML = `
                                    <div class="table-cell ec-date">${day+month+year}</div>
                                    <div class="table-cell ec-name">${title}</div>
                                    <div class="table-cell ec-import">${value}</div>
                                    <div class="table-cell ec-actual">${actual}</div>
                                    <div class="table-cell ec-expected">${expected}</div>
                                    <div class="table-cell ec-previos">${previous}</div>
                                    <div class="table-cell"><a class="link_web_new" href="${site}"><img src="../Assets/world_link.svg" alt=""></a></div>
                                    <div class="table-cell"><a class="link_table" target="_blank" href="./tabla.html?${news.id_new_name}"><img src="../Assets/table_edit.svg" alt=""></a></div>
                                
                    `
                    documentFragmentNews.appendChild(li);
                }catch(e){
                    console.error(`Problemas con el id${news.id_new_name}`)
                    continue
                }

            };
           container_content_table_economic_calenda.appendChild(documentFragmentNews);
}



btn_add_new_ec.addEventListener("click",()=>{
    container_form_ec.style.right = "0rem";

});

btn_form_add.addEventListener("click",()=>{
    container_form_ec.style.right = "-100%";
    console.log('apretao')
})

btn_form_add_cancel.addEventListener("click",()=>{
    container_form_ec.style.right = "-100%";
})

btn_filter.addEventListener("click",()=>{
    article_filter_table.style.display = "block";
})

btn_filter_close.addEventListener("click",()=>{
    filter_day_from.value = '--'
    filter_month_from.value = '--'
    filter_year_from.value = '----'
    filter_day_to.value = '--'
    filter_month_to.value = '--'
    filter_year_to.value = '----'
    filter_error_p.style.display = "none";
    article_filter_table.style.display = "none";
})

btn_apply_filter.addEventListener("click",()=>{
    // filterFn();
    validateWhere();
    
})

section_foot_select.addEventListener("change",(e)=>{
  let num = Number(e.target.value)
  console.log(`Esta es la cantidad de elementos ${num}`)
  resultShow = num;
  numberResult = num;
  viewNewsCalendar(resultShow,numberResult)
  
})


check_foot.forEach(radio =>{
  radio.addEventListener("click",(e)=>{
    let value = e.target.value;
    if(value == 'next_page'){
      resultShow = resultShow + numberResult;
      viewNewsCalendar(resultShow,numberResult)      
    }else if(value == 'previous_page'){
      resultShow = (resultShow == 25) ? resultShow : resultShow - numberResult;
      viewNewsCalendar(resultShow,numberResult)
    }else if(value == 'first_page'){
      resultShow = 25;
      numberResult = 25;
      viewNewsCalendar(resultShow,numberResult)
    }else if(value == 'last_page'){
      console.log('Ira a la ultima pantalla')
    }
    console.log(`NumberResults = ${numberResult}
      ResultShow = ${resultShow}`)
  })
})


//viewDataNews();
viewNewsCalendar();


