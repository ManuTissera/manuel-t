import { useEffect, useMemo, useState } from "react";
import { getRecordsTires } from "../helpers/tires_registry.js";
import rejectFile from "../assets/reject-cross-file.svg";

const ModalLoadRecord = ({ infoLoad = [], onCancel }) => {
  const [dataTire, setDataTire] = useState(null);

  const errorNum = infoLoad?.[0]?.err_num;
  const errorCode = infoLoad?.[0]?.err_code;

  console.log('errorCode',infoLoad)

  const numTire = useMemo(() => {
    if (errorNum === "81001") return infoLoad?.[0]?.used?.[0]?.tire ?? null;
    return null;
  }, [errorNum, infoLoad]);


  useEffect(() => {
    const load = async () => {
      if (!numTire) return;

      const data = await getRecordsTires("", "", numTire);

      // si viene array de filas, agarrá la primera
      const row = Array.isArray(data) ? data[0] : data;

      setDataTire(row ?? null);
    };

    load();
  }, [numTire]);

  console.log(dataTire)

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        // className="container-modal container-modal-load"
        className="container-modal midium-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-img-container">
          <img src={rejectFile} alt="Reject File" />
        </div>
        <div className="modal-header">
            <button className="modal-close" onClick={onCancel}>
              ×
            </button>
      
            <h4 className="h4-modal-header-error ">Registro no cargado!</h4>
      
        </div>
        {errorNum === "90091" ? (
          <div className="modal-text">
          <p>
            Error: {errorCode}
            <br />
            El piloto{" "}
            <strong>{`${infoLoad?.[1]?.name} ${infoLoad?.[1]?.surname}`}</strong>
            {" - "}Numero: <strong>{infoLoad?.[1]?.number_pilot}</strong>
            <br />
            Categoria: <strong>{infoLoad?.[1]?.category}</strong>
            <br />
            No puede cargar mas registros para esta fecha
          </p>
          </div>
        ) : errorNum === "81001"?(
          <div className="modal-text">
              <p>La cubierta - <strong>N° {numTire}</strong> - ya esta asignada.</p>
            
              <p>Piloto:{" "}
                 <strong>{`${dataTire?.pilot_name ?? ""} ${dataTire?.surname ?? ""}`}</strong>  -  
                  {dataTire?.category}  -  {`${dataTire?.event ?? ""}`}
              </p>
          </div>
        ) : (
            /* CASO GENÉRICO: Para todos los demás errores */
            <div className="modal-text">
              <p>Ocurrió un error inesperado al procesar la solicitud.</p>
              {errorCode && <p>Código de error: <strong>{errorCode}</strong></p>}
            </div>
          )
        
        }








        <div className="modal-warning">
          <span className="warning-icon">!</span>
          <p>
            <strong>Warning</strong>
            <br />
            {`${infoLoad?.[0]?.error}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalLoadRecord;
