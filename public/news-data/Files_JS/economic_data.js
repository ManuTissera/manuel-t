
const container_content_table_economic_calenda = document.querySelector('.container_content_table_economic_calenda');
const spinner_background = document.querySelector('.spinner-background');
const bakground_opacity = document.querySelector('.bakground_opacity');


// ==================================  ELEMENTOS FORMULARIO =====================================

const btn_add_new_ec = document.querySelector('.btn_add_new_ec');
const container_form_ec = document.querySelector('.container_form_ec');
const inp_form_date = document.querySelector('.inp_form_date');
const select_form_hour = document.querySelector('.select_form_hour');
const inp_form_actual = document.querySelector('.inp_form_actual');
const inp_form_expected = document.querySelector('.inp_form_expected');
const inp_form_previous = document.querySelector('.inp_form_previous');
const select_form_title = document.querySelector('.select_form_title');
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
const section_foot_article_data = document.querySelector('.section_foot_article_data');
const check_foot = document.querySelectorAll('.check-foot');

let herokuHost = 'https://newsdata-a69c2abdc5b9.herokuapp.com/'

let URL_local = 'http://localhost:3000';

let URL_query = window.location.origin;


const widthSmartPhone = window.matchMedia("(max-width: 440px)");
let quantDefault = (widthSmartPhone.matches)? 8 : 25;
let resultShow = quantDefault;

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const viewTitles = async () =>{
  
  let resultQuery = await fetch(`${URL_query}/view_name_news`).then(res=>res.json()).then(data=>data);

  for(titleName of resultQuery){

    const option_form_name = document.createElement('OPTION');
    option_form_name.classList.add('option_form_name');
    option_form_name.textContent = titleName.new_name;
    option_form_name.value = titleName.id_new_name;

    select_form_title.appendChild(option_form_name);
  }

}

