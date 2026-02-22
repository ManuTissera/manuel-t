import { useEffect, useMemo, useState } from "react";
import { getRecordsTires } from "../helpers/tires_registry.js";
import rejectFile from "../assets/reject-cross-file.svg";

const ModalLoadRecord = ({ infoLoad = [], onCancel }) => {
  const [dataTire, setDataTire] = useState(null);

  const errorNum = infoLoad?.[0]?.err_num;
  const errorCode = infoLoad?.[0]?.err_code;

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
        className="container-modal container-modal-load"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onCancel}>
          ×
        </button>

        <div className="modal-header">
          <img src={rejectFile} alt="Reject File" />
        </div>

        <h2>No se Cargo el Registro</h2>

        {errorNum === "90091" ? (
          <p className="modal-text">
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
        ) : (
          <p className="modal-text">
            La cubierta <strong>N° {numTire}</strong> ya esta asignada.
            <br />
            Piloto:{" "}
            <strong>{`${dataTire?.pilot_name ?? ""} ${dataTire?.surname ?? ""}`}</strong>  -  
             {dataTire?.category}  -  {`${dataTire?.event ?? ""}`}
          </p>
        )}

        <div className="modal-warning">
          <span className="warning-icon">!</span>
          <p>
            <strong>Warning</strong>
            <br />
            {`${infoLoad?.[0]?.err_num} - ${infoLoad?.[0]?.error}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalLoadRecord;
