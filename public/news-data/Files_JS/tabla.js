



// const container_box_data_table = document.querySelector('.container_box_data_table');
const container_content_table_news = document.querySelector('.container_content_table_news');
const id_new_URL = ((window.location.search).match(/\w/g)).join('');
const btn_download = document.querySelector('.btn_download');

// ==================== MODAL DELETE ==================

const btn_delete = document.querySelector('.btn_delete');
const modal_delete = document.querySelector('.modal_delete');
const p_msg_delete = document.querySelector('.p_msg_delete');
const btn_cancel_del = document.querySelector('.btn_cancel_del');
const btn_acept_del = document.querySelector('.btn_acept_del');
const bakground_opacity_modal = document.querySelector('.bakground_opacity_modal');

// ==================== ELEMENTOS DATOS TITULO ==================

const container_box_data_table = document.querySelector('.container_box_data_table');

// ==================== ELEMENTOS FORMULARIO ==================

const container_form_nn = document.querySelector('.container_form_nn');
const inp_form_nn_date = document.querySelector('.inp_form_nn_date');
const select_form_nn_hour = document.querySelector('.select_form_nn_hour');
const inp_form_actual = document.querySelector('.inp_form_actual');
const inp_form_expected = document.querySelector('.inp_form_expected');
const inp_form_previous = document.querySelector('.inp_form_previous');
const add_btn_form = document.querySelector('.add_btn_form');
const btn_form_nn = document.querySelector('.btn_form_nn');
const btn_close_form = document.querySelector('.btn_close_form');
const bakground_opacity = document.querySelector('.bakground_opacity');

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

const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const URL_query = window.location.origin;
console.log(id_new_URL);

const viewNewsTable = async () =>{
    
    let resultQuery = await fetch(`${URL_query}/view_news_table/${id_new_URL}`).then(res=>res.json()).then(data=>data);

    container_content_table_news.innerHTML = '';

    for(results of resultQuery){
        let id = results.id_ec_data;
        let date = ((results.publication_date).match(/\w+\-(\w+)\-(\w{2})/ig)).join();
        let year = (date.match(/\w{4}/g)).join()
        let month = (date.match(/\-\w{2}\-/g)).join()
        let day = (date.match(/\-\w{2}/g)[1]).match(/\w{2}/g)[0];
        let hour = results.publication_hour;
        let actual = Number(results.actual_value).toFixed(3);
        let expected = Number(results.expected_value).toFixed(3);
        let previous = Number(results.previous_value).toFixed(3);

        const row_table_news = document.createElement("ARTCILE");
        row_table_news.classList.add("row_table_news");

        row_table_news.innerHTML = `
                   <label class="label_table_news lab_hour"><input class="inp_checkbox_nn" value="${id}" type="checkbox"></label>
                <label class="label_table_news lab_date">${day+month+year}</label>
                <label class="label_table_news lab_hour">14:30</label>
                <label class="label_table_news lab_actual"><p>${actual}</p></label>
                <label class="label_table_news lab_expected">${expected}</label>
                <label class="label_table_news lab_previous">${previous}</label>

        `
        container_content_table_news.appendChild(row_table_news);

    }

}

const viewDataTitle = async () =>{

    let resultQuery = await fetch(`${URL_query}/view_data_title/${id_new_URL}`).then(res=>res.json()).then(data=>data);

    let articleContent = document.createElement("ARTICLE");
    articleContent.classList.add("article_content");
    let titulo = resultQuery[0].new_name;
    let estrellas = resultQuery[0].new_value;

    articleContent.innerHTML = `
        <span><h3 class="h3_box_data_table">${titulo}</h3></span>
        <span class="span_box_data">
            <p class="p_box_data">Valoraciona economica: <p class="stars_value">${estrellas}</p></p>
            <p class="p_box_data">Publicación: Mensual</p>
        </span>
    `
    container_box_data_table.appendChild(articleContent);

}

const addNewNews = async () =>{

    let date = inp_form_nn_date.value
    let hour = select_form_nn_hour.value
    let actualValue = inp_form_actual.value
    let expectedValue = inp_form_expected.value
    let previousValue = inp_form_previous.value
  
      if(date === '' || hour === '' || actualValue === '' || expectedValue === '' || previousValue === ''){
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
                          "id_new_name" : `${id_new_URL}`,
                        }),
                        headers: {'Content-type':'application/json'}
                      }).then(res=>res.text()).then(data=>data);
  
      console.log(resultQuery)
      window.location.reload();
      }

  
}

