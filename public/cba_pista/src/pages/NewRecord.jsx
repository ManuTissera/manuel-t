import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { infoPilot, getEvent, getCategories, getRunStatus } from "../helpers/pilots.js";
import { addNewRecord } from "../helpers/add_info.js";

import SelectPilots from "../components/SelectPilots.jsx";
import AlertBanner from '../components/AlertBanner.jsx';
import ModalLoadRecord from "../components/ModalLoadRecord.jsx";
import ModalSuccesLoad from "../components/ModalSuccesLoad.jsx";
import ModalLoadStartRecord from '../components/ModalStartLoad.jsx';
import BarcodeScannerModal from "../components/BarcodeScannerModal.jsx";

const WHEELS = ["N1", "N2", "N3", "N4", "N5", "N6"];

export default function NewRecordForm() {
  const [scanOpen, setScanOpen] = useState(false);
  const [scanKey, setScanKey] = useState(null);

  const [showModalSucces, setShowModalSucces] = useState(false);
  const [showModalUnload, setShowModalUnload] = useState(false);
  const [infoPilotData, setinfoPilotData] = useState({});
  const [infoModalLoad, setInfoModalLoad] = useState([]);
  const [pilotNumber, setPilotNumber] = useState("");
  const [categories, setCateogries] = useState([]);
  const [eventData, setEventData] = useState("");
  const [category, setCategory] = useState("");
  const [statusRun, setStatusRun] = useState([]); // 'statusRun' es 'loadStatus' en las otras
  
  const [showModalLoader, setShowModalLoader] = useState(false);
  const [refreshKey, setRefreshKey] = useState(true);



  const [dateTime, setDateTime] = useState(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  });

  const [tires, setTires] = useState(() =>
    WHEELS.reduce((acc, k) => ((acc[k] = ""), acc), {})
  );

        useEffect(() => {
          const loadInfo = async () => {
            const dataCategories = await getCategories();
            setCateogries(dataCategories);

          };
          const loadStatus = async () => {
            const data = await getRunStatus();
            setStatusRun(data);
            // setEventData(`${data[0]?.event} - ${data[0]?.name_circuits}`)
            setEventData(Array.isArray(data)?data[0]:[])
          }
          loadInfo();
          loadStatus();

        }, []);


        useEffect(() => {
                const loadStatus = async () => {
                  const data = await getRunStatus();
                  setStatusRun(data);
                }
                loadStatus();
        }, [refreshKey]);
  


        useEffect(() => {
          if (!category || category == 'select') return;

          console.log('Info Piloto','category =',category,'Numero = ',pilotNumber)
        
          const loadPilotInfo = async () => {
            const data = await infoPilot(category, pilotNumber);
            const dataCalendar = await getEvent();
            console.log('data ==> ', data)
            setinfoPilotData(data?.[0] ?? {});
          };
          loadPilotInfo();
        }, [pilotNumber, category]);

  const onChangeTire = (key, value) => {
    setTires((prev) => ({ ...prev, [key]: value }));
  };

  // === SCAN HELPERS (ACÁ, fuera de onSubmit) ===
  const openScan = (key) => {
    setScanKey(key);
    setScanOpen(true);
  };

  const handleScanResult = (text) => {
    const onlyDigits = String(text).match(/\d+/g)?.join("") ?? "";
    if (!onlyDigits || !scanKey) return;

    onChangeTire(scanKey, onlyDigits);
    setScanOpen(false);
  };
  // ============================================

  const onSubmit = async () => {

    console.log('El eventData del submit',eventData.id_event)
    console.log('Category',category,'piloto',infoPilotData?.id)

    if (!category || !infoPilotData?.id) return console.log('Falta categoria o piloto');
    if (!eventData?.id_event) return console.log('No hay eventData');

    const tiresArr = WHEELS.map(k => tires[k]);
    if (tiresArr.some(v => v === "")) return console.log('Faltan cubiertas');

    const payload = {
      id_pilot: Number(infoPilotData?.id),
      id_event: Number(eventData.id_event),
      dateInp: dateTime,
      N1_tire: Number(tires.N1),
      N2_tire: Number(tires.N2),
      N3_tire: Number(tires.N3),
      N4_tire: Number(tires.N4),
      N5_tire: Number(tires.N5),
      N6_tire: Number(tires.N6),
    };

    if ([
      payload.id_pilot, payload.id_event,
      payload.N1_tire, payload.N2_tire, payload.N3_tire,
      payload.N4_tire, payload.N5_tire, payload.N6_tire
    ].some(Number.isNaN)) {
      return console.log('Hay valores no numéricos en payload');
    }

    try {
      const data = await addNewRecord(payload);
      // console.log('RESP', data);

      if ("ok" in data) {
        setShowModalSucces(true);
      } else if ("error" in data) {
        setInfoModalLoad([data, infoPilotData]);
        setShowModalUnload(true);
      }

      if (!data?.ok && !data?.registry_id) return;

      setCategory("select");
      setPilotNumber("");
      setinfoPilotData({});
      setTires(WHEELS.reduce((acc, k) => ((acc[k] = ""), acc), {}));

      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      setDateTime(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`);

    } catch (err) {
      console.log('ERROR submit:', err?.message || err);
    }
  };

    // console.log('infoPilotData',infoPilotData)

  return (
    <>



      {showModalLoader && (
        <ModalLoadStartRecord
          statusData={statusRun}
          onCancel={() => {
            setShowModalLoader(false);
            setRefreshKey(prev => !prev); // Cambia true->false o false->true
          }}
        />
      )}



      {/* <div className="header-card-form-nr">
        <h3 className="title-nr">Agregar Registro</h3>
        <Link to="/records_tires" className="btn-head-form-records">Ver Registros</Link>
      </div> */}

      <div className="back-ground-ui"></div>

      <div className="container-form-all">

            <div className="header-card-form-second">
              {/* <div className="header-tables"> */}
                <div className="ca-header">
                <h4 className="ca-title" >Nuevo Registro</h4>
                {/* <div className="header-tables-status"> */}

                  {/* <div className="header-tables-status"> */}
                    {statusRun.length === 0 ? (
                      <button className="action-btn" onClick={() => setShowModalLoader(true)}>Iniciar Ronda Nueva</button>
                    ) : (
                      <>
                        <p className="ca-eyebrow ca-eyebrow-table ">Fecha actual</p>
                        <p className="ca-subtitle">{`${statusRun[0]?.event} - ${statusRun[0]?.name_circuits}`}</p>
                      </>
                    )}
                  {/* </div>
                
                </div> */}
              </div>
            </div>




      {showModalUnload && (
        <ModalLoadRecord
          infoLoad={infoModalLoad}
          onCancel={() => setShowModalUnload(false)}
        />
      )}

      {showModalSucces && (
        <ModalSuccesLoad
          onClose={() => setShowModalSucces(false)}
        />
      )}

      <form className="card-nr" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="grid">
          <label className="field">
            <span className="ca-label">Categoria</span>
            <select
              className="input category_select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Seleccionar Categoria</option>
              {categories.map((c) => (
                <option key={c.id_category} value={c.id_category}>
                  {c.category_name || "Seleccionar"}
                </option>
              ))}
            </select>
          </label>

          <SelectPilots
            category={category}
            onChagePilot={(e) => setPilotNumber(e)}
            nameClass={"records_form"}
            pilotNumber={pilotNumber}
          />

          <label className="field">
            <span className="ca-label">Nombre</span>
            <input
              className="input name_inp"
              type="text"
              value={`${infoPilotData?.name ?? ""} ${infoPilotData?.surname ?? ""}`}
              readOnly
            />
          </label>

          <label className="field">
            <span className="ca-label">Auto</span>
            <input
              className="input car_inp"
              type="text"
              value={infoPilotData?.car_model ?? ""}
              readOnly
            />
          </label>

          <label className="field">
            <span className="ca-label">Fecha</span>
            <input
              className="input date_inp"
              type="datetime-local"
              value={dateTime}
              readOnly
            />
          </label>

          <label className="field field--full">
            <span className="ca-label">Evento</span>
            <input
              className="input event_inp"
              type="text"
              // value={`${eventData?.event ?? ""} - ${eventData?.name_circuits ?? ""}`}
              value={`${statusRun[0]?.event} - ${statusRun[0]?.name_circuits}`}
              readOnly
            />
          </label>

          <div className="container-number-wheels">
            {WHEELS.map((k) => (
              <label className="field field-N" key={k}>
                <span className="label label-N">{k}</span>

                <div className="inp-scan-wrap">
                  <input
                    className={`input input-N ${k}`}
                    type="text"
                    value={tires[k]}
                    onChange={(e) => onChangeTire(k, e.target.value)}
                  />

                  <button
                    type="button"
                    className="btn-scan action-btn"
                    onClick={() => openScan(k)}
                  >
                    Scan
                  </button>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="actions">
          <button type="button" className="submit-btn" onClick={onSubmit}>
            Cargar
          </button>
        </div>
      </form>

      <BarcodeScannerModal
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        onResult={handleScanResult}
      /> 
      </div>
    </>
  );
}