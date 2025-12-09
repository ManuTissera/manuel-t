

const btn_add_profile        = document.getElementById('btn_add_profile');
const addProfileFirstName    = document.getElementById('add-profile-firstName');
const addProfileLastName     = document.getElementById('add-profile-lastName');
const addProfileGender       = document.getElementById('add-profile-gender');
const addProfileBirthDate    = document.getElementById('add-profile-birthDate');
const addProfileAge          = document.getElementById('add-profile-age');
const addProfileNationalId   = document.getElementById('add-profile-nationalId');
const addProfileEmail        = document.getElementById('add-profile-email');
const addProfilePhone        = document.getElementById('add-profile-phone');
const addProfileAddress      = document.getElementById('add-profile-address');
const addProfileCategory     = document.getElementById('add-profile-category');
const addProfilePlan         = document.getElementById('add-profile-plan');
const addProfileAdmisionDate = document.getElementById('add-profile-admissionDate');
const addProfileHeight       = document.getElementById('add-profile-height');
const addProfileWeight       = document.getElementById('add-profile-weight');



btn_add_profile.addEventListener("click",(e) => {


   if(
      addProfileFirstName.value == "" ||
      addProfileLastName.value == "" ||
      addProfileGender.value == "" ||
      addProfileBirthDate.value == "" ||
      addProfileNationalId.value == "" ||
      addProfileHeight.value == "" ||
      addProfileWeight.value == "" 
   ){
      console.log("Missed data")
   }else{

   

   const addNewProfileFn = async () => {
   const respo = await fetch(`http://localhost:3111/patient_data/add_profile`, {
     method: 'POST',
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       "first_name": addProfileFirstName.value,
       "last_name": addProfileLastName.value,
       "age": addProfileAge.value,
       "height": addProfileHeight.value,
       "weight": addProfileWeight.value,
       "birth_date": addProfileBirthDate.value,
       "admission_date": addProfileAdmisionDate.value,
       "gender": addProfileGender.value,
       "category": addProfileCategory.value,
       "plan": addProfilePlan.value,
       "email": addProfileEmail.value,
       "phone": addProfilePhone.value,
       "address": addProfileAddress.value,
       "nationalId": addProfileNationalId.value
     })
   });
      const data = await respo.json();
      return data
   }

   addNewProfileFn().then(res => console.log(res));

   }

})



   //console.log("first_name",addProfileFirstName.value);
   //console.log("last_name",addProfileLastName.value);
   //console.log("age",addProfileAge.value);
   //console.log("height",addProfileHegiht.value);
   //console.log("weight",addProfileWeight.value);
   //console.log("birth_date",addProfileBirthDate.value);
   //console.log("admission_date",addProfileAdmisionDate.value);
   //console.log("gender",addProfileGender.value);
   //console.log("category",addProfileCategory.value);
   //console.log("plan",addProfilePlan.value);
   //console.log("email",addProfileEmail.value);
   //console.log("phone",addProfilePhone.value);
   //console.log("address",addProfileAddress.value);
   //console.log("nationalId",addProfileNationalId.value);

// WITH new_patient AS (
//   INSERT INTO patient_data (
//     first_name,
//     last_name,
//     age,
//     height,
//     weight,
//     birth_date,
//     admission_date,
//     gender,
//     category,
//     plan,
//     email,
//     phone,
//     address,
//     nationalId
//   ) VALUES (
//     'Manuel',
//     'Tissera',
//     29,
//     178,
//     70,
//     '1993-09-27',
//     CURRENT_DATE,
//     'M',
//     'Civil',
//     'Aumento MM',
//     'manu@example.com',
//     '+39 345 6677 221',
//     'Via Roma 123, Campobasso, Italia',
//     '30.999.999'
//   )
//   RETURNING id
// )

// INSERT INTO measurements (patient_id, series, measurement_date)
// SELECT id, series_num, CURRENT_DATE
// FROM new_patient,
// LATERAL (VALUES (1), (2), (3), (4), (5), (6)) AS s(series_num);




