


const getBaseUrl = () => {
  // Si estamos en localhost con Vite (puerto 5173), usar backend local
  if (window.location.origin.includes('localhost:5173')) {
    return 'http://localhost:3210';
  }
  // En producción (Heroku), usar el mismo origen
  return window.location.origin;
};


//Iniciar sescion de carga 

export const checkLoadStatus = async () => {
  
  const url = new URL('/check_load_status', getBaseUrl());
  const response = await fetch(url);

  // if(!Array.isArray(response)){
  //   console.log('No es un array')
  // }else{
  //   console.log('Es un Array');
  // }

  return response.json();
}

export const startLoadRecord = async () => {
  const url = new URL("/start_load_records", getBaseUrl());
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Cambiado de .json() a .text() porque el back envía texto plano
  return response.text(); 
}

export const getRecordsTires = async (idPilot, idEvent, numTire) => {
  const hasNumTire =
    numTire !== undefined &&
    numTire !== null &&
    String(numTire).trim() !== "";

  const hasIdPilot =
    idPilot !== undefined &&
    idPilot !== null &&
    String(idPilot).trim() !== "";

  const hasIdEvent =
    idEvent !== undefined &&
    idEvent !== null &&
    String(idEvent).trim() !== "";

  // OJO: poné el endpoint correcto
  const url = new URL("/tires_registry", getBaseUrl());

  // 1) Si hay tire_param, no mandamos nada más
  if (hasNumTire) {
    url.searchParams.set("tire_param", String(numTire));
  } else {
    // 2) Si no hay tire_param, podemos mandar:
    // - id_Pilot + id_Event
    // - solo id_Pilot
    // - solo id_Event
    if (hasIdPilot) url.searchParams.set("id_Pilot", String(idPilot));
    if (hasIdEvent) url.searchParams.set("id_Event", String(idEvent));
  }

  const response = await fetch(url);
  return response.json();
};


export const editRecordTires = async (idRegistry, tires) => {
  // tires: [{ position: 'N1', tire_number: 384 }, ...]

  const url = new URL('/edit_register_tire', getBaseUrl());
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ id_registry: idRegistry, tires })
    });

    const data = await response.json();
    return data;

  } catch(err) {
    // return err;
  }
};


// Funcion Delete con validacion de usuario
export const deleteRecordTires = async (arrIds) => {


  const url = new URL('/delete_register_tire', getBaseUrl());
  const token = localStorage.getItem('token'); // ← AGREGAR
  
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ← AGREGAR
      },
      body: JSON.stringify({ registry_ids: arrIds })
    });
    
    if (!response.ok) {
      const error = await response.json();
      return error;
    }
    
    return response.json();
  } catch(err) {
    return err;
  }
};





