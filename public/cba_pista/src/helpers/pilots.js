

const getBaseUrl = () => {
  // Si estamos en localhost con Vite (puerto 5173), usar backend local
  if (window.location.origin.includes('localhost:5173')) {
    return 'http://localhost:3210';
  }
  // En producción (Heroku), usar el mismo origen
  return window.location.origin;
};


export const getActiveUsers = async () => {
  console.log('Usuarios get ejecutado');

  try {
    const url = new URL("/get_user_active", getBaseUrl());
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

        // Si es 401, retornar objeto vacío sin lanzar error
    if (response.status === 401) {
      console.log('Usuario no autenticado (público)');
      return 'Usuario no autenticado'
    }

    if (!response.ok) {
      return { error: 'No hay usuario autenticado' }
      // throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error en getActiveUsers:', error);
    throw error; // Lanza el error para manejarlo en el front
  }
};

export const getRunStatus = async () => {

  const url = new URL('/run_status', getBaseUrl());
  const response = await fetch(url);
  return response.json();


}

export const getPilotsNum = async (category = "") => {
  console.log('Called','getPilotsNum')
  const url = new URL("/view_num_pilots", getBaseUrl());
  if (category) url.searchParams.set("category", category);  // BORRAR ESTO
  console.log('📤 Parámetros enviados /view_num_pilots:', { category });

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
   const url = new URL("/get_category", getBaseUrl());
   const response = await fetch(url);
   return  response.json();
}

export const getEvent = async () => {

  const url = new URL(`/circuits_calendar`,getBaseUrl())

  const response = await fetch(url);
  return response.json(); 

}

export const getUsersPilots = async () => {
  console.log('Called','getUsersPilots')
  const response = await fetch(`/users_pista`);
  return response.json();
}

export const infoPilot = async (category, numPilot) => {
  console.log('getInfoPilot',category,numPilot)

  const url = new URL(`/info_pilot`, getBaseUrl());

  url.searchParams.set("category",category);
  url.searchParams.set("num_pilot",Number(numPilot));

    // 👇 VER QUÉ PARÁMETROS ESTÁN LLEGANDO
  // console.log('📤 Parámetros enviados:', { category, numPilot });
  // console.log('📤 URL completa:', url.toString());
  // console.log('📤 Search params:', url.searchParams.toString());
  
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









