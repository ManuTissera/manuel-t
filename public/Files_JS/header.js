

const name_profile_aside = document.querySelector('.name-profile-aside');
const name_profile_header = document.querySelector('.name-profile-header');
const category_profile_aside = document.querySelector('.category-profile-aside');
const category_profile_header = document.querySelector('.category-profile-header');

name_profile_aside.textContent = 'Tissera, Jose Manuel'
category_profile_aside.textContent = 'Administrador'
name_profile_header.textContent = 'Tissera, Jose Manuel'
category_profile_header.textContent = 'Administrador'

const URLQueryHeader = window.location.origin;




const getDataPersonal = async () =>{

   let personalResult = await fetch(`${URLQueryHeader}/view_personal`).then(res=>res.json()).then(data=>data)

   console.log(personalResult);
}

getDataPersonal();