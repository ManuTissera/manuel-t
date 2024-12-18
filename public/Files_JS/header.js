

const aside = document.querySelector('.aside');
const menu_burger = document.querySelector('.menu_burger');
const close_aside = document.querySelector('.close_aside');


const name_profile_aside = document.querySelector('.name-profile-aside');
const name_profile_header = document.querySelector('.name-profile-header');
const category_profile_aside = document.querySelector('.category-profile-aside');
const category_profile_header = document.querySelector('.category-profile-header');

// name_profile_aside.textContent = 'Tissera, Jose Manuel'
// category_profile_aside.textContent = 'Administrador'
// name_profile_header.textContent = 'Tissera, Jose Manuel'
// category_profile_header.textContent = 'Administrador'

const URLQueryHeader = window.location.origin;


menu_burger.addEventListener("click",()=>{
   aside.style.left = "0rem";
})

close_aside.addEventListener("click",()=>{
   aside.style.left = "-100%";

})


window.addEventListener('resize', (e) => {
   const viewportWidth = window.innerWidth;

   if(viewportWidth >= 880){
      console.log('agrandar')
      aside.style.left = "0rem";

      return
   }
   
})


// const getDataPersonalUser = async () =>{

//    let personalResult = await fetch(`${URLQueryHeader}/view_personal`).then(res=>res.json()).then(data=>data)

//    console.log(personalResult);
// }

// getDataPersonalUser();