const viewNewsCalendar = async (show,last) =>{

  spinner_background.style.display = "flex";

  let petition = await fetch(`${URL_query}/view_news_calendar`,{
                method:'POST',
                body: JSON.stringify({
                  "timeZone": userTimeZone,
                }),
                headers: {'Content-type':'application/json'}
            }).then(res=>res.json()).then(res=>res)

      container_content_table_economic_calenda.innerHTML = '';
      
      let quantElement = (last == 'ultima pagina') ? petition.length : quantDefault;
      let searchTo = (show == undefined) ? quantElement : show;
      let searchFrom = (show == undefined) ? 0 : searchTo - quantElement;

            console.log(`
              Num. Shown = ${quantDefault}
              From       = ${searchFrom}
              To         = ${searchTo}
              Total      = ${petition.length}
              Last       = ${quantElement}
              `);
      
      const documentFragmentNews = document.createDocumentFragment();
      
      for(let i = searchFrom; i < searchTo; i++){
      
      let news = petition[i];
          
      try{
          let date = ((news.publication_date).match(/\w+\-(\w+)\-(\w{2})/ig)).join();
          let year = (date.match(/\w{4}/g)).join()
          let month = (date.match(/\-\w{2}\-/g)).join()
          let day = (date.match(/\-\w{2}/g)[1]).match(/\w{2}/g)[0];
          let title = (news.new_name)
          let value = news.new_value;
          let actual = Number(news.actual_value).toFixed(2);
          let expected = Number(news.expected_value).toFixed(2);
          let previous = Number(news.previous_value).toFixed(2);
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
                          <div class="table-cell"><a class="link_table" target="_blank" href="./tabla.html?${news.id_new_name}"><img src="../Assets/table_edit.svg" alt=""></a></div>
                          <div class="table-cell"><a class="link_web_new" href="${site}"><img src="../Assets/world_link.svg" alt=""></a></div>

          `
          documentFragmentNews.appendChild(li);
      }catch(e){
          console.error(`Problemas con el id${news.id_new_name}`)
          continue
      }
      
      };
      container_content_table_economic_calenda.appendChild(documentFragmentNews);

      const numDataPage = `<p class="section_foot_article_data_p">${searchFrom + 1} - ${searchTo} of ${petition.length}</p>`;
      section_foot_article_data.innerHTML = numDataPage;

      spinner_background.style.display = "none";
    
}

const filterFn = async (where) =>{


  const petitionFilter = await fetch(`${URL_query}/filter_news_calendar`,{
                        method:'POST',
                        body: JSON.stringify({
                          "whereData":`${where}`,
                          "timeZone":`${userTimeZone}`,
                        }),
                        headers: {'Content-type':'application/json'}
                    }).then(res=>res.json()).then(res=>res)

  console.log(where)
  console.log(petitionFilter);
          
  container_content_table_economic_calenda.innerHTML = '';

  const documentFragmentFilter = document.createDocumentFragment();

  for(news of petitionFilter){
              
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

          let li = document.createElement('li');
          li.classList.add("row_table_ec");
      
          li.innerHTML= `
                          <div class="table-cell ec-date">${day+month+year}</div>
                          <div class="table-cell ec-name">${title}</div>
                          <div class="table-cell ec-import">${value}</div>
                          <div class="table-cell ec-actual">${actual}</div>
                          <div class="table-cell ec-expected">${expected}</div>
                          <div class="table-cell ec-previos">${previous}</div>
                          <div class="table-cell"><a class="link_table" href="./tabla.html?${news.id_new_name}"><img src="../Assets/table_edit.svg" alt=""></a></div>
                          <div class="table-cell"><a class="link_web_new" href="${site}"><img src="../Assets/world_link.svg" alt=""></a></div>
                      
          `
          documentFragmentFilter.appendChild(li);

  };
  container_content_table_economic_calenda.appendChild(documentFragmentFilter);

}

const validateWhere = () =>{

  const fromFilter = `${filter_year_from.value}-${(filter_month_from.value).padStart(2,0)}-${(filter_day_from.value).padStart(2,0)}`;
  const toFilter = `${filter_year_to.value}-${(filter_month_to.value).padStart(2,0)}-${(filter_day_to.value).padStart(2,0)}`;


  if(fromFilter.includes('--')){
    if(toFilter.includes('--')){
      console.log('No se agrrgaron filtros')
    }else{
      filter_error_p.style.display = 'none';
      article_filter_table.style.display = "none";
      let whereStr = `WHERE ec.publication_date <= '${toFilter}'`;
      filterFn(whereStr);
      return whereStr;
    }
  }else{
    if(toFilter.includes('--')){
      filter_error_p.style.display = 'none';
      article_filter_table.style.display = "none";
      let whereStr = `WHERE ec.publication_date >= '${fromFilter}'`;
      filterFn(whereStr);
      return whereStr;
    }else{
      if(fromFilter > toFilter){
        filter_error_p.style.display = 'block';
      }else{
        filter_error_p.style.display = 'none';
        article_filter_table.style.display = "none";
        let whereStr = `WHERE ec.publication_date >= '${fromFilter}' AND ec.publication_date <= '${toFilter}'`;
        filterFn(whereStr);
        return whereStr;
      }
    }
  }


}

const addNewNews = async () =>{

  let date = inp_form_date.value;
  let hour = select_form_hour.value;
  let actualValue = inp_form_actual.value;
  let expectedValue = inp_form_expected.value;
  let previousValue = inp_form_previous.value;
  let title = select_form_title.value;

    if(date === '' || hour === '' || actualValue === '' || expectedValue === '' || previousValue === '' || title === '' ){
      console.log('Hay un dato vacio')
    }else{

    let resultQuery = await fetch(`${URL_query}/add_new_news`,{
                      method:'POST',
                      body: JSON.stringify({
                        "date" : `${date}`,
                        "time" : `${hour}`,
                        "actual" : `${actualValue}`,
                        "expected" : `${expectedValue}`,
                        "previous" : `${previousValue}`,
                        "id_new_name" : `${title}`,
                      }),
                      headers: {'Content-type':'application/json'}
                    }).then(res=>res.text()).then(data=>data);

    console.log(resultQuery)
    }

}


btn_filter.addEventListener("click",()=>{
  article_filter_table.style.display = "block";
  bakground_opacity.style.display = "block";
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
  bakground_opacity.style.display = "none";
})

btn_apply_filter.addEventListener("click",()=>{
    validateWhere();
    article_filter_table.style.display = "none";
    bakground_opacity.style.display = "none";
})

btn_add_new_ec.addEventListener("click",()=>{
  viewTitles();
  container_form_ec.style.display = "flex";
  container_form_ec.style.right = "0rem";
  bakground_opacity.style.display = "block";
})

btn_form_add.addEventListener("click",()=>{
  addNewNews()
  container_form_ec.style.right = "-100%";
  bakground_opacity.style.display = "none";
})

btn_form_add_cancel.addEventListener("click",()=>{
  container_form_ec.style.right = "-100%";
  bakground_opacity.style.display = "none";
})




section_foot_select.addEventListener("change",(e)=>{
  let num = Number(e.target.value)
  //console.log(`Esta es la cantidad de elementos ${num}`)
  resultShow = num;
  quantDefault = num;
  viewNewsCalendar(resultShow)
  
})


check_foot.forEach(radio =>{
  radio.addEventListener("click",(e)=>{
    let value = e.target.value;
    if(value == 'next_page'){
      resultShow = resultShow + quantDefault;
      viewNewsCalendar(resultShow)      
    }else if(value == 'previous_page'){
      resultShow = (resultShow == quantDefault) ? resultShow : resultShow - quantDefault;
      console.log(resultShow);
      viewNewsCalendar(resultShow)
    }else if(value == 'first_page'){
      resultShow = quantDefault;
      viewNewsCalendar(resultShow)
    }else if(value == 'last_page'){
      //viewNewsCalendar(null,'ultima pagina')
    }
    // console.log(`NumberResults = ${quantDefault}
    //   ResultShow = ${resultShow}`)
  })
})

viewNewsCalendar();
