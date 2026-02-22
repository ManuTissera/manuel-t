
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
  const url = new URL("http://localhost:8181/tires_registry");

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

  
  export const deleteRecordTires = async (arrIds) => {
  console.log(arrIds,'<- Front')
  const response = await fetch(
    'http://localhost:8181/delete_register_tire',
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ registry_ids: arrIds })
    }
  );

  return response.json();
};





