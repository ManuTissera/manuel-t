import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import "../Files_CSS/recordsTable.css";

import { getRecordsTires, deleteRecordTires } from "../helpers/tires_registry.js";

import printIcon from "../assets/print-icon.svg";
import downloadIcon from "../assets/download-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";

import SelectTires from "../components/SelectTires.jsx";
import ModalDeleteRecord from "../components/ModalDeleteRecord.jsx";
import SelectSarchCategory from "../components/SearchCategoryPilot.jsx";
import SelectPilots from "../components/SelectPilots.jsx";
import SelectEvetn from "../components/selectEvent.jsx";

const RecordTabel = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [recordsArr, setRecordsArr] = useState([]);
  const [pilotsArr, setPilotsArr] = useState("");
  const [eventArr, setEventArr] = useState("");
  const [selected, setSelected] = useState([]);
  const [numTire, setNumTire] = useState("");
  const [categorySelcted, setCategorySelected] = useState("select");

  // Pagination (front)
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const total = recordsArr.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageRecords = useMemo(() => {
    return recordsArr.slice(start, end);
  }, [recordsArr, start, end]);

  const onChangeFn = (val) => {
    setCategorySelected(val);
  };

  const onChangePilot = (val) => {
    setNumTire("");
    setPilotsArr(val);
  };

  const onChangeEvent = (val) => {
    setEventArr(val);
  };

  const onChangeTiresFn = (val) => {
    setEventArr("");
    setCategorySelected("select");
    setPilotsArr("");
    setNumTire(val);
  };

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const load = async () => {
      const data = await getRecordsTires(pilotsArr, eventArr);
      setRecordsArr(Array.isArray(data) ? data : []);
      setPage(1);
    };
    load();
  }, []);

  const functionSearch = async () => {
    const data = await getRecordsTires(pilotsArr, eventArr, numTire);
    setRecordsArr(Array.isArray(data) ? data : []);
    setPage(1);
  };

  const deleteFunction = async () => {
    await deleteRecordTires(selected);

    const data = await getRecordsTires("", "", "");
    setRecordsArr(Array.isArray(data) ? data : []);

    setSelected([]);
    setShowDeleteModal(false);
    setPage(1);
  };

  const showAll = async () => {
    setCategorySelected("select");
    setPilotsArr("");
    setEventArr("");
    setNumTire("");
    const data = await getRecordsTires("", "", "");
    setRecordsArr(Array.isArray(data) ? data : []);
    setPage(1);
  };

  console.log("Records Table")

  return (
    <>
      {showDeleteModal && (
        <ModalDeleteRecord
          ids={selected}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={deleteFunction}
        />
      )}
        <div className="contaienr-table-records">

      <div className="container-table">
        <div className="toolbar-container">
          <div className="toolbar-records">
            <h3>Tabla de Registros</h3>
            <div className="toolbar-left">
              <Link to="/" className="btn btn-add-record mobile-none child-nowrap">
                Agregar Registro
              </Link>

              <div className="icon-group">
                <button className="icon-btn mobile-none">
                  <img src={printIcon} alt="Print" />
                </button>

                <button className="icon-btn">
                  <img src={downloadIcon} alt="Download" />
                </button>

                <button
                  className="icon-btn"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={!selected.length}
                >
                  <img src={deleteIcon} alt="Delete" />
                </button>

                <button className="btn dropdown bnt-showall child-nowrap" onClick={showAll}>
                  Ver Todo
                </button>
              </div>
            </div>

          <div className="midle-bar tablet-screen"></div>


            <div className="toolbar-right">
              <nav className="nav-filter-toolbar-right">
                <p className="p-toolbar-right child-nowrap">Filtrar Registro:</p>

                <SelectSarchCategory
                  onChangeFn={onChangeFn}
                  value={categorySelcted}
                  nameClass={"toolbar-records"}
                />

                <SelectPilots
                  category={categorySelcted}
                  onChagePilot={onChangePilot}
                  nameClass={"toolbar-records"}
                />

                <SelectEvetn
                  onChangeEvent={onChangeEvent}
                  value={eventArr}
                  nameClass={"toolbar-records"}
                />
              </nav>

              <button className="btn dropdown" onClick={functionSearch}>
                Filtrar
              </button>
            </div>
          </div>

          <div className="midle-bar"></div>

          <div className="table-controls-records">
            {/* <div className="entries">
              <span>Show</span>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <span>entries</span>

              <span style={{ marginLeft: 12 }}>
                {total === 0 ? "0" : `${start + 1}-${Math.min(end, total)}`} of{" "}
                {total}
              </span>
            </div> */}

            <div className="search-container">
              <span className="span-search view-element">Buscar Cubierta:</span>

              <SelectTires onChangeTires={onChangeTiresFn} />

              <button className="btn btn-search" onClick={functionSearch}>
                Buscar
              </button>
            </div>
          </div>
        </div>

          
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Piloto</th>
                  <th>Categoria</th>
                  <th>Fecha</th>
                  <th>Date</th>
                  <th>Hora</th>
                  <th>N 1</th>
                  <th>N 2</th>
                  <th>N 3</th>
                  <th>N 4</th>
                  <th>N 5</th>
                  <th>N 6</th>
                </tr>
              </thead>
    
          {/* <div className="table-body-scroll"> */}
    
              <tbody className="table-body-scroll" >
                {pageRecords.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(r.id)}
                        onChange={() => toggleRow(r.id)}
                      />
                    </td>
                
                    <td>
                      {r.pilot_name} {r.surname}
                    </td>
                    <td>
                      {r.event} - {r.name_circuits}
                    </td>
                
                    <td>{r.tire_n1}</td>
                    <td>{r.tire_n2}</td>
                    <td>{r.tire_n3}</td>
                    <td>{r.tire_n4}</td>
                    <td>{r.tire_n5}</td>
                    <td>{r.tire_n6}</td>
                    <td>{String(r.event_date).split("T")[0]}</td>
                    <td>{String(r.event_date).split("T")[1]?.split(".")[0]}</td>
                    <td>{r.category}</td>
                  </tr>
                ))}
              </tbody>
             {/* </div> */}
            </table>

        </div>


        <div className="pagination-container">
            <div className="pagination">
              <button
                className="btn-pagination"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>

              <span className="span-pagination">
                Page {page} / {totalPages}
              </span>

              <button
                className="btn-pagination"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>

                      <div className="entries">
              <span>Show</span>

              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <span>entries</span>

              <span style={{ marginLeft: 12 }}>
                {total === 0 ? "0" : `${start + 1}-${Math.min(end, total)}`} of{" "}
                {total}
              </span>
            </div>
        </div>
      </div>
    </>
  );
};

export default RecordTabel;
