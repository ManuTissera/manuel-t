import { useEffect, useState } from "react";
import { getEvent } from "../helpers/pilots.js";

const SelectEvetn = ({ value, onChangeEvent, nameClass }) => {
  const [eventArr, setEventArr] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getEvent();
      setEventArr(Array.isArray(data) ? data : []);
    };
    load();
  }, []);

  return (
    <label className={`label-select-${nameClass}`}>
      <span className={`span-${nameClass}`}>Fecha:</span>
      <select 
        value={value}
        onChange={(e) => onChangeEvent(e.target.value)}
        className={`select-${nameClass}`}
        >
        <option value="">Fecha Evento</option>
        {eventArr.map((e) => (
          <option value={e.id_event} key={e.id_event}>
            {e.event} - {e.name_circuits}
            {/* {e.event} */}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectEvetn;
