

const getBaseUrl = () => {
  // Si estamos en localhost con Vite (puerto 5173), usar backend local
  if (window.location.origin.includes('localhost:5173')) {
    return 'http://localhost:3210';
  }
  // En producción (Heroku), usar el mismo origen
  return window.location.origin;
};




export const getPilotsNum = async (category = "") => {
  console.log('Called','getPilotsNum')
  const url = new URL("/view_num_pilots", getBaseUrl());
  if (category) url.searchParams.set("category", category);

  const response = await fetch(url);
  return response.json();
};

export const getPilots = async ({
  category = "",
  id_pilot = "",
  name_pilot = "",
  surname = ""
} = {}) => {

  // console.log('getPilots params:', {
  //   category,
  //   id_pilot,
  //   name_pilot,
  //   surname
  // });
  

  //const url = new URL("/view_pilots", window.location.origin);
  //const url = new URL("/view_pilots", "http://localhost:3210");
  const url = new URL("/view_pilots", getBaseUrl());

  if (category && category.trim() !== "") {
    url.searchParams.set("category", category.trim());
  }

  if (id_pilot && String(id_pilot).trim() !== "") {
    url.searchParams.set("id_pilot", String(id_pilot).trim());
  }

  if (name_pilot && name_pilot.trim() !== "") {
    url.searchParams.set("name", name_pilot.trim());
  }

  if (surname && surname.trim() !== "") {
   url.searchParams.set("surname", surname.trim());
  }

    console.log('getPilots params:', { category, id_pilot, name_pilot, surname });
    console.log('getPilots URL:', url.toString());


  const response = await fetch(url);
  console.log(response)
  return response.json();
};

export const getCategories = async () => {
console.log('Called','getCategories')
   const url = new URL("/category", getBaseUrl());
   const response = await fetch(url);
   return  response.json();
}

export const getEvent = async () => {

  console.log('Called','getEvent')
     const response = await fetch(`/circuits_calendar`);
      return response.json(); 

}

export const getUsersPilots = async () => {
  console.log('Called','getUsersPilots')
  const response = await fetch(`/users_pista`);
  return response.json();
}

export const infoPilot = async (category, numPilot) => {

  const url = new URL("/info_pilot", getBaseUrl());

  url.searchParams.set("category",category);
  url.searchParams.set("num_pilot",Number(numPilot));
  
  const response = await fetch(url)
  
  return response.json()
}

export const deletePilot = async (id) => {

  const response = await fetch(
    "/delete_pilot",
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      message: data?.error || "Error al eliminar piloto"
    };
  }

  return {
    status: response.status,
    data
  };
};