const filterDate = async (where) =>{
  
  let resultQuery = await fetch(`${URL_query}/filter_data_titulos/${id_new_URL}`,{
        method: 'POST',
        body: JSON.stringify({
          "whereData":`${where}`,
        }),
        headers: {'Content-type':'application/json'}
  }).then(res=>res.json()).then(data=>data);

  container_content_table_news.innerHTML = '';


  for(results of resultQuery){
    let id = results.id_ec_data;
    let date = ((results.publication_date).match(/\w+\-(\w+)\-(\w{2})/ig)).join();
    let year = (date.match(/\w{4}/g)).join()
    let month = (date.match(/\-\w{2}\-/g)).join()
    let day = (date.match(/\-\w{2}/g)[1]).match(/\w{2}/g)[0];
    let hour = results.publication_hour;
    let actual = Number(results.actual_value).toFixed(3);
    let expected = Number(results.expected_value).toFixed(3);
    let previous = Number(results.previous_value).toFixed(3);

    const row_table_news = document.createElement("ARTCILE");
    row_table_news.classList.add("row_table_news");

    row_table_news.innerHTML = `
               <label class="label_table_news lab_hour"><input class="inp_checkbox_nn" value="${id}" type="checkbox"></label>
            <label class="label_table_news lab_date">${day+month+year}</label>
            <label class="label_table_news lab_hour">14:30</label>
            <label class="label_table_news lab_actual"><p>${actual}</p></label>
            <label class="label_table_news lab_expected">${expected}</label>
            <label class="label_table_news lab_previous">${previous}</label>

    `
    container_content_table_news.appendChild(row_table_news);

}

  console.log(resultQuery);
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
      let whereStr = `AND publication_date <= '${toFilter}'`;
      filterDate(whereStr);
      return whereStr;
    }
  }else{
    if(toFilter.includes('--')){
      filter_error_p.style.display = 'none';
      article_filter_table.style.display = "none";
      let whereStr = `AND publication_date >= '${fromFilter}'`;
      filterDate(whereStr);
      return whereStr;
    }else{
      if(fromFilter > toFilter){
        filter_error_p.style.display = 'block';
      }else{
        filter_error_p.style.display = 'none';
        article_filter_table.style.display = "none";
        let whereStr = `AND publication_date >= '${fromFilter}' AND publication_date <= '${toFilter}'`;
        filterDate(whereStr);
        return whereStr;
      }
    }
  }


}

const deleteDataFn = async (arrChecked) =>{

    (await arrChecked).forEach(idCheck =>{

      console.log(idCheck)
      let resultQuery = fetch(`${URL_query}/delete_data_new`,{
        method: 'DELETE',
        body: JSON.stringify({
          "idDelete": idCheck,
        }),
        headers:{'Content-type':'application/json'}
      }).then(res=>res.text()).then(data=>data);
      
      console.log(resultQuery);
      window.location.reload();
    })
}

const getIdDelData = async () =>{
  const valorCheck = document.querySelectorAll('.inp_checkbox_nn:checked');
  const arrChecked = Array.from(valorCheck).map(checkbox => checkbox.value);


  if(valorCheck.length == 0){
    p_msg_delete.textContent = "No se han seleccionado casiilas para eliminar "
  }else if(valorCheck.length == 1){

      arrChecked.forEach((idCheck) =>{
        p_msg_delete.innerText = `Desea eliminar el item con el ID: - ${idCheck} - ?\nEsta acción no puede deshacerse.`
      });

      console.log('Se elimino uno solo')
      
      return arrChecked;

  }else{

      let fraseUno = document.createElement('span');
      fraseUno.innerText = `Deseas eliminar los items con IDs: -`

      p_msg_delete.appendChild(fraseUno);

      arrChecked.forEach((idCheck) =>{
        let palabra = document.createElement('span')
        palabra.innerText = `${idCheck} - `;

        p_msg_delete.appendChild(palabra);
    });

        let fraseDos = document.createElement('span');
        fraseDos.innerText = `?\n Esta acción no se puede deshacer.`

        p_msg_delete.appendChild(fraseDos);

        console.log('Se eliminaron varios')

        return arrChecked;
  }
}

const downloadFile = async () =>{

    let resultQuery = await fetch(`${URL_query}/download_news_data/${id_new_URL}`)
                      .then(response =>{
                        if(!response.ok) throw new Error ('Error al descargar el archivo SQL');
                        return response.blob();
                      })
                      .then(blob =>{
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `news_data_id${id_new_URL}.sql`;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(url);
                      })
                      .catch(error => console.error('Error: ',error));
}

add_btn_form.addEventListener("click",()=>{
  container_form_nn.style.right = "0rem";
  bakground_opacity.style.display = "block";
  btn_close_form.style.display = "inline-block";
})

btn_close_form.addEventListener("click",()=>{
  container_form_nn.style.right = "-100%";
  bakground_opacity.style.display = "none";
  btn_close_form.style.display = "none";
})

btn_form_nn.addEventListener("click",()=>{
    addNewNews();
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
    article_filter_table.style.display = "none";
    console.log(validateWhere());
})

btn_delete.addEventListener("click", async ()=>{
  bakground_opacity_modal.style.display = "flex";
  modal_delete.style.display = "flex";
  await getIdDelData();
})

btn_acept_del.addEventListener("click", async ()=>{
  bakground_opacity_modal.style.display = "none";
  modal_delete.style.display = "none";
  deleteDataFn(getIdDelData())
})

btn_cancel_del.addEventListener("click",()=>{
  p_msg_delete.innerHTML = '';
  bakground_opacity_modal.style.display = "none";
  modal_delete.style.display = "none";
})

btn_download.addEventListener("click",()=>{
  console.log('Vas a descargar algo ');
  downloadFile();
})

viewDataTitle();
viewNewsTable();

