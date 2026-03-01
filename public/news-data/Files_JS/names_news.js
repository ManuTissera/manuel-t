


const body_table_news_name = document.querySelector('.body_table_news_name');


const URL_query = window.location.origin;


const viewTitles = async () =>{
  
    let resultQuery = await fetch(`${URL_query}/view_name_news`).then(res=>res.json()).then(data=>data);
  
    for(titleName of resultQuery){
        console.log(titleName);

        let id = titleName.id_new_name;
        let acronimo = titleName.new_ac;
        let name = titleName.new_name;
        let site = titleName.new_site;
        let value = titleName.new_value;

        const row_table_news_name = document.createElement("ARTICLE");
        row_table_news_name.classList.add("row_table_news_name");

        row_table_news_name.innerHTML = `
            
            <div class="element_row_news_name"><p class="p_row_news_name">${id}</p></div>
            <div class="element_row_news_name"><p class="p_row_news_name">${name} </p></div>
            <div class="element_row_news_name"><p class="p_row_news_name">${value} </p></div>
            <div class="element_row_news_name"><p class="p_row_news_name">Mensual</p></div>
            <div class="element_row_news_name"><a class="a_row_news_name" href="./tabla.html?${id}"><img class="" src="../Assets/table_edit.svg"></a></div>
            <div class="element_row_news_name"><a class="a_row_news_name" href=""><img class="" src="../Assets/world_link.svg"></a></div>
        `;

        body_table_news_name.appendChild(row_table_news_name);


    //   const option_form_name = document.createElement('OPTION');
    //   option_form_name.classList.add('option_form_name');
    //   option_form_name.textContent = titleName.new_name;
    //   option_form_name.value = titleName.id_new_name;
  
    //   select_form_title.appendChild(option_form_name);
    }
  
  }

viewTitles();
