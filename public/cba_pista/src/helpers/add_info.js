import { getUsersPilots } from "./pilots";


const getBaseUrl = () => {
  // Si estamos en localhost con Vite (puerto 5173), usar backend local
  if (window.location.origin.includes('localhost:5173')) {
    return 'http://localhost:3210';
  }
  // En producción (Heroku), usar el mismo origen
  return window.location.origin;
};

export const addNewRecord = async (payload) => {
  console.log('Ejecutado el POST');

  const url = new URL('/add_register_tire', getBaseUrl());
  const token = localStorage.getItem('token'); // ✅ obtener token

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`  // ✅ enviarlo
    },
    body: JSON.stringify(payload)
  });

  return res.json();
};



// add_info.js
export const addNewPilot = async (payload) => {

  console.log(payload)

  const token = localStorage.getItem('token');
  const url = `${getBaseUrl()}/add_new_pilot`;

  const res = await fetch(url, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data?.error,
      status: res.status
    };
  }

  return {
    status: res.status,
    data
  };
};

export const newActivity = async (payload) => {

  console.log('New Activity ---> ',payload)

  const url =  new URL('/start_load_records', getBaseUrl());
  const token = localStorage.getItem('token');

  const res = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
     },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  return data;

}


export const finishRunRecord = async (payload) => {

  console.log('add_info.js ---> ',payload)

  const url = new URL("/finish_load_records", getBaseUrl());
  const token = localStorage.getItem('token');
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`  

    },
    body: JSON.stringify(payload)
  });

  const data = await response.json()

  return data;

}


export const logout = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${getBaseUrl()}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Error al cerrar sesión' };
    }

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    return { success: true };

  } catch {
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};

