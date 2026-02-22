import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { infoPilot, getEvent, getCategories } from "../helpers/pilots.js";
import { addNewRecord } from "../helpers/add_info.js";

import SelectPilots from "../components/SelectPilots.jsx";
import ModalLoadRecord from "../components/ModalLoadRecord.jsx";
import ModalSuccesLoad from "../components/ModalSuccesLoad.jsx";
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
    loadInfo();
  }, []);

  useEffect(() => {
    if (!category) return;

    const loadPilotInfo = async () => {
      const data = await infoPilot(category, pilotNumber);
      const dataCalendar = await getEvent();
      setEventData(dataCalendar[1]);
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
    if (!category || !pilotNumber) return console.log('Falta categoria o piloto');
    if (!eventData?.id_event) return console.log('No hay eventData');

    const tiresArr = WHEELS.map(k => tires[k]);
    if (tiresArr.some(v => v === "")) return console.log('Faltan cubiertas');

    const payload = {
      id_pilot: Number(pilotNumber),
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
      console.log('RESP', data);

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
      setEventData("");
      setTires(WHEELS.reduce((acc, k) => ((acc[k] = ""), acc), {}));

      const d = new Date();
      const pad = (n) => String(n).padStart(2, "0");
      setDateTime(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`);

    } catch (err) {
      console.log('ERROR submit:', err?.message || err);
    }
  };

  return (
    <>
      <div className="header-card-form-nr">
        <h3 className="title-nr">Agregar Registro</h3>
        <Link to="/records_tires" className="btn-head-form-records">Ver Registros</Link>
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
            <span className="label">Categoria</span>
            <select
              className="input category_select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Seleccionar Categoria</option>
              {categories.map((c) => (
                <option key={c.category} value={c.category}>
                  {c.category || "Seleccionar"}
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
            <span className="label">Nombre</span>
            <input
              className="input name_inp"
              type="text"
              value={`${infoPilotData?.name ?? ""} ${infoPilotData?.surname ?? ""}`}
              readOnly
            />
          </label>

          <label className="field">
            <span className="label">Auto</span>
            <input
              className="input car_inp"
              type="text"
              value={infoPilotData?.car_model ?? ""}
              readOnly
            />
          </label>

          <label className="field">
            <span className="label">Fecha</span>
            <input
              className="input date_inp"
              type="datetime-local"
              value={dateTime}
              readOnly
            />
          </label>

          <label className="field field--full">
            <span className="label">Evento</span>
            <input
              className="input event_inp"
              type="text"
              value={`${eventData?.event ?? ""} - ${eventData?.name_circuits ?? ""}`}
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
                    className="btn-scan"
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
          <button type="button" className="btn-add btn-submit" onClick={onSubmit}>
            Cargar
          </button>
        </div>
      </form>

      <BarcodeScannerModal
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        onResult={handleScanResult}
      />
    </>
  );
}