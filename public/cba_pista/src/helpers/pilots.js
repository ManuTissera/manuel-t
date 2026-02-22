

export const getPilotsNum = async (category = "") => {
  const url = new URL("http://localhost:8181/view_num_pilots");
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
  

  const url = new URL("http://localhost:8181/view_pilots");

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

  //  console.log('getPilots params:', { category, id_pilot, name_pilot, surname });
  //  console.log('getPilots URL:', url.toString());


  const response = await fetch(url);
  return response.json();
};

export const getCategories = async () => {

   const url = new URL(`http://localhost:8181/category`)
   const response = await fetch(url)
   return  response.json()
}

export const getEvent = async () => {
     const response = await fetch(`http://localhost:8181/circuits_calendar`)
      return response.json() 

}

export const getUsersPilots = async () => {
  const response = await fetch(`http://localhost:8181/users_pista`)
  return response.json()
}

export const infoPilot = async (category, numPilot) => {

  const url = new URL(`http://localhost:8181/info_pilot`)

  url.searchParams.set("category",category);
  url.searchParams.set("num_pilot",Number(numPilot));
  
  const response = await fetch(url)
  
  return response.json()
}

export const deletePilot = async (id) => {

  const response = await fetch(
    "http://localhost:8181/delete_pilot",
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









