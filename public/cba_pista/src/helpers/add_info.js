export const addNewRecord = async (payload) => {

   console.log('Ejecutado el POST')
   const url = new URL('http://localhost:8181/add_register_tire')

   const res = await fetch(url, {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(payload)
   })

   return res.json()
}


// add_info.js
export const addNewPilot = async (payload) => {

  const url = new URL("http://localhost:8181/add_new_pilot");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
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





